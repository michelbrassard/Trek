from rest_framework import serializers # type: ignore - it works
from api.models import User, TemporaryCoachCode

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['id', 'password']

class TemporaryCoachCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model: TemporaryCoachCode