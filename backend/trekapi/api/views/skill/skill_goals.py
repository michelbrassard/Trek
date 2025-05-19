from api.models import Skill
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers import SkillWithGoalsSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def skill_goals(request, skill_id):
    try:
        skill = Skill.objects.get(id=skill_id)
    except Skill.DoesNotExist:
        return Response(status=404)
    if request.method == 'GET':
        serializer = SkillWithGoalsSerializer(skill)
        return Response(serializer.data)


