from django.contrib import admin
from .models import Resume, Education, Experience, Project, Skill

class ExperienceInline(admin.StackedInline):
    model = Experience
    extra = 0

class EducationInline(admin.StackedInline):
    model = Education
    extra = 0

class ProjectInline(admin.StackedInline):
    model = Project
    extra = 0

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 0

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'is_paid', 'created_at')
    list_filter = ('is_paid', 'created_at')
    search_fields = ('full_name', 'email', 'paynow_reference')
    inlines = [EducationInline, ExperienceInline, ProjectInline, SkillInline]

# Create a superuser to access this if you haven't already:
# python manage.py createsuperuser