/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [backgroundColor, setBackgroundColor] = useState('#000000')
  const [textColor, setTextColor] = useState('#FFFFFF')

  // Format the current time using date-fns
  const formattedTime = format(currentTime, 'HH:mm:ss')
  const formattedDate = format(currentTime, 'EEEE, MMMM do, yyyy')

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      // Generate background color based on current time
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')

      const newBackgroundColor = `#${hours}${minutes}${seconds}`
      setBackgroundColor(newBackgroundColor)

      // Set contrasting text color for better readability
      const rgb = hexToRgb(newBackgroundColor)
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
      setTextColor(brightness > 128 ? '#000000' : '#FFFFFF')
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [])

  // Helper function to convert hex to RGB
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  return (
    <div className="app" style={{ backgroundColor: backgroundColor, color: textColor }}>
      <div className="clock-container">
        <h1 className="clock-header">Dynamic Color Clock</h1>
        <div className="clock-time">{formattedTime}</div>
        <div className="clock-date">{formattedDate}</div>
        <div className="color-info">
          <p>Current Color: {backgroundColor}</p>
        </div>
      </div>
    </div>
  )
}

export default App