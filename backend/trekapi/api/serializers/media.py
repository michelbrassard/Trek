# from backend.trekapi.trekapi import settings
from rest_framework import serializers
from ..models import Media

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

class EditMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        exclude = ["id", "creatorId"]
        
# def get_file_url(self, obj):
#     return settings.MEDIA_URL + str(obj.file)