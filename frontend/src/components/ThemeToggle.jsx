import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-glow dark:hover:shadow-glow-dark group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-6 h-6"
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Sun Icon */}
        <motion.svg
          className="absolute inset-0 w-6 h-6 text-light-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={{ 
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0.8,
            rotate: theme === 'light' ? 0 : 90
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          className="absolute inset-0 w-6 h-6 text-dark-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
          animate={{ 
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.8,
            rotate: theme === 'dark' ? 0 : -90
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>
      </motion.div>

      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-light-primary/20 to-light-accent/20 dark:from-dark-primary/20 dark:to-dark-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileTap={{ opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      />

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </motion.button>
  )
}

export default ThemeToggle