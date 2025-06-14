from api.models import User
from api.serializers import AthleteSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

User = get_user_model()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def athlete_list(request):
    coach = request.user
    if request.method == 'GET':
        athletes = User.objects.filter(athlete_teams__coachId=coach.id).distinct()
        if not athletes.exists():
            return Response({"message": "No athletes found."}, status=404)
        serializer = AthleteSerializer(athletes, many=True)
        return Response(serializer.data, status=200)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def athlete_detail(request, athlete_id):
    try:
        athlete = User.objects.get(id=athlete_id)
        serializer = AthleteSerializer(athlete)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status=404)