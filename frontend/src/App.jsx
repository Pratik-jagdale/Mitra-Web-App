import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import GameZone from './components/GameZone'
import AICompanion from './components/AICompanion'
import Dashboard from './components/Dashboard'
import CursorParticles from './components/CursorParticles'
import MouseParticles from 'react-mouse-particles';

<MouseParticles g={1} color="random" level={6} />

function App() {
  return (
    <ThemeProvider>
    <div className="min-h-screen w-full overflow-x-hidden bg-lightBg dark:bg-darkBg transition-colors">{
      <div className="min-h-screen relative overflow-hidden">
        {/* Premium Background with Theme-Aware Animations */}
        <div className="fixed inset-0 -z-10">
          {/* Light Mode: Soft moving clouds effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-light-bg via-white to-light-bg dark:hidden animate-background-shift" 
               style={{
                 backgroundImage: `
                   radial-gradient(circle at 20% 80%, rgba(90, 200, 250, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 80% 20%, rgba(255, 183, 3, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 40% 40%, rgba(168, 218, 220, 0.1) 0%, transparent 50%)
                 `,
                 backgroundSize: '400% 400%'
               }}
          />
          
          {/* Dark Mode: Faint starry glow with depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-slate-900 to-dark-bg hidden dark:block animate-background-shift"
               style={{
                 backgroundImage: `
                   radial-gradient(circle at 25% 25%, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 75% 75%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 50% 50%, rgba(255, 209, 102, 0.05) 0%, transparent 50%)
                 `,
                 backgroundSize: '400% 400%'
               }}
          />

          {/* Floating Elements - Light Mode */}
          <div className="absolute inset-0 dark:hidden">
            <motion.div 
              className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-30"
              style={{ 
                background: 'radial-gradient(circle, rgba(90, 200, 250, 0.3) 0%, transparent 70%)'
              }}
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-40 right-20 w-24 h-24 rounded-full opacity-25"
              style={{ 
                background: 'radial-gradient(circle, rgba(255, 183, 3, 0.3) 0%, transparent 70%)'
              }}
              animate={{ 
                y: [0, -15, 0],
                x: [0, -8, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div 
              className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full opacity-20"
              style={{ 
                background: 'radial-gradient(circle, rgba(168, 218, 220, 0.3) 0%, transparent 70%)'
              }}
              animate={{ 
                y: [0, -25, 0],
                x: [0, 12, 0],
                rotate: [0, 8, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          {/* Floating Elements - Dark Mode */}
          <div className="absolute inset-0 hidden dark:block">
            <motion.div 
              className="absolute top-32 left-16 w-40 h-40 rounded-full opacity-20"
              style={{ 
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)'
              }}
              animate={{ 
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-48 right-24 w-32 h-32 rounded-full opacity-15"
              style={{ 
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)'
              }}
              animate={{ 
                y: [0, -20, 0],
                x: [0, -12, 0],
                rotate: [0, -8, 0]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            <motion.div 
              className="absolute bottom-32 right-1/3 w-28 h-28 rounded-full opacity-10"
              style={{ 
                background: 'radial-gradient(circle, rgba(255, 209, 102, 0.3) 0%, transparent 70%)'
              }}
              animate={{ 
                y: [0, -35, 0],
                x: [0, 18, 0],
                rotate: [0, 12, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </div>
        </div>

        {/* Cursor Particles Effect */}
        <CursorParticles />

        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="pt-20 relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <GameZone />
                </motion.div>
              } />
              <Route path="/ai-companion" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <AICompanion />
                </motion.div>
              } />
              <Route path="/dashboard" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Dashboard />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
      </div>}
    </div>
    </ThemeProvider>
  )
}

export default App