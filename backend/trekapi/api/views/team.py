from api.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(["GET"])
@permission_classes([AllowAny])
def get_coach_codes(request):
    user = request.user
    
    if request.method == 'GET':
        temp_codes = TemporaryCoachCode.objects.filter(coachID=user.id)
        if not temp_codes.exists():
            temp_code = TemporaryCoachCode.objects.create(coachID=user.id)
        
        serializer = TemporaryCoachCodeSerializer(temp_codes, many=True)
        return Response(serializer, status=200)