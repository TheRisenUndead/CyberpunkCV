import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main id="center">
  <div className="ticks"></div> {/* That top border line from your CSS */}
  
  <section className="hero">
    <h1 style={{ fontSize: '4rem', color: 'var(--accent)', textShadow: '3px 3px var(--accent-border)' }}>
      SYNC_ESTABLISHED
    </h1>
    <p style={{ color: 'white', letterSpacing: '5px' }}>USER: [YOUR_NAME_HERE]</p>
  </section>

  <div className="counter">
    LOG_OUT_NEURAL_LINK
  </div>

  <div id="next-steps">
    <div id="docs">
      <h3>> STATS</h3>
      <ul>
        <li><a href="#">SKILLS</a></li>
        <li><a href="#">EXPERIENCE</a></li>
      </ul>
    </div>
    <div>
      <h3>> MISSION_LOG</h3>
      <p>Current Objective: Secure Senior Dev Role</p>
    </div>
  </div>
</main>
  )
}

export default App
