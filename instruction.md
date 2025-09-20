Instruction to AI Agent:
You are an expert full-stack web developer. Build a responsive web app prototype for a hackathon project called Mitra App. The app disguises mental wellness tracking as fun games, with a hidden AI voice companion and a judge dashboard. Use React (frontend) and FastAPI/Flask (backend). Deploy backend on Google Cloud Run and integrate Google Cloud AI tools.



🔹 Core Requirements

1. Tech Stack

Frontend: React (with Vite or Next.js), TailwindCSS for styling, Chart.js or Recharts for graphs.

Backend: Python FastAPI (or Flask) with REST APIs.

Cloud Integration:

Google Gemini API → conversation + cultural AI.

Google Speech-to-Text + Text-to-Speech APIs → voice interaction.

Firebase Firestore (optional) → store user scores.

BigQuery (optional) → future scalability demo.

2. App Structure

Landing Page / Game Zone

Show dynamic logo + tagline: “Play games, have fun, feel better.”

Interactive Mood Matcher game:

User sees color → must match with emotion label (e.g., red → anger, blue → calm).

Capture reaction time, accuracy, hesitation.

Store/send results to backend.

Hidden AI Friend

Secret unlock: triple-click logo OR hidden button.

Opens a chat window with mic input.

Flow:

Capture user voice → send to backend.

Backend → Google Speech-to-Text.

Send text to Gemini → generate culturally aware supportive response.

Convert back to speech with TTS → play audio reply.

Display transcript in chat UI.

Judge Dashboard

Separate tab/page.

Show:

Mood insights from game (bar chart/line graph).

Crisis detection alert (if user says “end it all”, display helpline numbers).

Example data pipeline diagram (optional).

3. Backend APIs

/analyze_game → receives game data → returns mood analysis JSON.

/chat_ai → receives voice/text → processes via Gemini → returns text + audio.

/dashboard_data → returns aggregated mood stats (mock if needed).

Crisis detection → scan input text for suicide/self-harm keywords, return escalation flag + helpline numbers.

4. Design Guidelines

Clean, minimal, youth-friendly interface.

Responsive across mobile + desktop.

Use animations in game for engagement.

Use bright Indian cultural colors (orange, blue, green, pink).

5. Deliverables

React frontend code with three main components:

GameZone.jsx → Mood Matcher game.

AICompanion.jsx → Hidden AI chat (voice + text).

Dashboard.jsx → Judge-facing charts.

FastAPI backend with endpoints for AI integration + crisis detection.

Example .env file for API keys.

Basic instructions to run locally:

npm run dev for frontend.

uvicorn main:app --reload for backend.

6. Demo Script Alignment

First show game → then unlock AI friend → finally switch to dashboard.

Make sure demo mode is predictable (use sample fallback responses if APIs fail).

Final AI Task:
Generate the full project scaffolding (frontend + backend) with placeholder code where API keys are needed. Ensure code is modular and ready to run.