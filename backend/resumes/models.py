import uuid
from django.db import models

TEMPLATE_CHOICES = [
    ('classic', 'Classic ATS'),
    ('meridian', 'Meridian (Two-Column)'),
    ('monolith', 'Monolith (Brutalist)'),
    ('vivant', 'Vivant (Elegant)'),
]

class Resume(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
        ('P', 'Prefer not to say'),
    ]
    
    # --- NEW FIELDS ---
    template_choice = models.CharField(max_length=20, choices=TEMPLATE_CHOICES, default='classic')
    references_and_awards = models.TextField(blank=True, null=True)
    
    # Basic Info
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=100, blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    portfolio_url = models.URLField(blank=True, null=True)
    professional_summary = models.TextField(blank=True, null=True)
    gender = models.CharField(
        max_length=1, 
        choices=GENDER_CHOICES, 
        blank=True, 
        null=True
    )

    def __str__(self):
        return f"{self.full_name} - {self.id}"
    
class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='education')
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True) # Blank means "Present"
    gpa = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.degree

class Experience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='experience')
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    
    # The AI Goldmine
    raw_description = models.TextField(help_text="What the student types initially")
    ai_optimized_description = models.TextField(blank=True, null=True, help_text="What Gemini generates")

    def __str__(self):
        return f"{self.role} at {self.company}"

class Project(models.Model):
    resume = models.ForeignKey(Resume, related_name='projects', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    tech_stack = models.CharField(max_length=255)
    link = models.URLField(blank=True, null=True)
    description = models.TextField()
    # --- NEW FIELD ---
    ai_optimized_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class Skill(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, blank=True, null=True) # e.g., "Languages", "Frameworks"

    def __str__(self):
        return self.name