import { useCallback, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
 
  const passwordGenerator = useCallback(() => {
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    console.log(str)

    if (charsAllowed) str += "!@#$%^&*()-_=+[]{}|;:',.<>?/~"

    for (let i = 1; i < length; i++){
      
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    
    setPassword(pass)
    
    
  }, [length, numberAllowed, charsAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password]) 
  
  useEffect(() => {
    passwordGenerator()

     

  }, [length, numberAllowed, charsAllowed])

  return (
    <div className="text-2xl flex gap-5 flex-col w-full bg-red-600 justify-center items-center h-screen">
      <h1 className="text-5xl">Password Generator</h1>
      <div>
        <input
          className="rounded-lg mr-3 p-2 text-blue-900"
          type="text"
          value={password}
          readOnly
          placeholder="Password"
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 p-2 rounded-lg hover:bg-blue-800"
        >
          Copy
        </button>
      </div>
      <div className="flex gap-3">
        <div className="flex gap-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            id="rg"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="rg">Length: {length}</label>
        </div>
        <div className="flex gap-1">
          <input
            type="checkbox"
            id="num"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />

          <label htmlFor="num">Numbers</label>
        </div>
        <div className="flex gap-1">
          <input
            type="checkbox"
            id="char"
            onChange={() => setCharsAllowed((prev) => !prev)}
          />
          <label htmlFor="char">Chars</label>
        </div>
      </div>
    </div>
  )
}

export default App
