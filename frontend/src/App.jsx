import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import GameZone from './components/GameZone'
import AICompanion from './components/AICompanion'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<GameZone />} />
          <Route path="/ai-companion" element={<AICompanion />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App