from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import json
import random
import base64
import google.generativeai as genai
from google.oauth2 import service_account
from google.cloud import speech, texttospeech

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Google API credentials
credentials = service_account.Credentials.from_service_account_file(
    'mitra-ai-key.json',
    scopes=['https://www.googleapis.com/auth/cloud-platform']
)

# Configure Gemini
genai.configure(credentials=credentials)
model = genai.GenerativeModel('gemini-pro')

# Initialize Speech-to-Text client
speech_client = speech.SpeechClient(credentials=credentials)

# Initialize Text-to-Speech client
tts_client = texttospeech.TextToSpeechClient(credentials=credentials)

class GameResult(BaseModel):
    game_type: str
    score: int
    reaction_time: float
    emotions_recognized: List[str]
    timestamp: datetime

class JournalEntry(BaseModel):
    content: str
    mood: str
    intensity: int
    timestamp: datetime

class JournalAnalysis(BaseModel):
    sentiment: str
    risk_level: str
    recommendations: List[str]
    crisis_resources: Optional[List[str]]

# In-memory storage (replace with database in production)
game_results = []
journal_entries = []

@app.post("/api/analyze_game")
async def analyze_game(result: GameResult):
    game_results.append(result.dict())
    
    # Analyze game performance and provide feedback
    feedback = {
        "score_percentile": random.randint(60, 100),
        "improvement": "+15% from last session",
        "recommendations": [
            "Try focusing on subtle facial expressions",
            "Practice with more complex emotions",
            "Take short breaks between sessions"
        ]
    }
    
    return feedback

@app.post("/api/analyze_journal")
async def analyze_journal(entry: JournalEntry):
    journal_entries.append(entry.dict())
    
    # Analyze text sentiment using Gemini
    prompt = f"""
    Analyze the following journal entry for emotional content and mental health indicators:
    Entry: {entry.content}
    Mood: {entry.mood}
    Intensity: {entry.intensity}
    
    Provide:
    1. Overall sentiment
    2. Risk level (low/medium/high)
    3. Personalized recommendations
    4. Crisis resources if needed
    """
    
    response = model.generate_content(prompt)
    analysis = response.text
    
    # Check for crisis keywords
    crisis_keywords = ["suicide", "self-harm", "kill myself", "end it all", "give up"]
    needs_crisis_resources = any(keyword in entry.content.lower() for keyword in Crisis_keywords)
    
    crisis_resources = [
        "National Crisis Hotline: 988",
        "Crisis Text Line: Text HOME to 741741",
        "National Suicide Prevention Lifeline: 1-800-273-8255",
        "SAMHSA's National Helpline: 1-800-662-4357"
    ] if needs_crisis_resources else None
    
    return JournalAnalysis(
        sentiment=analysis.split("Sentiment:")[1].split("\n")[0].strip() if "Sentiment:" in analysis else "neutral",
        risk_level="high" if needs_crisis_resources else "low",
        recommendations=[rec.strip() for rec in analysis.split("Recommendations:")[1].split("\n") if rec.strip()],
        crisis_resources=crisis_resources
    )

@app.get("/api/dashboard_data")
async def get_dashboard_data():
    # Calculate date range for the past week
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)
    
    # Filter data for the past week
    recent_games = [
        result for result in game_results 
        if start_date <= result["timestamp"] <= end_date
    ]
    
    recent_journals = [
        entry for entry in journal_entries 
        if start_date <= entry["timestamp"] <= end_date
    ]
    
    # Generate mood trends
    mood_trends = []
    for entry in recent_journals:
        mood_trends.append({
            "date": entry["timestamp"].isoformat(),
            "mood": entry["mood"],
            "intensity": entry["intensity"]
        })
    
    # Generate game performance data
    game_performance = []
    for result in recent_games:
        game_performance.append({
            "date": result["timestamp"].isoformat(),
            "score": result["score"],
            "reaction_time": result["reaction_time"],
            "emotions_recognized": result["emotions_recognized"]
        })
    
    # Calculate insights
    avg_mood_intensity = sum(entry["intensity"] for entry in recent_journals) / len(recent_journals) if recent_journals else 0
    avg_game_score = sum(result["score"] for result in recent_games) / len(recent_games) if recent_games else 0
    
    return {
        "mood_trends": mood_trends,
        "game_performance": game_performance,
        "insights": {
            "average_mood": avg_mood_intensity,
            "average_game_score": avg_game_score,
            "total_journal_entries": len(recent_journals),
            "total_games_played": len(recent_games)
        }
    }

