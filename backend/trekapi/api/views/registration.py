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
    
    # add isMobile or something like that
    
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
    
    access_token = refresh.access_token
    access_token["role"] = user.role
    access_token["email"] = user.email
    access_token["username"] = user.username
    access_token["id"] = user.id
    
    response.set_cookie(
        'access_token',
        str(refresh.access_token),
        httponly=True,
        secure=settings.SECURE_SSL_REDIRECT,
        samesite='Lax',
        max_age=timedelta(minutes=30),  
    )
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
    # add isMobile or something like that
    
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
        }
    })
    
    access_token = refresh.access_token
    access_token["role"] = user.role
    access_token["email"] = user.email
    access_token["username"] = user.username
    access_token["id"] = user.id
    
    response.set_cookie(
        'access_token',
        str(refresh.access_token),
        httponly=True,
        secure=settings.SECURE_SSL_REDIRECT,  # Make sure this is True in production (use False in dev if not using HTTPS)
        samesite='Lax',
        max_age=timedelta(minutes=30),  # Access token expiration time
    )
    response.set_cookie(
        'refresh_token',
        str(refresh),
        httponly=True,
        secure=settings.SECURE_SSL_REDIRECT, 
        samesite='Lax',
        max_age=timedelta(days=7),  # Refresh token expiration time
    )
    return response

@api_view(["POST"])
@permission_classes([AllowAny])
def logout_view(request):
    response = Response({"message": "Logout successful"}, status=200)
    response.delete_cookie('access_token', path='/')
    response.delete_cookie('refresh_token', path='/')
    
    refresh_token = request.COOKIES.get('refresh_token')
    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            response.data["warning"] = "Could not blacklist token."
    
    request.session.flush()
    return response
    

# add mobile view or some check in the request so that it knows if its mobile or desktop
# so that a user recevies in the response or use a check of sort
