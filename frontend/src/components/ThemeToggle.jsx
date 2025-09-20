import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-2xl bg-white/80 dark:bg-dark-700 backdrop-blur-sm hover:bg-white dark:hover:bg-dark-600 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-6 h-6"
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Sun Icon */}
        <motion.svg
          className="absolute inset-0 w-6 h-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ 
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          className="absolute inset-0 w-6 h-6 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-primary-200 dark:bg-primary-800"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}

export default ThemeToggle
