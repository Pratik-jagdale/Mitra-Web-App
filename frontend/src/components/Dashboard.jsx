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
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Judge Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mood Insights */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Mood Insights</h2>
          <div className="h-[300px]">
            <Line 
              data={moodData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Crisis Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Crisis Detection Alerts</h2>
          {alertData.length > 0 ? (
            <div className="space-y-4">
              {alertData.map((alert, index) => (
                <div 
                  key={index}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-700">{alert.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  <div className="mt-2">
                    <strong>Helpline Numbers:</strong>
                    <ul className="list-disc list-inside">
                      <li>Emergency: 911</li>
                      <li>National Crisis Line: 1-800-273-8255</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No crisis alerts detected.</p>
          )}
        </div>

        {/* Data Pipeline Diagram */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Data Pipeline Overview</h2>
          <div className="flex justify-center">
            {/* Add a simple diagram or description of your data pipeline */}
            <div className="text-center text-gray-600">
              Game Data → Analysis Engine → Mood Insights → Crisis Detection
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard