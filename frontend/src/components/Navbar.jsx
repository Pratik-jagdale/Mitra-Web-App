import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [aiUnlocked, setAiUnlocked] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handleLogoClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    
    if (newCount === 3) {
      setAiUnlocked(true)
      setClickCount(0)
    }
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/mitra-logo.svg" 
              alt="Mitra Logo" 
              className="h-8 w-8 cursor-pointer"
              onClick={handleLogoClick}
            />
            <span className="ml-2 text-xl font-semibold">
              Mitra App
            </span>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2">
              Game Zone
            </Link>
            {aiUnlocked && (
              <Link to="/ai-companion" className="text-gray-700 hover:text-primary px-3 py-2">
                AI Friend
              </Link>
            )}
            <Link to="/dashboard" className="text-gray-700 hover:text-primary px-3 py-2">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar