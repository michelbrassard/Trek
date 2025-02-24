from django.http import HttpResponse, JsonResponse # type: ignore
from django.views.decorators.csrf import csrf_exempt # type: ignore
from rest_framework.parsers import JSONParser # type: ignore
from api.models import User
from api.serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_datetime
from django.conf import settings
from datetime import timedelta

#remove the @csrf_exempt later on!!!
@csrf_exempt
def home(request):
    return HttpResponse("Welcome to the API!")

User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    phone = request.data.get("phone")
    date_of_birth = request.data.get("date_of_birth")
    role = request.data.get("role")
    
    # Ensure required fields are present
    if not username or not email or not password or not first_name or not last_name:
        return Response({"error": "Missing required fields"}, status=400)
    
    if '@' not in email:
        return Response({"error": "Invalid email format"}, status=400)
    
    # Check if email or username is already taken
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already in use"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)
    
    if date_of_birth:
        try:
            # Attempt to parse date_of_birth to ensure it's a valid datetime string
            date_of_birth = parse_datetime(date_of_birth)
            if date_of_birth is None:
                return Response({"error": "Invalid date format. Please use a valid datetime."}, status=400)
        except ValueError:
            return Response({"error": "Invalid date format."}, status=400)
    
    user = User(
        username=username,
        email=email,
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        date_of_birth=date_of_birth,
        role=role  # Assign role if applicable
    )
    user.set_password(password)
    user.save()
    
    refresh = RefreshToken.for_user(user)
    response = Response({
        "message": "User registered successfully",
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
            "phone": user.phone,
            "date_of_birth": user.date_of_birth,
            "role": user.role,
        }
    }, status=201)
    response.set_cookie(
        'access_token',
        str(refresh.access_token),
        httponly=True,
        secure=settings.SECURE_SSL_REDIRECT,
        samesite='Lax',
        max_age=timedelta(minutes=30),  
    )
    access_token = refresh.access_token
    access_token["role"] = user.role
    response.set_cookie(
        'refresh_token',
        str(refresh),
        httponly=True,
        secure=settings.SECURE_SSL_REDIRECT, 
        samesite='Lax',
        max_age=timedelta(days=7),
    )
    return response

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")
    
    user = authenticate(email=email, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)
    
    refresh = RefreshToken.for_user(user)
    response = Response({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
            "phone": user.phone,
            "date_of_birth": user.date_of_birth,
            "role": user.role,
        },
    })
     
    response.set_cookie(
        'access_token',
        str(refresh.access_token),
        httponly=True,
        secure=settings.SECURE_SSL_REDIRECT,  # Make sure this is True in production (use False in dev if not using HTTPS)
        samesite='Lax',
        max_age=timedelta(minutes=30),  # Access token expiration time
    )
    access_token = refresh.access_token
    access_token["role"] = user.role
    response.set_cookie(
        'refresh_token',
        str(refresh),
        httponly=True,
        secure=settings.SECURE_SSL_REDIRECT,  # Same as above
        samesite='Lax',
        max_age=timedelta(days=7),  # Refresh token expiration time
    )
    return response
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
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
