from rest_framework import serializers
from api.models import Progress, ProgressContent

class ProgressContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressContent
        fields = ['createdAt', 'content']

class SaveProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressContent
        fields = ['content', 'progressId']

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = '__all__'

class EditProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = ['title', 'description']

# returns the latest progress
class ProgressWithLatestContentSerializer(serializers.ModelSerializer):
    latest = serializers.SerializerMethodField()
    class Meta:
        model = Progress
        fields = ['id', 'title', 'description', 'latest']
        
    def get_latest(self, obj):
        latest_content = ProgressContent.objects.filter(progressId=obj).order_by('-createdAt').first()
        if latest_content:
            return {
                'createdAt': latest_content.createdAt,
                'content': latest_content.content
            }
        return None

# full list of progress with all of its versions
class ProgressWithFullContentVersionsSerializer(serializers.ModelSerializer):
    contents = ProgressContentSerializer(many=True)
    class Meta:
        model = Progress
        fields = ['id', 'title', 'description', 'contents']