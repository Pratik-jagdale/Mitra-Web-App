import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const CursorParticles = () => {
  const { theme } = useTheme()
  const [particles, setParticles] = useState([])
  const containerRef = useRef(null)
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const particleIdRef = useRef(0)

  // Particle colors based on theme
  const particleColors = theme === 'dark' 
    ? ['#38BDF8', '#A78BFA', '#FFD166'] // Dark mode
    : ['#5AC8FA', '#A8DADC', '#FFB703'] // Light mode

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Only create particles if mouse moved significantly
      const distance = Math.sqrt(
        Math.pow(x - lastMouseRef.current.x, 2) + 
        Math.pow(y - lastMouseRef.current.y, 2)
      )

      if (distance > 10) { // Minimum distance to create new particle
        const newParticle = {
          id: particleIdRef.current++,
          x,
          y,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          size: Math.random() * 4 + 2, // 2-6px
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          }
        }

        setParticles(prev => {
          const newParticles = [...prev, newParticle]
          // Keep only 10 particles max
          return newParticles.slice(-10)
        })

        lastMouseRef.current = { x, y }

        // Remove particle after 1.2s
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id))
        }, 1200)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [particleColors])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              filter: 'blur(1px)',
            }}
            initial={{ 
              opacity: 1, 
              scale: 1,
              x: 0,
              y: 0,
            }}
            animate={{ 
              opacity: 0, 
              scale: 0.3,
              x: particle.velocity.x * 20,
              y: particle.velocity.y * 20,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default CursorParticles
