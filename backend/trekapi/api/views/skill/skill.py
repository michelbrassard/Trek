from api.models import Skill
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers import SkillSerializer, EditSkillSerializer
from rest_framework.parsers import JSONParser

User = get_user_model()

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def skill_list(request):
    creator = request.user
    if request.method == 'GET':
        skills = Skill.objects.filter(creatorId=creator)
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        data["creatorId"] = creator.id
        serializer = SkillSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def skill_detail(request, skill_id):
    try:
        skill = Skill.objects.get(id=skill_id)
    except Skill.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = SkillSerializer(skill)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = EditSkillSerializer(skill, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=400)
    
    elif request.method == 'DELETE':
        try:
            skill.delete()
            return Response({"message": "Skill deleted successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)