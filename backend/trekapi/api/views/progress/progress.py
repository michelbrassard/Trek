from api.models import Progress
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from api.serializers import ProgressWithLatestContentSerializer, ProgressSerializer, EditProgressSerializer
from rest_framework.parsers import JSONParser

User = get_user_model()

# functions for the Progress metadata itself, the content is in the progress_versions.py file

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def progress_list(request):
    creator = request.user
    if request.method == 'GET':
        progress = Progress.objects.filter(creatorId=creator)
        serializer = ProgressSerializer(progress, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        data["creatorId"] = creator.id
        serializer = ProgressSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def progress_detail(request, progress_id):
    try:
        progress = Progress.objects.get(id=progress_id)
    except Progress.DoesNotExist:
        return Response(status=404)
    
    # fetch the progress with the latest data
    if request.method == 'GET':
        try:
            serializer = ProgressWithLatestContentSerializer(progress)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)
    
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = EditProgressSerializer(progress, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=400)
    
    elif request.method == 'DELETE':
        try:
            progress.delete()
            return Response({"message": "Progress item deleted successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)