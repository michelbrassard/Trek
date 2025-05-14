from rest_framework import serializers
from api.models import User

#for navigation 
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["role"]