from api.models import Media
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers import MediaSerializer, EditMediaSerializer
from rest_framework.parsers import JSONParser

User = get_user_model()

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def media_list(request):
    creator = request.user
    if request.method == 'GET':
        media = Media.objects.filter(creatorId=creator)
        serializer = MediaSerializer(media, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        data = request.data.copy()
        data["creatorId"] = creator.id
        serializer = MediaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def media_detail(request, media_id):
    try:
        media = Media.objects.get(id=media_id)
    except Media.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = MediaSerializer(media)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = request.data.copy()
        serializer = EditMediaSerializer(media, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=400)
    
    elif request.method == 'DELETE':
        try:
            media.delete()
            return Response({"message": "Media deleted successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)