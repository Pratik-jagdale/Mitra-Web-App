import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MemoryGame = () => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const emotionPairs = [
    { id: 1, emotion: '😌', name: 'Calm', color: '#FFB3BA' },
    { id: 2, emotion: '😊', name: 'Joy', color: '#FFDFBA' },
    { id: 3, emotion: '✨', name: 'Hope', color: '#FFFFBA' },
    { id: 4, emotion: '🕊️', name: 'Peace', color: '#BAFFC9' },
    { id: 5, emotion: '🌊', name: 'Tranquil', color: '#BAE1FF' },
    { id: 6, emotion: '🌸', name: 'Serene', color: '#FFB3E6' },
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
    <motion.div 
      className="max-w-7xl mx-auto mt-4 sm:mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-white/20 dark:border-dark-600/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-calm-800 dark:text-dark-50 transition-colors duration-300">Emotion Memory Journey</h2>
          <p className="text-calm-600 dark:text-dark-300 mb-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
            Strengthen your mind while exploring emotional wellness through gentle memory exercises
          </p>
          {gameStarted && (
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="bg-primary-100/50 dark:bg-primary-900/30 rounded-2xl px-6 py-3 transition-colors duration-300">
                <p className="text-lg sm:text-xl font-semibold text-calm-800 dark:text-dark-50 transition-colors duration-300">Score: {score}</p>
              </div>
              <div className="bg-accent-100/50 dark:bg-accent-900/30 rounded-2xl px-6 py-3 transition-colors duration-300">
                <p className="text-lg sm:text-xl font-semibold text-calm-800 dark:text-dark-50 transition-colors duration-300">Moves: {moves}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {!gameStarted ? (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={initializeGame}
              className="btn-primary text-lg px-10 py-4 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Memory Journey
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {cards.map(({ uniqueId, emotion, name, color }, index) => (
                <motion.div
                  key={uniqueId}
                  onClick={() => handleCardClick(uniqueId)}
                  className={`
                    aspect-square flex items-center justify-center rounded-2xl 
                    cursor-pointer transition-all duration-300 transform 
                    hover:scale-105 active:scale-95 text-2xl sm:text-3xl shadow-lg
                    ${flipped.includes(uniqueId) || matched.includes(uniqueId)
                      ? 'bg-white/90 dark:bg-dark-600/90 backdrop-blur-sm border-2 border-primary-300 dark:border-primary-500'
                      : 'bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 text-white hover:shadow-xl'
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {flipped.includes(uniqueId) || matched.includes(uniqueId) ? (
                    <motion.div 
                      className="text-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">{emotion}</div>
                      <div className="text-xs sm:text-sm font-medium text-calm-700 dark:text-dark-300 transition-colors duration-300">{name}</div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="text-2xl sm:text-3xl font-bold"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ?
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <AnimatePresence>
              {isGameComplete && (
                <motion.div 
                  className="text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 border border-green-200 dark:border-green-700 shadow-xl transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-green-700 dark:text-green-400 mb-4 transition-colors duration-300">
                    Wonderful Achievement!
                  </h3>
                  <p className="mb-6 text-base sm:text-lg text-green-600 dark:text-green-300 transition-colors duration-300">
                    You completed your memory journey in {moves} moves with a score of {score}!
                  </p>
                  <motion.button
                    onClick={initializeGame}
                    className="btn-primary text-base px-8 py-3 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Journey Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default MemoryGame