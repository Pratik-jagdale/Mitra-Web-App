import { useState, useEffect } from 'react'

const MemoryGame = () => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const emotionPairs = [
    { id: 1, emotion: '😊', name: 'Happy' },
    { id: 2, emotion: '😢', name: 'Sad' },
    { id: 3, emotion: '😠', name: 'Angry' },
    { id: 4, emotion: '😨', name: 'Afraid' },
    { id: 5, emotion: '😌', name: 'Calm' },
    { id: 6, emotion: '🥰', name: 'Love' },
  ]

  const initializeGame = () => {
    const duplicatedEmotions = [...emotionPairs, ...emotionPairs]
    const shuffledCards = duplicatedEmotions
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }))
    setCards(shuffledCards)
    setFlipped([])
    setMatched([])
    setScore(0)
    setMoves(0)
    setGameStarted(true)
  }

  const handleCardClick = (uniqueId) => {
    if (
      flipped.length === 2 || 
      flipped.includes(uniqueId) || 
      matched.includes(uniqueId)
    ) return

    const newFlipped = [...flipped, uniqueId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1)
      const [firstId, secondId] = newFlipped
      const firstCard = cards.find(card => card.uniqueId === firstId)
      const secondCard = cards.find(card => card.uniqueId === secondId)

      if (firstCard.id === secondCard.id) {
        setMatched(prev => [...prev, firstId, secondId])
        setScore(prev => prev + 10)
        setFlipped([])

        // Send game data to backend
        fetch('/api/analyze_game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score,
            reactionTime: moves,
            timestamp: new Date().toISOString(),
          }),
        })
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  const isGameComplete = matched.length === cards.length && cards.length > 0

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Emotion Memory Game</h2>
          <p className="text-gray-600 mb-4">
            Match pairs of emotions to improve your emotional recognition skills
          </p>
          {gameStarted && (
            <div className="flex justify-center space-x-8 mb-4">
              <p className="text-lg">Score: {score}</p>
              <p className="text-lg">Moves: {moves}</p>
            </div>
          )}
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <button
              onClick={initializeGame}
              className="btn-primary text-lg px-8 py-3"
            >
              Start Game
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {cards.map(({ uniqueId, emotion, name }) => (
                <div
                  key={uniqueId}
                  onClick={() => handleCardClick(uniqueId)}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg 
                    cursor-pointer transition-all duration-300 transform 
                    hover:scale-105 text-3xl
                    ${flipped.includes(uniqueId) || matched.includes(uniqueId)
                      ? 'bg-white shadow-md'
                      : 'bg-primary text-white'
                    }
                  `}
                >
                  {flipped.includes(uniqueId) || matched.includes(uniqueId) ? (
                    <div className="text-center">
                      <div className="text-4xl mb-1">{emotion}</div>
                      <div className="text-sm">{name}</div>
                    </div>
                  ) : '?'}
                </div>
              ))}
            </div>

            {isGameComplete && (
              <div className="text-center animate-fade-in">
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  Congratulations! 🎉
                </h3>
                <p className="mb-4">
                  You completed the game in {moves} moves with a score of {score}!
                </p>
                <button
                  onClick={initializeGame}
                  className="btn-primary"
                >
                  Play Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MemoryGame