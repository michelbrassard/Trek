from rest_framework import serializers # type: ignore - it works
from api.models import User, TemporaryCoachCode, Workout, WorkoutAttendance, Competition, CompetitionAttendance, Note

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

class SearchedAthleteSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone', 'date_of_birth', 'type']
    def get_type(self, obj):
        return "athlete"

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

class SearchedWorkoutSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    class Meta:
        model = Workout
        fields = ['id', 'title', 'description', 'date', 'length', 'unit', 'type']
    def get_type(self, obj):
        return "workout"

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

class CurrentWorkoutAttendeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutAttendance
        fields = ["attendantId"]
     
#competition   
class CompetitionSerializer(serializers.ModelSerializer):
    creatorId = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Competition
        fields = '__all__'

class SearchedCompetitionSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    class Meta:
        model = Competition
        fields = ['id', 'title', 'description', 'startDate', 'endDate', 'location', 'type']
    def get_type(self, obj):
        return "competition"

class EditCompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        exclude = ["id", "creatorId"]

class CompetitionWithAttendeesSerializer(serializers.ModelSerializer):
    attendees = serializers.SerializerMethodField()
    class Meta:
        model = Competition
        fields = ["id", "title", "description", "startDate", "endDate", "location", "url", "attendees"]
        
    def get_attendees(self, obj):
        if hasattr(obj, "attendances"):
            attendees = [attendance.attendantId for attendance in obj.attendances]
        else:
            attendees = User.objects.filter(user_competition_attendance__competitionId=obj)
        return AttendeeSerializer(attendees, many=True).data

class CurrentCompetitionAttendeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetitionAttendance
        fields = ["attendantId"]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class EditNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        exclude = ["id", "creatorId"]