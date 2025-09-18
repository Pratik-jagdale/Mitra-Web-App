/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ECDC4',
          dark: '#45B7AF',
          light: '#7EDCD5'
        },
        secondary: {
          DEFAULT: '#FFD93D',
          dark: '#FFC107',
          light: '#FFE57F'
        },
        accent: {
          DEFAULT: '#FF6B6B',
          dark: '#FF5252',
          light: '#FF8A8A'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-slow': 'pulse 2s infinite',
        'bounce-slow': 'bounce 1s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.1)',
        'hover': '0 8px 30px rgba(0, 0, 0, 0.12)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding'
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms'
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }
    }
  },
  plugins: [],
  darkMode: 'media'
}