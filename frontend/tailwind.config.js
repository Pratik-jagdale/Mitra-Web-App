/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Premium Light Mode Palette
        light: {
          bg: '#F8FAFC',      // Airy white with hint of blue
          primary: '#5AC8FA', // Calm sky blue
          secondary: '#A8DADC', // Soft aqua
          text: '#1E293B',    // Deep navy gray
          muted: '#64748B',   // Cool gray
          accent: '#FFB703',  // Warm yellow for happiness
        },
        // Premium Dark Mode Palette
        dark: {
          bg: '#0F172A',      // Deep midnight blue
          primary: '#38BDF8', // Soft glowing blue
          secondary: '#264653', // Muted dark teal
          text: '#E2E8F0',    // Off-white
          muted: '#94A3B8',   // Soft gray
          accent: '#FFD166',  // Gentle amber
        },
        // Cursor Particle Colors
        particles: {
          light: ['#5AC8FA', '#A8DADC', '#FFB703'], // Light mode particles
          dark: ['#38BDF8', '#A78BFA', '#FFD166'],   // Dark mode particles
        },
        // Legacy support (keeping for existing components)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      animation: {
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 4s ease-in-out infinite',
        'cursor-glow': 'cursor-glow 1.2s ease-out forwards',
        'background-shift': 'background-shift 20s ease-in-out infinite',
        'particle-fade': 'particle-fade 1.2s ease-out forwards',
      },
      keyframes: {
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'gentle-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'cursor-glow': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        },
        'background-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'particle-fade': {
          '0%': { opacity: '1', transform: 'scale(1) translateY(0px)' },
          '100%': { opacity: '0', transform: 'scale(0.3) translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(88, 200, 250, 0.3)',
        'glow-dark': '0 0 20px rgba(56, 189, 248, 0.4)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'premium-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}