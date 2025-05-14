from api.models import Competition
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers import CompetitionSerializer, EditCompetitionSerializer
from rest_framework.parsers import JSONParser

User = get_user_model()

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def competition_list(request):
    creator = request.user
    if request.method == 'GET':
        competitions = Competition.objects.filter(creatorId=creator)
        serializer = CompetitionSerializer(competitions, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        data["creatorId"] = creator.id
        
        serializer = CompetitionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def competition_detail(request, competition_id):
    try:
        competition = Competition.objects.get(id=competition_id)
    except Competition.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = CompetitionSerializer(competition)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = EditCompetitionSerializer(competition, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=400)
    
    elif request.method == 'DELETE':
        try:
            competition.delete()
            return Response({"message": "Competition deleted successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)