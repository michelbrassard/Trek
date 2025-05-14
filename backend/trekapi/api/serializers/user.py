from rest_framework import serializers
from api.models import User

#used for account data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']