import React, { useState } from 'react'
import LinkForm from './components/LinkForm'
import LinkList from './components/LinkList'

const App: React.FC = () => {
  const [lastCode, setLastCode] = useState<string>('')
  const [refreshCounter, setRefreshCounter] = useState(0)

  const handleCreated = (code: string) => {
    setLastCode(code)
    setRefreshCounter(count => count + 1)
  }

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[1000px] h-[750px] shadow-xl p-8 flex flex-col space-y-6">
        <header className="flex items-center space-x-2 mb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">url_shortener</h1>
        </header>

        <LinkForm onCreated={handleCreated} />

        {lastCode && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <span className="block text-gray-700">Your code:</span>
            <a
              className="mt-1 inline-block font-mono text-blue-600 hover:underline"
              href={`${import.meta.env.VITE_API_URL}/${lastCode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lastCode}
            </a>
          </div>
        )}

        <hr className="border-gray-200" />

        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <LinkList refreshCounter={refreshCounter} />
        </div>
      </div>
    </div>
  )
}

export default App
