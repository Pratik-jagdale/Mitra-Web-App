from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os
import json
import google.cloud.speech as speech
import google.cloud.texttospeech as tts
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google Cloud clients
speech_client = speech.SpeechClient()
tts_client = tts.TextToSpeechClient()
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

# Models for request/response
class GameData(BaseModel):
    score: int
    reactionTime: float
    timestamp: str

class ChatResponse(BaseModel):
    text: str
    audio: str

# Crisis keywords to monitor
CRISIS_KEYWORDS = [
    "suicide", "kill myself", "end it all", "give up",
    "no point", "worthless", "can't go on"
]

def check_crisis_keywords(text: str) -> bool:
    return any(keyword in text.lower() for keyword in CRISIS_KEYWORDS)

@app.post("/analyze_game")
async def analyze_game(data: GameData):
    # Store game data and analyze mood
    # For demo, return mock analysis
    return {
        "mood_score": min(100, data.score * 10),
        "analysis": "User showing good engagement"
    }

@app.post("/chat_ai")
async def chat_ai(audio: UploadFile = File(...)):
    try:
        # Convert audio to text
        content = await audio.read()
        audio_input = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
            sample_rate_hertz=48000,
            language_code="en-US",
        )
        response = speech_client.recognize(config=config, audio=audio_input)

        if not response.results:
            return {"error": "No speech detected"}

        user_text = response.results[0].alternatives[0].transcript

        # Check for crisis keywords
        if check_crisis_keywords(user_text):
            # In a real app, trigger alerts and log the incident
            pass

        # Generate AI response using Gemini
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_text(
            f"As a supportive AI friend, respond to: {user_text}"
        )
        ai_response = response.text

        # Convert response to speech
        synthesis_input = tts.SynthesisInput(text=ai_response)
        voice = tts.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Neural2-F",
            ssml_gender=tts.SsmlVoiceGender.FEMALE,
        )
        audio_config = tts.AudioConfig(
            audio_encoding=tts.AudioEncoding.MP3
        )

        response = tts_client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )

        return ChatResponse(
            text=ai_response,
            audio=response.audio_content.encode('base64')
        )

    except Exception as e:
        return {"error": str(e)}

@app.get("/dashboard_data")
async def dashboard_data():
    # In a real app, fetch this from a database
    return {
        "dates": ["2023-09-01", "2023-09-02", "2023-09-03"],
        "moodScores": [75, 82, 78],
        "alerts": [
            {
                "timestamp": "2023-09-02T15:30:00Z",
                "message": "User expressed feelings of hopelessness",
                "severity": "medium"
            }
        ]
    }