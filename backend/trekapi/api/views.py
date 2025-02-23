from django.http import HttpResponse, JsonResponse # type: ignore
from django.views.decorators.csrf import csrf_exempt # type: ignore
from rest_framework.parsers import JSONParser # type: ignore
from api.models import User
from api.serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_datetime
from django.core.exceptions import ObjectDoesNotExist

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
    
    # Create new user instance
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

    return Response({
        "message": "User registered successfully",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
            "phone": user.phone,
            "date_of_birth": user.date_of_birth,
            "role": user.role.id if user.role else None,
        }
    }, status=201)

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")
    
    user = authenticate(email=email, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)
    
    refresh = RefreshToken.for_user(user)
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
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

@csrf_exempt
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
    
@csrf_exempt
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)