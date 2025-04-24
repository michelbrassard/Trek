from api.models import User, Workout
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers import WorkoutSerializer, EditWorkoutSerializer
from rest_framework.parsers import JSONParser

User = get_user_model()

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def workout_list(request):
    creator = request.user
    if request.method == 'GET':
        workouts = Workout.objects.filter(creatorId=creator)
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        data["creatorId"] = creator.id
        
        serializer = WorkoutSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def workout_detail(request, workout_id):
    try:
        workout = Workout.objects.get(id=workout_id)
    except Workout.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = EditWorkoutSerializer(workout, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        workout.delete()
        return Response({"message": "Workout deleted successfully"}, status=200)