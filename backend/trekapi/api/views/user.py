from rest_framework.parsers import JSONParser # type: ignore
from api.models import User
from api.serializers import RoleSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, safe=False)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    user = request.user
    try:
        user = User.objects.get(id=user.id)
    except User.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=404)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_role(request):
    user = request.user
    serializer = RoleSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def user_check_email_existence(request):
    email = request.data.get("email")
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already in use"}, status=400)
    else:
        return Response({"message": "Email ok"}, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def user_check_username_existence(request):
    username = request.data.get("username")
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)
    else:
        return Response({"message": "Username ok"}, status=200)
        