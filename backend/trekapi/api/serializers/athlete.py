from rest_framework import serializers # type: ignore - it works
from api.models import User, TemporaryCoachCode
 

#registering athletes to a coach
class TemporaryCoachCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemporaryCoachCode
        fields = '__all__'

#for displaying athletes under a coach   
class AthleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone', 'date_of_birth']

class SearchedAthleteSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone', 'date_of_birth', 'type']
    def get_type(self, obj):
        return "athlete"