from api.models import Goal
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers import GoalSerializer, EditGoalSerializer, GoalWithFullPrerequisites
from rest_framework.parsers import JSONParser


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def goal_list(request, skill_id):
    if request.method == 'GET':
        goals = Goal.objects.filter(skillId=skill_id)
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        data["skillId"] = skill_id
        serializer = GoalSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def goal_detail(request, goal_id):
    try:
        goal = Goal.objects.get(id=goal_id)
    except Goal.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = GoalWithFullPrerequisites(goal)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = EditGoalSerializer(goal, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        try:
            goal.delete()
            return Response({"message": "Goal deleted successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)