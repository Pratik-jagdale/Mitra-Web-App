import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import FistBumpIcon from '../assets/logo_for_mitraApp.png'

const Navbar = () => {
  const [aiUnlocked, setAiUnlocked] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const handleLogoClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    
    if (newCount === 3) {
      setAiUnlocked(true)
      setClickCount(0)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { path: '/', label: 'Game Zone', icon: '🎮' },
    ...(aiUnlocked ? [{ path: '/ai-companion', label: 'AI Friend', icon: '🤖' }] : []),
    { path: '/dashboard', label: 'Dashboard', icon: '📊' }
  ]

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/30 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Premium Logo */}
          <motion.div 
            className="flex items-center cursor-pointer group"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-glow dark:group-hover:shadow-glow-dark transition-all duration-300">
                <img 
                  src={FistBumpIcon} 
                  alt="Mitra Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glowing ring on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
            </div>
            <motion.span 
              className="ml-4 text-2xl font-bold bg-gradient-to-r from-light-text to-light-primary dark:from-dark-text dark:to-dark-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Mitra
            </motion.span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-gradient-to-r from-light-primary/20 to-light-accent/20 dark:from-dark-primary/20 dark:to-dark-accent/20 shadow-lg' 
                        : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className={`font-medium transition-colors duration-300 ${
                      location.pathname === item.path 
                        ? 'text-light-primary dark:text-dark-primary' 
                        : 'text-light-text dark:text-dark-text group-hover:text-light-primary dark:group-hover:text-dark-primary'
                    }`}>
                      {item.label}
                    </span>
                  </motion.div>
                  
                  {/* Active indicator */}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Premium Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <motion.button
              onClick={toggleMobileMenu}
              className="relative p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-lg"
              aria-expanded="false"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6 text-light-text dark:text-dark-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6 text-light-text dark:text-dark-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Premium Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-4 pb-6 space-y-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl mt-2 border border-white/30 dark:border-slate-800/30 shadow-xl">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-light-primary/20 to-light-accent/20 dark:from-dark-primary/20 dark:to-dark-accent/20 text-light-primary dark:text-dark-primary shadow-lg'
                          : 'text-light-text dark:text-dark-text hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-light-primary dark:hover:text-dark-primary'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar