from rest_framework import serializers # type: ignore - it works
from api.models import User, TemporaryCoachCode, Workout

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

class WorkoutSerializer(serializers.ModelSerializer):
    creatorID = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Workout
        fields = '__all__'

class TemporaryCoachCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemporaryCoachCode
        fields = '__all__'