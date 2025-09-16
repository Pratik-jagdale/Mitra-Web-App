import { useState, useEffect, useRef } from 'react'

const AICompanion = () => {
  const [messages, setMessages] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data)
      }
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', audioBlob)
        
        try {
          const response = await fetch('/api/chat_ai', {
            method: 'POST',
            body: formData
          })
          
          const { text, audio } = await response.json()
          
          setMessages(prev => [...prev, 
            { type: 'user', content: text },
            { type: 'ai', content: text, audio }
          ])
          
          // Play the AI response
          const audioUrl = `data:audio/mp3;base64,${audio}`
          const audioElement = new Audio(audioUrl)
          audioElement.play()
        } catch (error) {
          console.error('Error sending audio:', error)
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={\`px-4 py-2 \${activeTab === 'chat' ? 'border-b-2 border-primary' : ''}\`}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
          <button
            className={\`px-4 py-2 \${activeTab === 'journal' ? 'border-b-2 border-primary' : ''}\`}
            onClick={() => setActiveTab('journal')}
          >
            Journal
          </button>
          <button
            className={\`px-4 py-2 \${activeTab === 'analytics' ? 'border-b-2 border-primary' : ''}\`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {/* Chat Interface */}
        {activeTab === 'chat' && (
          <div className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-white ml-auto' 
                      : 'bg-gray-100 mr-auto'
                  } max-w-[80%]`}
                >
                  {message.content}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <button
                className={`btn-primary w-full ${isRecording ? 'bg-red-500' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>
          </div>
        )}

        {/* Journal Tab */}
        {activeTab === 'journal' && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">My Journal</h2>
            {/* Journal implementation */}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">My Progress</h2>
            {/* Analytics implementation */}
          </div>
        )}
      </div>
    </div>
  )
}

export default AICompanion