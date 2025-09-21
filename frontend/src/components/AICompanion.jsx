import { useState, useEffect, useRef } from 'react'

const AICompanion = () => {
  const [messages, setMessages] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioPlayerRef = useRef(null)

  useEffect(() => {
    // Initialize audio player
    audioPlayerRef.current = new Audio()
    audioPlayerRef.current.onended = () => {
      setCurrentlyPlaying(null)
    }
    
    return () => {
      // Clean up audio resources
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause()
        audioPlayerRef.current = null
      }
      
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data)
      }
      
      mediaRecorderRef.current.onstop = async () => {
        setIsProcessing(true)
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', audioBlob)
        
        try {
          const response = await fetch('/api/chat_ai', {
            method: 'POST',
            body: formData
          })
          
          const { audio } = await response.json()
          
          // Create audio URL from response
          const audioUrl = `data:audio/mp3;base64,${audio}`
          
          // Add visual feedback for the conversation
          const newMessageId = Date.now().toString()
          setMessages(prev => [...prev, 
            { id: `user-${newMessageId}`, type: 'user', timestamp: new Date().toISOString() },
            { id: `ai-${newMessageId}`, type: 'ai', timestamp: new Date().toISOString(), audio: audioUrl }
          ])
          
          // Play audio response automatically
          audioPlayerRef.current.src = audioUrl
          audioPlayerRef.current.play()
          setCurrentlyPlaying(`ai-${newMessageId}`)
          setIsProcessing(false)
        } catch (error) {
          console.error('Error sending audio:', error)
          setIsProcessing(false)
        }
        
        audioChunksRef.current = []
      }
      
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playAudio = (audioUrl, id) => {
    if (currentlyPlaying === id) {
      audioPlayerRef.current.pause()
      setCurrentlyPlaying(null)
    } else {
      if (currentlyPlaying) {
        audioPlayerRef.current.pause()
      }
      audioPlayerRef.current.src = audioUrl
      audioPlayerRef.current.play()
      setCurrentlyPlaying(id)
    }
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-800 dark:text-primary-100 text-center">
            Voice Companion
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-1 text-sm sm:text-base">
            Talk to your culturally-aware AI assistant
          </p>
        </div>

        {/* Voice Companion Interface */}
        <div className="h-[70vh] sm:h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Start a conversation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm text-sm sm:text-base">
                  Press and hold the microphone button to start talking
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-4">
                  Your assistant understands Hinglish (Hindi, Marathi, and English)
                </p>
              </div>
            )}
            
            <div className="space-y-4 sm:space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`flex items-center space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%] ${
                      message.type === 'user' 
                        ? 'bg-secondary-100 dark:bg-secondary-800 rounded-l-xl rounded-br-xl' 
                        : 'bg-white dark:bg-primary-700 rounded-r-xl rounded-bl-xl'
                    } p-3 sm:p-4 shadow-sm`}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                      {message.type === 'user' ? (
                        <div className="bg-secondary-200 dark:bg-secondary-700 w-full h-full rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-600 dark:text-secondary-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="bg-primary-200 dark:bg-primary-600 w-full h-full rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 dark:text-primary-200" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {formatTime(message.timestamp)}
                      </div>
                      
                      {message.type === 'user' ? (
                        <div className="text-sm text-gray-800 dark:text-gray-100">
                          You spoke
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => playAudio(message.audio, message.id)}
                            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${
                              currentlyPlaying === message.id 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-primary-100 dark:bg-primary-600 text-primary-600 dark:text-primary-100'
                            } transition-colors`}
                            aria-label={currentlyPlaying === message.id ? "Pause" : "Play"}
                          >
                            {currentlyPlaying === message.id ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-100">
                            AI response
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recording Button */}
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 sm:p-6 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent">
              <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                disabled={isProcessing}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform ${
                  isRecording 
                    ? 'bg-red-500 scale-110 ring-4 ring-red-300 dark:ring-red-700' 
                    : isProcessing 
                      ? 'bg-yellow-500 animate-pulse' 
                      : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                }`}
                aria-label={isRecording ? "Release to send" : isProcessing ? "Processing" : "Press and hold to speak"}
              >
                {isRecording ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                  </svg>
                ) : isProcessing ? (
                  <svg className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
              <div className="absolute -bottom-4 sm:-bottom-6 left-0 right-0 text-center text-xs text-gray-600 dark:text-gray-400 px-4">
                {isRecording ? 'Release to send' : isProcessing ? 'Processing...' : 'Press and hold to speak'}
              </div>
            </div>
          </div>
          
          {/* Cultural Context Indicator */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
            <div className="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                
                Culturally aware for Pune, India | Supports Hinglish
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AICompanion