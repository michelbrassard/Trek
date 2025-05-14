from .attendee import AttendeeSerializer
from rest_framework import serializers # type: ignore - it works
from api.models import User, Competition, CompetitionAttendance
  
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