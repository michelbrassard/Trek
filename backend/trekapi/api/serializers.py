from rest_framework import serializers # type: ignore - it works
from api.models import User, TemporaryCoachCode, Workout, WorkoutAttendance, Competiton

#used for account data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']
    
#for displaying athletes under a coach   
class AthleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone', 'date_of_birth']

#for navigation 
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["role"]

#workouts
class WorkoutSerializer(serializers.ModelSerializer):
    creatorId = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Workout
        fields = '__all__'

class EditWorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ["title", "description", "workout", "date", "length", "unit"]

#registering athletes to a coach
class TemporaryCoachCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemporaryCoachCode
        fields = '__all__'

#attendance functionality
class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name"]
        
class WorkoutWithAttendeesSerializer(serializers.ModelSerializer):
    attendees = serializers.SerializerMethodField()
    class Meta:
        model = Workout
        fields = ["id", "title", "description", "date", "length", "unit", "attendees"]

    def get_attendees(self, obj):
        if hasattr(obj, "attendances"):
            attendees = [attendance.attendantId for attendance in obj.attendances]
        else:
            attendees = User.objects.filter(user_attendance__workoutId=obj)
        return AttendeeSerializer(attendees, many=True).data

class CurrentAttendeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutAttendance
        fields = ["attendantId"]
     
#competition   
class CompetitionSerializer(serializers.ModelSerializaer):
    class Meta:
        model = Competiton
        fields = '__all__'