from rest_framework import serializers # type: ignore - it works
from api.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['id', 'password']