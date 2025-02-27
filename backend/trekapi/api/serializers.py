from rest_framework import serializers # type: ignore - it works
from api.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 
                  'created', 
                  'first_name', 
                  'last_name', 
                  'username', 
                  'email', 
                  'password', 
                  'phone', 
                  'date_of_birth', 
                  'role']