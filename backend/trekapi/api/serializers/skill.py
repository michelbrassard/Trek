from api.models import Skill, Goal, GoalDependency
from rest_framework import serializers

# not sure if the EditSerializers are needed

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        exclude = ['creatorId']

class EditSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        exclude = ["id", "creatorId"]

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class EditGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        exclude = ["id"]
        
class PrerequisiteGoal(serializers.ModelSerializer):
    id = serializers.UUIDField(source='prerequisiteGoalId.id')
    class Meta:
        model = GoalDependency
        fields = ['id']

class GoalWithPrerequisites(serializers.ModelSerializer):
    prerequisites = PrerequisiteGoal(source='goal_with_dependency', many=True)
    class Meta:
        model = Goal
        fields = ["id", "title", "description", "prerequisites"]

class SkillWithGoalsSerializer(serializers.ModelSerializer):
    goals = GoalWithPrerequisites(source='skill_goals', many=True)
    class Meta:
        model = Skill
        fields = ["id", "title", "description", "goals"]