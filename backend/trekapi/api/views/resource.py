from api.models import Resource
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers import EditResourceSerializer, ResourceSerializer
from rest_framework.parsers import JSONParser

User = get_user_model()

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def resource_list(request):
    creator = request.user
    if request.method == 'GET':
        resources = Resource.objects.filter(creatorId=creator)
        serializer = ResourceSerializer(resources, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        data["creatorId"] = creator.id
        serializer = ResourceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def resource_detail(request, resource_id):
    try:
        resource = Resource.objects.get(id=resource_id)
    except Resource.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = ResourceSerializer(resource)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = EditResourceSerializer(resource, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=400)
    
    elif request.method == 'DELETE':
        try:
            resource.delete()
            return Response({"message": "Note deleted successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
# TO DO
# athletes: fetch resources created by the coach