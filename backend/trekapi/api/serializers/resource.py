from rest_framework import serializers
from api.models import Resource   
        
class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'

class EditResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        exclude = ["id", "creatorId"]

