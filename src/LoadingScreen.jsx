import { useState, useEffect } from 'react';
// 1. Tell Vite to grab your image from the assets folder
import cyberpunkLogo from './assets/logo.png'; 

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  // 2. NEW: We create a memory for our "Phase"
  const [phase, setPhase] = useState('loading'); 

  // --- TIMER 1: THE COUNTER ---
  useEffect(() => {
    // If we aren't in the 'loading' phase anymore, don't run the counter
    if (phase !== 'loading') return; 

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setPhase('logo'); // NEW: When we hit 100, trigger Phase 2!
          return 100;
        }
        return oldProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [phase]);

  // --- TIMER 2: THE GLITCH DURATION ---
  // This watches the 'phase'. If it changes to 'logo', it waits 2 seconds, then fades out.
  useEffect(() => {
    if (phase === 'logo') {
      setTimeout(() => {
        setPhase('fade'); // Trigger Phase 3!
      }, 2000); // 2000 milliseconds = 2 seconds of glitching
    }
  }, [phase]);

  // --- THE LOGIC ---
  let loadingMessage = "";
  if (progress < 25) loadingMessage = "STARTING UP NEURAL LINK...";
  else if (progress < 50) loadingMessage = "LOADING JOHNNY SILVERHAND...";
  else if (progress < 75) loadingMessage = "CONNECTING TO SANDEVISTAN...";
  else if (progress < 100) loadingMessage = "REMOVING ALL FORMS OF CYBERPSYCHOSIS...";
  else loadingMessage = "SYNC_ESTABLISHED";

  // --- THE UI ---
  return (
    // If phase is 'fade', we attach our CSS class to fade the whole box out
    <div className={phase === 'fade' ? 'fade-out' : ''} style={{
      height: '100vh', width: '100vw', backgroundColor: 'black', color: 'var(--accent)', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* CONDITIONAL RENDERING: Only show text IF phase is 'loading' */}
      {phase === 'loading' && (
        <>
          <h1>SYSTEM_BOOT: {progress}%</h1>
          <h2 style={{ color: 'white', marginTop: '20px' }}>{">"} {loadingMessage}</h2>
        </>
      )}

      {/* CONDITIONAL RENDERING: Only show the image IF phase is 'logo' or 'fade' */}
      {(phase === 'logo' || phase === 'fade') && (
        <img src={cyberpunkLogo} alt="Cyberpunk" className="cyber-glitch" />
      )}

    </div>
  );
}