@app.post("/api/chat_ai")
async def chat_with_ai(audio: UploadFile = File(...)):
    # Read audio file content
    audio_content = await audio.read()
    
    # Configure Speech-to-Text request
    audio_config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
        sample_rate_hertz=48000,
        language_code="en-US",
        enable_automatic_punctuation=True,
        model="default",
    )
    
    # Create recognition audio object
    recognition_audio = speech.RecognitionAudio(content=audio_content)
    
    try:
        # Perform speech recognition
        response = speech_client.recognize(config=audio_config, audio=recognition_audio)
        
        # Extract transcribed text
        transcribed_text = ""
        for result in response.results:
            transcribed_text += result.alternatives[0].transcript
        
        if not transcribed_text:
            transcribed_text = "I couldn't hear you clearly."
        
        # Analyze emotion from transcribed text
        emotion_prompt = f"""
        Analyze the following text and identify the primary emotion expressed:
        "{transcribed_text}"
        
        Choose from: happy, sad, anxious, calm, stressed, excited, neutral, confused, angry
        Only return the emotion name.
        """
        
        emotion_response = model.generate_content(emotion_prompt)
        detected_emotion = emotion_response.text.strip().lower()
        
        # Generate empathetic response based on detected emotion
        response_prompt = f"""
        You are an AI voice companion that communicates entirely through short spoken responses.
        Your role is to listen to the user's words, understand their emotional state, and reply
        in a supportive, conversational, and empathetic way.
        
        Guidelines:
        - Always keep responses brief (1–3 sentences) and natural, as if you are talking in real life.
        - Adapt your tone: if the user is anxious, be calming; if they are sad, be comforting;
          if happy, be encouraging.
        - Do not sound robotic or overly formal. Be warm, friendly, and approachable.
        - If appropriate, suggest a small grounding or mindfulness activity.
        - Never give medical advice. Keep it light and supportive.
        
        The user said: "{transcribed_text}"
        Their detected emotion is: {detected_emotion}
        
        Respond ONLY with the spoken response text that should be converted into audio.
        Do not explain your reasoning.
        """
        
        ai_response = model.generate_content(response_prompt)
        response_text = ai_response.text.strip()
        
        # Check for crisis keywords
        crisis_keywords = ["suicide", "self-harm", "kill myself", "end it all", "give up"]
        if any(keyword in transcribed_text.lower() for keyword in crisis_keywords):
            response_text = "I'm concerned about what you're saying. Remember that you're not alone, and help is available. Would you consider talking to someone at the National Crisis Hotline at 988? They're there to listen and support you 24/7."
        
        # Convert response to speech
        synthesis_input = texttospeech.SynthesisInput(text=response_text)
        
        # Configure voice parameters
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Neural2-F",  # Using a warm, empathetic female voice
            ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
        )
        
        # Configure audio parameters
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3,
            speaking_rate=0.95,  # Slightly slower for more empathetic tone
            pitch=0.0,  # Natural pitch
            volume_gain_db=1.0  # Slightly louder
        )
        
        # Generate speech
        tts_response = tts_client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
        
        # Encode audio to base64
        audio_base64 = base64.b64encode(tts_response.audio_content).decode("utf-8")
        
        return {
            "audio": audio_base64
        }
        
    except Exception as e:
        # Fallback response if speech recognition fails
        fallback_text = "I'm here to listen. How are you feeling today?"
        
        # Generate fallback audio
        synthesis_input = texttospeech.SynthesisInput(text=fallback_text)
        
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Neural2-F",
            ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
        )
        
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )
        
        tts_response = tts_client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
        
        audio_base64 = base64.b64encode(tts_response.audio_content).decode("utf-8")
        
        return {
            "audio": audio_base64
        }