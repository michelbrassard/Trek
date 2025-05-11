from api.models import Note
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers import EditNoteSerializer, NoteSerializer
from rest_framework.parsers import JSONParser

User = get_user_model()

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def note_list(request):
    creator = request.user
    if request.method == 'GET':
        notes = Note.objects.filter(creatorId=creator)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        data["creatorId"] = creator.id
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def note_detail(request, note_id):
    try:
        note = Note.objects.get(id=note_id)
    except Note.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = EditNoteSerializer(note, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=400)
    
    elif request.method == 'DELETE':
        try:
            note.delete()
            return Response({"message": "Note deleted successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)