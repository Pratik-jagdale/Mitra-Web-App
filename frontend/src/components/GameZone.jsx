import { useState, useEffect } from 'react'
import MemoryGame from './MemoryGame'

const GameZone = () => {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [reactionTimes, setReactionTimes] = useState([])
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [selectedGame, setSelectedGame] = useState(null) // 'mood' or 'memory'

  const emotions = [
    { color: '#FF6B6B', name: 'Anger', description: 'Hot, intense feelings of frustration' },
    { color: '#4ECDC4', name: 'Calm', description: 'Peaceful, tranquil state of mind' },
    { color: '#FFD93D', name: 'Joy', description: 'Bright, positive feelings of happiness' },
    { color: '#6C5CE7', name: 'Sadness', description: 'Deep, heavy feelings of sorrow' },
    { color: '#A8E6CF', name: 'Hope', description: 'Light, uplifting feelings of optimism' }
  ]

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setReactionTimes([])
    showNextEmotion()
  }

  const showNextEmotion = () => {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
    setCurrentEmotion(randomEmotion)
    setShowFeedback(false)
  }

  const handleEmotionSelect = (selectedEmotion) => {
    const startTime = performance.now()
    const reactionTime = startTime - (window.lastEmotionTime || startTime)
    window.lastEmotionTime = startTime

    const isCorrect = selectedEmotion.name === currentEmotion.name
    setScore(prev => isCorrect ? prev + 10 : prev)
    setFeedbackMessage(isCorrect ? 'Great job! 🌟' : 'Keep trying! 💪')
    setShowFeedback(true)

    // Send game data to backend
    fetch('/api/analyze_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score,
        reactionTime,
        timestamp: new Date().toISOString(),
      }),
    })

    setTimeout(showNextEmotion, 1500)
  }

  const renderGameSelection = () => (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-6">Choose Your Game</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => setSelectedGame('mood')}
          className="p-6 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white transition-transform hover:scale-105"
        >
          <h3 className="text-xl font-bold mb-2">Mood Matcher</h3>
          <p className="text-sm opacity-90">
            Match colors with emotions to improve emotional awareness
          </p>
        </button>
        <button
          onClick={() => setSelectedGame('memory')}
          className="p-6 rounded-lg bg-gradient-to-r from-secondary to-green-500 text-white transition-transform hover:scale-105"
        >
          <h3 className="text-xl font-bold mb-2">Emotion Memory</h3>
          <p className="text-sm opacity-90">
            Train your memory while learning about emotions
          </p>
        </button>
      </div>
    </div>
  )

  const renderMoodGame = () => (
    <div className="game-container">
      {!gameStarted ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Mood Matcher!</h2>
          <p className="mb-6 text-gray-600">
            Match the colors with their corresponding emotions. This game helps understand
            your emotional awareness and response patterns.
          </p>
          <div className="space-x-4">
            <button
              onClick={startGame}
              className="btn-primary text-lg px-8 py-3"
            >
              Start Game
            </button>
            <button
              onClick={() => setSelectedGame(null)}
              className="btn-secondary text-lg px-8 py-3"
            >
              Back to Games
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                setGameStarted(false)
                setSelectedGame(null)
              }}
              className="btn-secondary"
            >
              Exit Game
            </button>
            <p className="text-xl">Score: {score}</p>
          </div>
          
          {/* Current Emotion Display */}
          {currentEmotion && (
            <div className="mb-8">
              <div 
                className="w-32 h-32 mx-auto rounded-full mb-4 transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: currentEmotion.color }}
              />
              <p className="text-lg text-gray-600">Match this color with the correct emotion</p>
            </div>
          )}

          {/* Feedback Message */}
          {showFeedback && (
            <div className="mb-6 text-lg font-semibold animate-fade-in" 
                 style={{ color: feedbackMessage.includes('Great') ? '#4ECDC4' : '#FF6B6B' }}>
              {feedbackMessage}
            </div>
          )}

          {/* Emotion Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {emotions.map((emotion) => (
              <button
                key={emotion.name}
                onClick={() => handleEmotionSelect(emotion)}
                className="p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: emotion.color,
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                <span className="block text-lg font-semibold">{emotion.name}</span>
                <span className="text-sm opacity-90">{emotion.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Play games, have fun, feel better
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
        {!selectedGame && renderGameSelection()}
        {selectedGame === 'mood' && renderMoodGame()}
        {selectedGame === 'memory' && <MemoryGame />}
      </div>
    </div>
  )
}

export default GameZone