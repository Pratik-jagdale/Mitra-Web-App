import { useState, useEffect } from 'react'
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

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard_data')
        const data = await response.json()
        
        setMoodData({
          labels: data.dates,
          datasets: [
            {
              label: 'Mood Score',
              data: data.moodScores,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        })
        
        setAlertData(data.alerts || [])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">Judge Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Mood Insights */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Mood Insights</h2>
          <div className="h-[250px] sm:h-[300px]">
            <Line 
              data={moodData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 12
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    ticks: {
                      font: {
                        size: 10
                      }
                    }
                  },
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      font: {
                        size: 10
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Crisis Alerts */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Crisis Detection Alerts</h2>
          {alertData.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {alertData.map((alert, index) => (
                <div 
                  key={index}
                  className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-700 text-sm sm:text-base">{alert.message}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  <div className="mt-2">
                    <strong className="text-xs sm:text-sm">Helpline Numbers:</strong>
                    <ul className="list-disc list-inside text-xs sm:text-sm mt-1">
                      <li>Emergency: 911</li>
                      <li>National Crisis Line: 1-800-273-8255</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">No crisis alerts detected.</p>
            </div>
          )}
        </div>

        {/* Data Pipeline Diagram */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Data Pipeline Overview</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-600">Game Data</span>
            </div>
            <div className="hidden sm:block text-gray-400">→</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-600">Analysis Engine</span>
            </div>
            <div className="hidden sm:block text-gray-400">→</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-600">Mood Insights</span>
            </div>
            <div className="hidden sm:block text-gray-400">→</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.725-1.36 3.49 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-600">Crisis Detection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard