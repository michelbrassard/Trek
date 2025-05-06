from api.models import User, Workout, WorkoutAttendance
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from api.serializers import WorkoutWithAttendeesSerializer, CurrentAttendeesSerializer
from django.db.models import Prefetch


User = get_user_model()

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def workout_attendance_list(request):
    coach = request.user
    if request.method == 'GET':
        try: 
            workouts = Workout.objects.filter(creatorId=coach).prefetch_related('workout_attendance__attendantId')
            
            workout_attendances = WorkoutAttendance.objects.select_related("attendantId")
            workouts = Workout.objects.filter(creatorId=coach).prefetch_related(
                Prefetch("workout_attendance", queryset=workout_attendances, to_attr="attendances")
            )
            serializer = WorkoutWithAttendeesSerializer(workouts, many=True)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
    
    if request.method == 'POST':
        try:
            workoutId = request.data['attendance']['workoutId']
            attendanceList = request.data['attendance']['list']
            attendances = [
                WorkoutAttendance(attendantId_id=user_id, workoutId_id=workoutId)
                for user_id in attendanceList
            ]
            WorkoutAttendance.objects.bulk_create(attendances, ignore_conflicts=True)
            return Response({"message": "Attendance saved successfully"}, status=201)
        
        except KeyError as e:
            return Response({"error": f"Missing field: {str(e)}"}, status=400)
        
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)

@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def current_attendance(request, workout_id):
    if request.method == 'GET':
        try:
            currentAttendance = WorkoutAttendance.objects.filter(workoutId=workout_id)
            print(currentAttendance)
            serializer = CurrentAttendeesSerializer(currentAttendance, many=True)
            return Response(serializer.data)
        except WorkoutAttendance.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
    
    elif request.method == 'DELETE':
        try:
            workoutId = request.data['attendance']['workoutId']
            attendanceListIds = request.data['attendance']['list']
            deleted_count, details = WorkoutAttendance.objects.filter(
                workoutId=workoutId,
                attendantId__in=attendanceListIds
            ).delete()

            return Response({'message': f'Removed {deleted_count} attendees, Details: {details}'}, status=200)
        except Exception as e:
            print(e)
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
