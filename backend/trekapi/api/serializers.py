from rest_framework import serializers # type: ignore - it works
from api.models import User, Role

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer() # nested serializer for showing the name of the role
    
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