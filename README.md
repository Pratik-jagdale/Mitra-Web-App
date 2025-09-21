# Mitra App

A mental wellness tracking app disguised as fun games, featuring an AI voice companion and a judge dashboard.

## Features

- Interactive games that track user engagement and mood
- Hidden AI companion with voice interaction
- Judge dashboard for monitoring user wellbeing
- Crisis detection and alert system


## Tech Stack 

### Frontend
- React with Vite
- TailwindCSS for styling
- Chart.js for visualizations
- React Router for navigation


### Backend
- FastAPI (Python)
- Google Cloud AI tools:
  - Gemini API for conversations
  - Speech-to-Text & Text-to-Speech APIs

## Prerequisites

1. Node.js (v16 or higher)
2. Python 3.8 or higher
3. Google Cloud Platform account with required APIs enabled
4. Google Cloud credentials configured

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:5173

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file:
   ```bash
   cp .env.example .env
   ```

5. Add your Google Cloud API credentials to the .env file

6. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

The backend API will be available at http://localhost:8000

## Usage

1. Open http://localhost:5173 in your browser
2. Play games on the main page
3. Triple-click the Mitra logo to unlock the AI companion
4. Access the judge dashboard to view analytics

## API Documentation

- POST /api/analyze_game: Submit game performance data
- POST /api/chat_ai: Send audio for AI conversation
- GET /api/dashboard_data: Retrieve analytics data

## Development

- Frontend code is in src/components/
- Backend endpoints are in main.py

## License

This project is MIT licensed.