import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MemoryGame from './MemoryGame'
import { gameStats, userEngagement, achievements } from '../data/homeData'

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
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.h2 
        className="text-4xl lg:text-5xl font-bold mb-12 bg-gradient-to-r from-light-text to-light-primary dark:from-dark-text dark:to-dark-primary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Choose Your Journey
      </motion.h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        <motion.button
          onClick={() => setSelectedGame('mood')}
          className="group relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -8 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="game-card-premium dark:game-card-premium-dark p-12 text-center h-full">
            <motion.div 
              className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent flex items-center justify-center shadow-2xl group-hover:shadow-glow dark:group-hover:shadow-glow-dark transition-all duration-500"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl">💚</span>
            </motion.div>
            
            <h3 className="text-3xl font-bold mb-4 text-light-text dark:text-dark-text">
              Mood Matcher
            </h3>
            
            <p className="text-lg text-light-muted dark:text-dark-muted leading-relaxed mb-8">
              Connect with your emotions through gentle color matching and peaceful interactions
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-light-primary dark:text-dark-primary">
              <span className="font-semibold">Start Journey</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <motion.div 
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-light-primary/30 dark:bg-dark-primary/30"
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              />
              <motion.div 
                className="absolute bottom-8 left-6 w-1 h-1 rounded-full bg-light-accent/40 dark:bg-dark-accent/40"
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
              <motion.div 
                className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-light-secondary/30 dark:bg-dark-secondary/30"
                animate={{ 
                  y: [0, -25, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />
            </div>
          </div>
        </motion.button>
        
        <motion.button
          onClick={() => setSelectedGame('memory')}
          className="group relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -8 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="game-card-premium dark:game-card-premium-dark p-12 text-center h-full">
            <motion.div 
              className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-light-accent to-light-primary dark:from-dark-accent dark:to-dark-primary flex items-center justify-center shadow-2xl group-hover:shadow-glow dark:group-hover:shadow-glow-dark transition-all duration-500"
              whileHover={{ rotate: -5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl">🧠</span>
            </motion.div>
            
            <h3 className="text-3xl font-bold mb-4 text-light-text dark:text-dark-text">
              Emotion Memory
            </h3>
            
            <p className="text-lg text-light-muted dark:text-dark-muted leading-relaxed mb-8">
              Strengthen your mind while exploring emotional wellness through gentle memory exercises
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-light-primary dark:text-dark-primary">
              <span className="font-semibold">Begin Training</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                →
              </motion.span>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <motion.div 
                className="absolute top-6 left-4 w-2 h-2 rounded-full bg-light-accent/30 dark:bg-dark-accent/30"
                animate={{ 
                  y: [0, -18, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="absolute bottom-6 right-4 w-1 h-1 rounded-full bg-light-primary/40 dark:bg-dark-primary/40"
                animate={{ 
                  y: [0, -22, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 1.5 }}
              />
              <motion.div 
                className="absolute top-1/3 left-8 w-1.5 h-1.5 rounded-full bg-light-secondary/30 dark:bg-dark-secondary/30"
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 2.5 }}
              />
            </div>
          </div>
        </motion.button>
      </div>

      {/* Engagement Stats Section */}
      <motion.div
        className="mt-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-light-text to-light-primary dark:from-dark-text dark:to-dark-primary bg-clip-text text-transparent">
          Your Wellness Journey
        </h3>
        
        {/* Weekly Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto">
          {userEngagement.weeklyHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="card-premium dark:card-premium-dark p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <span className="text-3xl mb-3 block">{highlight.icon}</span>
              <h4 className="text-sm text-light-muted dark:text-dark-muted mb-2">{highlight.title}</h4>
              <p className="text-xl font-bold text-light-text dark:text-dark-text">{highlight.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="max-w-6xl mx-auto">
          <h4 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
            Recent Achievements
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="card-premium dark:card-premium-dark p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{achievement.icon}</span>
                  <div>
                    <h5 className="font-bold text-light-text dark:text-dark-text">{achievement.name}</h5>
                    <p className="text-sm text-light-muted dark:text-dark-muted">{achievement.description}</p>
                  </div>
                </div>
                <div className="relative w-full h-2 bg-light-primary/10 dark:bg-dark-primary/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-light-primary dark:bg-dark-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1, delay: 1 + index * 0.1 }}
                  />
                </div>
                <p className="text-right mt-2 text-sm text-light-muted dark:text-dark-muted">
                  {achievement.progress}%
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  const renderMoodGame = () => (
    <motion.div 
      className="game-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {!gameStarted ? (
        <motion.div 
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-light-text to-light-primary dark:from-dark-text dark:to-dark-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Mood Matcher
          </motion.h2>
          
          <motion.p 
            className="mb-12 text-light-muted dark:text-dark-muted text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Connect with your emotions through gentle color matching. This peaceful activity helps you understand your emotional awareness and response patterns in a calming environment.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={startGame}
              className="btn-primary-premium text-lg px-10 py-4 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Journey ✨
            </motion.button>
            
            <motion.button
              onClick={() => setSelectedGame(null)}
              className="btn-secondary-premium text-lg px-10 py-4 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Games
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
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <motion.button
              onClick={() => {
                setGameStarted(false)
                setSelectedGame(null)
              }}
              className="btn-secondary-premium text-base px-6 py-3 order-2 sm:order-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Exit
            </motion.button>
            
            <motion.div 
              className="order-1 sm:order-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <div className="card-premium dark:card-premium-dark px-8 py-4">
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">
                  Score: <span className="text-light-primary dark:text-dark-primary">{score}</span>
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Current Emotion Display */}
          <AnimatePresence mode="wait">
            {currentEmotion && (
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <motion.div 
                  className="w-40 h-40 lg:w-48 lg:h-48 mx-auto rounded-full mb-8 shadow-2xl flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: currentEmotion.color }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ 
                    boxShadow: [
                      "0 20px 40px rgba(0,0,0,0.1)",
                      "0 30px 60px rgba(0,0,0,0.15)",
                      "0 20px 40px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-6xl lg:text-7xl">{currentEmotion.emoji}</span>
                  
                  {/* Glowing ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-gentle-pulse" />
                </motion.div>
                
                <p className="text-xl lg:text-2xl text-light-text dark:text-dark-text font-medium">
                  Match this feeling with the correct emotion
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback Message */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div 
                className="mb-8 text-2xl lg:text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5, type: "spring" }}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {emotions.map((emotion, index) => (
              <motion.button
                key={emotion.name}
                onClick={() => handleEmotionSelect(emotion)}
                className="relative p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg overflow-hidden"
                style={{ 
                  backgroundColor: emotion.color,
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center relative z-10">
                  <div className="text-4xl lg:text-5xl mb-4">{emotion.emoji}</div>
                  <span className="block text-xl lg:text-2xl font-bold mb-3">{emotion.name}</span>
                  <span className="text-base lg:text-lg opacity-90 leading-tight">{emotion.description}</span>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-6 lg:px-8 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.h1 
        className="text-4xl lg:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-light-text to-light-primary dark:from-dark-text dark:to-dark-primary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Find Your Inner Peace
      </motion.h1>
      
      <motion.div 
        className="card-premium dark:card-premium-dark p-8 lg:p-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        whileHover={{ scale: 1.01, y: -5 }}
      >
        <AnimatePresence mode="wait">
          {!selectedGame && renderGameSelection()}
          {selectedGame === 'mood' && renderMoodGame()}
          {selectedGame === 'memory' && <MemoryGame onExit={() => setSelectedGame(null)} />}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default GameZone