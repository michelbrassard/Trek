from rest_framework import serializers # type: ignore - it works
from api.models import User

#attendance functionality
class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name"]