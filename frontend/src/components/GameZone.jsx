import { useState, useEffect } from 'react'

const GameZone = () => {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [reactionTimes, setReactionTimes] = useState([])
  
  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setReactionTimes([])
    // Initialize game logic here
  }

  const handleGameAction = (reactionTime) => {
    setScore(prev => prev + 1)
    setReactionTimes(prev => [...prev, reactionTime])

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
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Play games, have fun, feel better
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
        {!gameStarted ? (
          <div className="text-center">
            <p className="mb-4">Ready to play?</p>
            <button
              onClick={startGame}
              className="btn-primary"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="game-container">
            {/* Game interface will go here */}
            <div className="text-center">
              <p className="text-xl mb-4">Score: {score}</p>
              {/* Game elements */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameZone