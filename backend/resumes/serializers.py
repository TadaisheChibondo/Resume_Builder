from rest_framework import serializers
from .models import Resume, Education, Experience, Project, Skill

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        exclude = ['resume'] # Exclude this so React doesn't have to send the ID back and forth

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        exclude = ['resume']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        # Add ai_optimized_description here
        fields = ['name', 'tech_stack', 'link', 'description', 'ai_optimized_description']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        exclude = ['resume']

class ResumeSerializer(serializers.ModelSerializer):
    # These match the related_name we set in the models.py
    education = EducationSerializer(many=True, required=False)
    experience = ExperienceSerializer(many=True, required=False)
    projects = ProjectSerializer(many=True, required=False)
    skills = SkillSerializer(many=True, required=False)

    class Meta:
        model = Resume
        fields = [
            'id', 'is_paid', 'created_at', 'template_choice', 'references_and_awards', 
            'full_name', 'email', 'phone', 'linkedin_url', 'portfolio_url', 
            'professional_summary', 'education', 'experience', 'projects', 'skills', 'location', 'gender',
        ]
        read_only_fields = ['is_paid', 'paynow_reference', 'paynow_poll_url']

    def create(self, validated_data):
        """
        DRF requires custom logic to save nested data.
        This pops the child arrays out, creates the Resume parent, 
        and then links the children to the parent.
        """
        education_data = validated_data.pop('education', [])
        experience_data = validated_data.pop('experience', [])
        projects_data = validated_data.pop('projects', [])
        skills_data = validated_data.pop('skills', [])

        resume = Resume.objects.create(**validated_data)

        # Re-attach the nested data
        for edu in education_data:
            Education.objects.create(resume=resume, **edu)
        for exp in experience_data:
            Experience.objects.create(resume=resume, **exp)
        for proj in projects_data:
            Project.objects.create(resume=resume, **proj)
        for skill in skills_data:
            Skill.objects.create(resume=resume, **skill)

        return resume