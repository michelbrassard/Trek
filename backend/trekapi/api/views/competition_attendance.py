from api.models import Competition, CompetitionAttendance
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from api.serializers import CompetitionWithAttendeesSerializer, CurrentCompetitionAttendeesSerializer
from django.db.models import Prefetch


User = get_user_model()

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def competition_attendance_list(request):
    creator = request.user
    if request.method == 'GET':
        try:
            competition_attendances  = CompetitionAttendance.objects.select_related("attendantId")
            competitions = Competition.objects.filter(creatorId=creator).prefetch_related(
                Prefetch("competition_attendance", queryset=competition_attendances, to_attr="attendances")
            )
            serializer = CompetitionWithAttendeesSerializer(competitions, many=True)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
        
    elif request.method == 'POST':
        try:
            competitionId = request.data['attendance']['competitionId']
            attendanceList = request.data['attendance']['list']
            attendances = [
                CompetitionAttendance(attendantId_id=user_id, competitionId_id=competitionId)
                for user_id in attendanceList
            ]
            CompetitionAttendance.objects.bulk_create(attendances, ignore_conflicts=True)
            return Response({"message": "Attendance saved successfully"}, status=201)
        except KeyError as e:
            return Response({"error": f"Missing field: {str(e)}"}, status=400)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)

@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def current_competition_attendance(request, competition_id):
    if request.method == 'GET':
        try:
            currentAttendance = CompetitionAttendance.objects.filter(competitionId=competition_id)
            serializer = CurrentCompetitionAttendeesSerializer(currentAttendance, many=True)
            return Response(serializer.data)
        except CompetitionAttendance.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
    
    if request.method == 'DELETE':
        try:
            competitionId = request.data['attendance']['competitionId']
            attendanceListIds = request.data['attendance']['list']
            deleted_count, details = CompetitionAttendance.objects.filter(
                competitionId=competitionId,
                attendantId__in=attendanceListIds
            ).delete()
            return Response({'message': f'Removed {deleted_count} attendees, Details: {details}'}, status=200)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
