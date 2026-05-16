from django.urls import path
from .views import (
    paynow_callback, 
    ResumeCreateView, 
    ResumeDetailView, 
    initiate_payment,
    optimize_text_endpoint,
    download_resume_pdf
)
from . import views

urlpatterns = [
    # Core Resume CRUD
    path('create/', ResumeCreateView.as_view(), name='resume-create'),
    path('<uuid:id>/', ResumeDetailView.as_view(), name='resume-detail'),

    # The AI Endpoint
    path('optimize/', optimize_text_endpoint, name='resume-optimize'),
    
    # Tollgate Routes
    path('<uuid:id>/pay/', initiate_payment, name='resume-pay'),
    path('payment-callback/', paynow_callback, name='paynow_callback'),
    path('<uuid:id>/download/', download_resume_pdf, name='resume-download'),
    path('webhook/paynow/', views.paynow_webhook, name='paynow_webhook'),
]