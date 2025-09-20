import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import GameZone from './components/GameZone'
import AICompanion from './components/AICompanion'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50 dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 relative overflow-hidden transition-colors duration-500">
        {/* Calming background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200/30 dark:bg-primary-500/20 rounded-full animate-gentle-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent-200/30 dark:bg-accent-500/20 rounded-full animate-gentle-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-secondary-300/30 dark:bg-secondary-500/20 rounded-full animate-gentle-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-primary-300/20 dark:bg-primary-600/20 rounded-full animate-gentle-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <GameZone />
                </motion.div>
              } />
              <Route path="/ai-companion" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <AICompanion />
                </motion.div>
              } />
              <Route path="/dashboard" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Dashboard />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App