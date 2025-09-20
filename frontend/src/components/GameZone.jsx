import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    { color: '#FFB3BA', name: 'Calm', description: 'Peaceful, tranquil state of mind', emoji: '😌' },
    { color: '#FFDFBA', name: 'Joy', description: 'Bright, positive feelings of happiness', emoji: '😊' },
    { color: '#FFFFBA', name: 'Hope', description: 'Light, uplifting feelings of optimism', emoji: '✨' },
    { color: '#BAFFC9', name: 'Peace', description: 'Serene and content feelings', emoji: '🕊️' },
    { color: '#BAE1FF', name: 'Tranquil', description: 'Deep sense of calm and relaxation', emoji: '🌊' }
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
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-serif font-semibold mb-8 text-calm-800 dark:text-dark-50 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Choose Your Journey
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
        <motion.button
          onClick={() => setSelectedGame('mood')}
          className="group bg-white/60 dark:bg-dark-600/60 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/30 dark:border-dark-500/30 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
              whileHover={{ rotate: 5 }}
            >
              <span className="text-3xl sm:text-4xl">💚</span>
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 text-calm-800 dark:text-dark-50 transition-colors duration-300">Mood Matcher</h3>
            <p className="text-sm sm:text-base text-calm-600 dark:text-dark-300 leading-relaxed transition-colors duration-300">
              Connect with your emotions through gentle color matching
            </p>
          </div>
        </motion.button>
        
        <motion.button
          onClick={() => setSelectedGame('memory')}
          className="group bg-white/60 dark:bg-dark-600/60 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/30 dark:border-dark-500/30 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 dark:from-accent-500 dark:to-accent-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
              whileHover={{ rotate: -5 }}
            >
              <span className="text-3xl sm:text-4xl">🧠</span>
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 text-calm-800 dark:text-dark-50 transition-colors duration-300">Emotion Memory</h3>
            <p className="text-sm sm:text-base text-calm-600 dark:text-dark-300 leading-relaxed transition-colors duration-300">
              Strengthen your mind while exploring emotional wellness
            </p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  )

  const renderMoodGame = () => (
    <motion.div 
      className="game-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!gameStarted ? (
        <motion.div 
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-serif font-semibold mb-6 text-calm-800 dark:text-dark-50 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Mood Matcher
          </motion.h2>
          <motion.p 
            className="mb-8 text-calm-600 dark:text-dark-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Connect with your emotions through gentle color matching. This peaceful activity helps you understand your emotional awareness and response patterns.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={startGame}
              className="btn-primary text-base sm:text-lg px-8 py-4 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Journey
            </motion.button>
            <motion.button
              onClick={() => setSelectedGame(null)}
              className="btn-ghost text-base sm:text-lg px-8 py-4 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Games
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <motion.button
              onClick={() => {
                setGameStarted(false)
                setSelectedGame(null)
              }}
              className="btn-ghost text-sm sm:text-base px-6 py-3 order-2 sm:order-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Exit
            </motion.button>
            <motion.div 
              className="order-1 sm:order-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <p className="text-xl sm:text-2xl font-serif font-semibold text-calm-800">Score: {score}</p>
            </motion.div>
          </div>
          
          {/* Current Emotion Display */}
          <AnimatePresence mode="wait">
            {currentEmotion && (
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <motion.div 
                  className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full mb-6 shadow-2xl flex items-center justify-center"
                  style={{ backgroundColor: currentEmotion.color }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ 
                    boxShadow: [
                      "0 10px 30px rgba(0,0,0,0.1)",
                      "0 20px 40px rgba(0,0,0,0.15)",
                      "0 10px 30px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-4xl sm:text-5xl">{currentEmotion.emoji}</span>
                </motion.div>
                <p className="text-lg sm:text-xl text-calm-600 font-medium">Match this feeling with the correct emotion</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback Message */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div 
                className="mb-8 text-xl sm:text-2xl font-semibold"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4, type: "spring" }}
                style={{ 
                  color: feedbackMessage.includes('Great') ? '#4ECDC4' : '#FFB3BA' 
                }}
              >
                {feedbackMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Emotion Buttons */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {emotions.map((emotion, index) => (
              <motion.button
                key={emotion.name}
                onClick={() => handleEmotionSelect(emotion)}
                className="p-6 sm:p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
                style={{ 
                  backgroundColor: emotion.color,
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-3">{emotion.emoji}</div>
                  <span className="block text-lg sm:text-xl font-semibold mb-2">{emotion.name}</span>
                  <span className="text-sm sm:text-base opacity-90 leading-tight">{emotion.description}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-center mb-8 sm:mb-12 text-calm-800 dark:text-dark-50 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Find Your Inner Peace
      </motion.h1>
      
      <motion.div 
        className="card bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-white/20 dark:border-dark-600/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {!selectedGame && renderGameSelection()}
          {selectedGame === 'mood' && renderMoodGame()}
          {selectedGame === 'memory' && <MemoryGame />}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default GameZone