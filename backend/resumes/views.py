from rest_framework import generics
from django.shortcuts import get_object_or_404
import os
from paynow import Paynow
from .serializers import ResumeSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .models import Resume
from django.template.loader import render_to_string
from django.http import HttpResponse
from weasyprint import HTML
from django.views.decorators.clickjacking import xframe_options_exempt





@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def paynow_callback(request):
    """
    This is the Result URL endpoint that Paynow hits silently in the background.
    """
    # Paynow sends the data as standard form POST data
    status = request.POST.get('status')
    reference = request.POST.get('reference') # We will pass the Resume UUID here when initiating
    paynow_reference = request.POST.get('paynowreference')

    if status == 'Paid':
        try:
            # Find the exact draft they were working on
            resume = Resume.objects.get(id=reference)
            resume.is_paid = True
            resume.paynow_reference = paynow_reference
            resume.save()
            
            # Print to terminal so you see it instantly while developing
            print(f"💰 SECURED: Payment cleared for Resume {resume.id}")
            return Response({'status': 'Acknowledged'}, status=200)
            
        except Resume.DoesNotExist:
            print("Error: Received payment for a missing resume.")
            return Response({'error': 'Resume not found'}, status=404)
            
    # If it's 'Cancelled' or 'Failed', we just acknowledge receipt but don't unlock it
    return Response({'status': 'Ignored'}, status=200)
class ResumeCreateView(generics.CreateAPIView):
    """ Allows anyone to create a new resume draft """
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [AllowAny]

class ResumeDetailView(generics.RetrieveAPIView):
    """ Fetch a resume draft by its UUID """
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id' # We use the UUID to find it

@api_view(['POST'])
@permission_classes([AllowAny])
def initiate_payment(request, id):
    try:
        resume = get_object_or_404(Resume, id=id)
        
        # 1. Safely check for both 'phone' and 'phone_number'
        phone_number = request.data.get('phone') or request.data.get('phone_number')
        
        if not phone_number:
            print("❌ PAYMENT ERROR: No phone number received from React!")
            return Response({'error': 'Phone number is required'}, status=400)

        print(f"⏳ Initiating Paynow push for: {phone_number}...")

        # 2. Check if the environment variables are actually loading
        integration_id = os.environ.get('PAYNOW_INTEGRATION_ID')
        integration_key = os.environ.get('PAYNOW_INTEGRATION_KEY')

        if not integration_id or not integration_key:
            print("❌ PAYMENT ERROR: Paynow Integration ID or Key is missing. Check your .env file!")
            return Response({'error': 'Server misconfiguration'}, status=400)

        # 3. Setup Paynow (Using your Ngrok URL)
        paynow = Paynow(
            integration_id, 
            integration_key,
            'http://localhost:5173/success',
            'https://unfarming-describable-leighann.ngrok-free.dev/api/resumes/webhook/paynow/'
        )

        payment = paynow.create_payment(str(resume.id), resume.email)
        payment.add('Premium ATS Resume Export', 0.30)

        # 4. Fire the EcoCash request
        # 4. Fire the EcoCash request
        response = paynow.send_mobile(payment, phone_number, 'ecocash')

        if response.success:
            print("✅ PAYNOW SUCCESS: USSD Prompt sent to phone!")
            return Response({'status': 'Payment initiated'}, status=200)
        else:
            # Safely dump the ENTIRE Paynow response to bypass the SDK bug
            full_paynow_response = str(response.__dict__)
            print(f"❌ PAYNOW API REJECTED IT: {full_paynow_response}")
            
            # Send a safe string back to React so it doesn't crash
            return Response({'error': "Paynow rejected the transaction. Check backend terminal."}, status=400)

    except Exception as e:
        print(f"❌ CRITICAL CRASH IN PAYMENT VIEW: {str(e)}")
        return Response({'error': str(e)}, status=400)
    
from .ai_service import optimize_resume_text

@api_view(['POST'])
@permission_classes([AllowAny])
def optimize_text_endpoint(request):
    """
    Receives raw text from React, passes it to Gemini, and returns the polished version.
    """
    raw_text = request.data.get('raw_text')
    
    if not raw_text or len(raw_text) < 10:
        return Response({'error': 'Please provide more details for the AI to work with.'}, status=400)
        
    try:
        # Call our service function
        optimized_text = optimize_resume_text(raw_text)
        return Response({'optimized_text': optimized_text}, status=200)
    except Exception as e:
        return Response({'error': 'AI processing failed.'}, status=500)
    
@api_view(['GET'])
@permission_classes([AllowAny])
@xframe_options_exempt
def download_resume_pdf(request, id):
    resume = get_object_or_404(Resume, id=id)
    
    # Map the database choice to the actual HTML file names
    template_map = {
        'classic': 'resumes/classic_template.html',
        'meridian': 'resumes/template_meridian.html',
        'monolith': 'resumes/template_monolith.html',
        'vivant': 'resumes/template_vivant.html',
    }
    
    # Get the chosen template, defaulting to classic if something goes wrong
    template_name = template_map.get(resume.template_choice, 'resumes/classic_template.html')

    # Render the string
    html_string = render_to_string(template_name, {'resume': resume})

    # Generate PDF
    html = HTML(string=html_string)
    pdf_bytes = html.write_pdf()

    response = HttpResponse(pdf_bytes, content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="resume_{resume.id}.pdf"'
    return response

@api_view(['POST'])
@permission_classes([AllowAny]) # Must be public so Paynow can reach it!
def paynow_webhook(request):
    """
    Paynow sends a POST request here when a transaction changes status.
    """
    # Paynow sends form-encoded data
    status = request.data.get('status')
    reference = request.data.get('reference') # This will be our Resume UUID
    paynow_reference = request.data.get('paynowreference')

    print(f"WEBHOOK RECEIVED: Ref: {reference} | Status: {status}")

    # 'Paid' or 'Awaiting Delivery' both mean the money went through successfully
    if status in ['Paid', 'Awaiting Delivery']:
        try:
            resume = Resume.objects.get(id=reference)
            if not resume.is_paid:
                resume.is_paid = True
                resume.save()
                print(f"SUCCESS: Resume {reference} unlocked!")
            
            # You must return a 200 OK so Paynow knows you received it
            return Response({'status': 'acknowledged'}, status=200)
            
        except Resume.DoesNotExist:
            print(f"ERROR: Resume {reference} not found in database.")
            return Response({'error': 'Resume not found'}, status=404)

    # If it was cancelled or failed, just ignore it and return 200
    return Response({'status': 'ignored'}, status=200)