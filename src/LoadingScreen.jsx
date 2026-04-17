import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  // 1. The Memory
  const [progress, setProgress] = useState(0);

  // 2. The Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return oldProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // 3. YOUR CUSTOM LOGIC (Must sit outside the return block!)
  let loadingMessage = "";

  if (progress < 25) {
    loadingMessage = "STARTING UP NEURAL LINK...";
  } else if (progress < 50) {
    loadingMessage = "LOADING JOHNNY SILVERHAND...";
  } else if (progress < 75) {
    loadingMessage = "CONNECTING TO SANDEVISTAN...";
  } else if (progress < 100) {
    loadingMessage = "REMOVING ALL FORMS OF CYBERPSYCHOSIS...";
  } else {
    loadingMessage = "SYNC_ESTABLISHED";
  }

  // 4. THE UI
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: 'black',
      color: 'var(--accent)', 
      display: 'flex',
      flexDirection: 'column', // Added this so the text stacks vertically
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Orbitron, sans-serif'
    }}>
        <h1>SYSTEM_BOOT: {progress}%</h1>
        
        {/* We inject your custom message right here */}
        <h2 style={{ color: 'white', marginTop: '20px' }}>
          {">"} {loadingMessage}
        </h2>
    </div>
  );
}