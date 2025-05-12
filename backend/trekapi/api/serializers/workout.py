
from .attendee import AttendeeSerializer
from rest_framework import serializers # type: ignore - it works
from api.models import User, Workout, WorkoutAttendance

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