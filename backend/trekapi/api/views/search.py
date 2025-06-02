from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from api.models import Workout, Competition
from django.db.models import Q
from api.serializers import SearchedAthleteSerializer, SearchedCompetitionSerializer, SearchedWorkoutSerializer

User = get_user_model()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_data(request):
    user = request.user
    query = request.GET.get('q', '')
    
    if request.method == 'GET':
        try:
            searched_workouts = Workout.objects.filter(
                Q(creatorId=user) | Q(workout_attendance__attendantId=user)
            ).filter(
                Q(title__icontains=query) | 
                Q(description__icontains=query) | 
                Q(workout__icontains=query) |  
                Q(date__icontains=query) | 
                Q(length__icontains=query) |
                Q(unit__icontains=query)
            ).distinct()[:5]
            
            searched_competitions = Competition.objects.filter(
                Q(creatorId=user) | Q(competition_attendance__attendantId=user)
            ).filter(
                Q(title__icontains=query) | 
                Q(description__icontains=query) | 
                Q(startDate__icontains=query) |
                Q(endDate__icontains=query) |
                Q(location__icontains=query) |
                Q(url__icontains=query)
            ).distinct()[:5]
            
            terms = query.strip().split(" ", 1)
            first_part = terms[0]
            second_part = terms[1] if len(terms) > 1 else ''
            searched_athletes = User.objects.filter(
                Q(athlete_teams__coachId=user) | Q(coached_teams__athleteId=user)
            ).filter(
                Q(first_name__icontains=query) |
                (Q(first_name__icontains=first_part) & Q(first_name__icontains=second_part)) |
                Q(last_name__icontains=query) |
                (Q(last_name__icontains=second_part) & Q(last_name__icontains=first_part)) |
                Q(username__icontains=query) |
                Q(email__icontains=query) |
                Q(phone__icontains=query) |
                Q(date_of_birth__icontains=query)
            ).distinct()[:5]
            
            results = (
                list(SearchedWorkoutSerializer(searched_workouts, many=True).data) + 
                list(SearchedCompetitionSerializer(searched_competitions, many=True).data) + 
                list(SearchedAthleteSerializer(searched_athletes, many=True).data)
            )
            return Response({"results": results}, status=200)
        except Exception as e:
            return Response({"message": "Unable to search"}, status=500)
        