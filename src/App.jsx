import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main id="center">
      <div className="ticks"></div> 
      
      <section className="hero">
        <h1 style={{ 
          fontSize: '4rem', 
          color: 'var(--accent)', 
          textShadow: '3px 3px var(--accent-border)' 
        }}>
          SYNC_ESTABLISHED
        </h1>
        <p style={{ color: 'white', letterSpacing: '5px' }}>
          USER: [YOUR_NAME_HERE]
        </p>
      </section>

      <div className="counter" onClick={() => setCount((c) => c + 1)}>
        NEURAL_LINK_STABILITY: {count}%
      </div>

      <div id="next-steps">
        <div id="docs">
          <h3>{">"} STATS</h3>
          <ul>
            <li><a href="#">SKILLS</a></li>
            <li><a href="#">EXPERIENCE</a></li>
          </ul>
        </div>
        <div>
          <h3>{">"} MISSION_LOG</h3>
          <p style={{ color: 'white' }}>Current Objective: Secure Senior Dev Role</p>
        </div>
      </div>
    </main>
  )
}

export default App