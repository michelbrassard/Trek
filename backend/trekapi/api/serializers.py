from rest_framework import serializers # type: ignore - it works
from api.models import User, TemporaryCoachCode

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']
        
class AthleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone', 'date_of_birth']
        
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["role"]

class TemporaryCoachCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemporaryCoachCode
        fields = '__all__'