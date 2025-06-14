from rest_framework import serializers
from api.models import Note 

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class EditNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        exclude = ["id", "creatorId"]