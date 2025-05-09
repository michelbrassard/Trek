from api.models import User, TemporaryCoachCode
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from api.serializers import TemporaryCoachCodeSerializer

User = get_user_model()

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def coach_codes(request):
    user = request.user
    
    if request.method == 'GET':
        temp_codes = TemporaryCoachCode.objects.filter(coachId=user)
        if not temp_codes.exists():
            return Response({"message": "No coach codes"}, status=404)
        serializer = TemporaryCoachCodeSerializer(temp_codes, many=True)
        return Response(serializer.data, status=200)
    
    if request.method == "POST":
        temp_codes = TemporaryCoachCode.objects.filter(coachId=user)
        if not temp_codes.exists():
            temp_code = TemporaryCoachCode.objects.create(coachId=user)
            serializer = TemporaryCoachCodeSerializer(temp_code)
            return Response(serializer.data, status=201)
        return Response({"message": "Coach code already exists"}, status=202)