import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [moodData, setMoodData] = useState({
    labels: [],
    datasets: []
  })
  const [alertData, setAlertData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/dashboard_data')
        const data = await response.json()
        
        setMoodData({
          labels: data.dates || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Mood Score',
              data: data.moodScores || [85, 78, 92, 88, 95, 87, 91],
              borderColor: '#5AC8FA',
              backgroundColor: 'rgba(90, 200, 250, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#5AC8FA',
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            }
          ]
        })
        
        setAlertData(data.alerts || [])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Fallback data
        setMoodData({
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Mood Score',
              data: [85, 78, 92, 88, 95, 87, 91],
              borderColor: '#5AC8FA',
              backgroundColor: 'rgba(90, 200, 250, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#5AC8FA',
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            }
          ]
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1E293B',
        bodyColor: '#64748B',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748B',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(100, 116, 139, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748B',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Header */}
      <motion.div 
        className="text-center mb-12"
        variants={cardVariants}
      >
        <motion.h1 
          className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-light-text to-light-primary dark:from-dark-text dark:to-dark-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Wellness Dashboard
        </motion.h1>
        <motion.p 
          className="text-lg text-light-muted dark:text-dark-muted max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Track your mental wellness journey with beautiful insights and gentle guidance
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Premium Mood Insights Card */}
        <motion.div 
          className="card-premium dark:card-premium-dark p-8"
          variants={cardVariants}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                Mood Insights
              </h2>
              <p className="text-light-muted dark:text-dark-muted">
                Your emotional wellness over time
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent flex items-center justify-center shadow-lg">
              <span className="text-2xl">📈</span>
            </div>
          </div>
          
          <div className="h-80">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="loading-premium w-full h-32 rounded-2xl" />
              </div>
            ) : (
              <Line data={moodData} options={chartOptions} />
            )}
          </div>
          
          {/* Insights Summary */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10">
              <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">87</div>
              <div className="text-sm text-light-muted dark:text-dark-muted">Avg Score</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10">
              <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">↗️</div>
              <div className="text-sm text-light-muted dark:text-dark-muted">Trending</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10">
              <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">95</div>
              <div className="text-sm text-light-muted dark:text-dark-muted">Best Day</div>
            </div>
          </div>
        </motion.div>

        {/* Premium Crisis Alerts Card */}
        <motion.div 
          className="card-premium dark:card-premium-dark p-8"
          variants={cardVariants}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                Wellness Alerts
              </h2>
              <p className="text-light-muted dark:text-dark-muted">
                Gentle reminders for your wellbeing
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-light-accent to-light-primary dark:from-dark-accent dark:to-dark-primary flex items-center justify-center shadow-lg">
              <span className="text-2xl">💚</span>
            </div>
          </div>
          
          {alertData.length > 0 ? (
            <div className="space-y-4">
              {alertData.map((alert, index) => (
                <motion.div 
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-red-700 dark:text-red-300 font-medium mb-2">{alert.message}</p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  <div className="mt-3 p-3 rounded-xl bg-white/50 dark:bg-black/20">
                    <strong className="text-sm text-red-700 dark:text-red-300">Support Resources:</strong>
                    <ul className="list-disc list-inside text-sm mt-1 text-red-600 dark:text-red-400">
                      <li>Emergency: 911</li>
                      <li>National Crisis Line: 1-800-273-8255</li>
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center shadow-lg">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                All Clear
              </h3>
              <p className="text-light-muted dark:text-dark-muted">
                No wellness alerts detected. Keep up the great work!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Premium Data Pipeline Card */}
        <motion.div 
          className="lg:col-span-2 card-premium dark:card-premium-dark p-8"
          variants={cardVariants}
          whileHover={{ scale: 1.01, y: -3 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                Wellness Journey Overview
              </h2>
              <p className="text-light-muted dark:text-dark-muted">
                How your data flows through our gentle analysis system
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-light-secondary to-light-primary dark:from-dark-secondary dark:to-dark-primary flex items-center justify-center shadow-lg">
              <span className="text-2xl">🔄</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-12">
            {[
              { icon: '🎮', label: 'Game Data', color: 'from-light-primary to-light-secondary' },
              { icon: '🧠', label: 'Analysis Engine', color: 'from-light-secondary to-light-accent' },
              { icon: '💚', label: 'Wellness Insights', color: 'from-light-accent to-light-primary' },
              { icon: '✨', label: 'Gentle Guidance', color: 'from-light-primary to-light-accent' },
            ].map((step, index) => (
              <motion.div 
                key={step.label}
                className="flex flex-col items-center space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} dark:from-dark-primary dark:to-dark-accent flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <span className="text-sm font-medium text-light-text dark:text-dark-text text-center">
                  {step.label}
                </span>
                {index < 3 && (
                  <div className="hidden sm:block absolute left-1/2 top-8 w-12 h-0.5 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent transform translate-x-6" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard