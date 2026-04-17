import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  // 1. Set up our "Memory". We start at 0.
  const [progress, setProgress] = useState(0);

  // 2. Set up our "Time". This runs once when the screen loads.
  useEffect(() => {
    // Create a timer that ticks every 50ms
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // If we hit 100, stop the timer!
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Otherwise, add 1
        return oldProgress + 1;
      });
    }, 50);

    // This is cleanup: if the component is destroyed, kill the timer.
    return () => clearInterval(timer);
  }, []); // The empty brackets mean "only run this setup once"

  // 3. What we actually see on screen
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: 'black',
      color: 'var(--accent)', // Using our yellow from index.css
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Orbitron, sans-serif'
    }}>
      <h1>SYSTEM_BOOT: {progress}%</h1>
    </div>
  );
}