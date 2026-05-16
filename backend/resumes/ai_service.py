import google.generativeai as genai
import os

def optimize_resume_text(raw_text):
    """
    Takes raw student notes and returns professional ATS bullet points.
    """
    # Initialize the client with your key
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    
    # Flash is the fastest and cheapest model for this specific task
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    # The System Prompt (This is the secret sauce)
    prompt = f"""
    You are a ruthless but helpful expert technical recruiter reviewing resumes for Software Engineering and Business industrial attachments.
    
    Your task is to take the following raw notes from a university student and rewrite them into 3 highly professional, ATS-friendly bullet points.
    
    RULES:
    1. Use the STAR method (Situation, Task, Action, Result) implicitly.
    2. Start each bullet point with a strong, past-tense action verb (e.g., Developed, Orchestrated, Engineered).
    3. DO NOT hallucinate, invent, or add technical skills that the student did not mention.
    4. Format the output strictly as bullet points (using standard '-' dashes).
    5. DO NOT include any introductory text, conversational filler, or greetings. Output ONLY the bullets.
    
    RAW STUDENT NOTES:
    {raw_text}
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"AI Generation Error: {e}")
        return "Error: Could not generate text. Please try again."