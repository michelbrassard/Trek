from django.http import HttpResponse # type: ignore
from django.views.decorators.csrf import csrf_exempt # type: ignore
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view,  permission_classes

@api_view(["GET"])
@permission_classes([AllowAny])
def home(request):
    return HttpResponse("<h1>Welcome to the API!</h1>")