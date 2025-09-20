import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

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
      className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20 dark:border-dark-600/20 transition-colors duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <span className="ml-3 text-2xl font-serif font-semibold text-calm-800 dark:text-dark-50 transition-colors duration-300">
              Mitra
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 shadow-md' 
                      : 'text-calm-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-dark-700/50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <motion.button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-2xl text-calm-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-dark-700/50 focus:outline-none focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all duration-300"
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
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-4 pb-6 space-y-2 bg-white/60 dark:bg-dark-700/60 backdrop-blur-md rounded-2xl mt-2 border border-white/30 dark:border-dark-600/30 transition-colors duration-300">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 shadow-md'
                          : 'text-calm-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-dark-600/50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
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