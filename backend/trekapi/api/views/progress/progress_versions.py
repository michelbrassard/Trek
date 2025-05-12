from api.models import Progress, ProgressContent
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from api.serializers import ProgressWithLatestContentSerializer, ProgressWithFullContentVersionsSerializer, SaveProgressSerializer
from django.db.models import Prefetch
from rest_framework.parsers import JSONParser

User = get_user_model()

# will most likely be used for some graph or detailed overview
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def progress_with_all_content_versions_list(request):
    creator = request.user
    try:
        progress = Progress.objects.filter(creatorId=creator).prefetch_related(
            Prefetch(
                "progress_content",
                queryset=ProgressContent.objects.order_by("-createdAt"),
                to_attr="versions"
            )
        )
        serializer = ProgressWithFullContentVersionsSerializer(progress, many=True)
        return Response(serializer.data, status=200)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=500)

# this is also for a graph or some detailed overview to compare versions
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def progress_with_all_content_versions(request, progress_id):
    creator = request.user
    try:
        progress = Progress.objects.get(id=progress_id).prefetch_related(
            Prefetch(
                "progress_content",
                queryset=ProgressContent.objects.order_by("-createdAt"),
                to_attr="contents"
            )
        )
        serializer = ProgressWithFullContentVersionsSerializer(progress)
        return Response(serializer.data, status=200)
    except Progress.DoesNotExist:
        return Response({"error": "Progress not found"}, status=404)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=500)

# whenever user saves content it creates a new row
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_new_version(request):
    try:
        data = JSONParser().parse(request)
        serializer = SaveProgressSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=500)
