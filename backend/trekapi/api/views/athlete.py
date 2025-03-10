from django.http import JsonResponse
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
        athletes = User.objects.filter(athlete_teams__coachID=coach.id).distinct()
        serializer = AthleteSerializer(athletes, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def athlete_detail(request, athlete_id):
    try:
        athlete = User.objects.get(id=athlete_id)
        serializer = AthleteSerializer(athlete)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status=404)