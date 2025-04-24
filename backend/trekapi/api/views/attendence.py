from api.models import User, Workout, WorkoutAttendance
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from api.serializers import WorkoutWithAttendeesSerializer
from django.db.models import Prefetch


User = get_user_model()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def attendance_list(request):
    coach = request.user
    if request.method == 'GET':
        workouts = Workout.objects.filter(creatorId=coach).prefetch_related('workout_attendence__attendentId')
        
        workout_attendances = WorkoutAttendance.objects.select_related("attendentId")
        workouts = Workout.objects.filter(creatorId=coach).prefetch_related(
            Prefetch("workout_attendence", queryset=workout_attendances, to_attr="attendances")
        )
        serializer = WorkoutWithAttendeesSerializer(workouts, many=True)
        return Response(serializer.data, status=200)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_attendence(request):
    print(request.data)
    return Response({}, status=200)