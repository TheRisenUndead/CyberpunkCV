import { useState, useEffect } from 'react';
import cyberpunkLogo from './assets/logo.png'; 
import glitchSound from './assets/glitch_effect.mp3';

const LOGO_DURATION_MS = 2000;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); 

  // --- NEW: THE PRELOADER ---
  // This runs instantly in the background so the files are ready at 100%
  useEffect(() => {
    // Force browser to cache the image
    const imgPreload = new Image();
    imgPreload.src = cyberpunkLogo;

    // Force browser to cache the audio
    const audioPreload = new Audio();
    audioPreload.src = glitchSound;
    audioPreload.load(); 
  }, []);

  // --- TIMER 1: THE COUNTER ---
  useEffect(() => {
    if (phase !== 'loading') return; 

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setPhase('processing');
          return 100;
        }
        return oldProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [phase]);

  // --- TIMER 2: HANDSHAKE & AUDIO TRIGGER ---
  useEffect(() => {
    if (phase === 'processing') {
      
      // Because we preloaded it, this will now play instantly
      const audio = new Audio(glitchSound);
      audio.play().catch(err => console.log("Browser blocked autoplay:", err));

      const completionTimer = setTimeout(() => {
        setPhase('complete');
      }, LOGO_DURATION_MS);

      return () => clearTimeout(completionTimer);
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
    <div className={phase === 'complete' ? 'fade-out' : ''} style={{
      height: '100vh', width: '100vw', backgroundColor: 'black', color: 'var(--accent)', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {phase === 'loading' && (
        <>
          <h1>SYSTEM_BOOT: {progress}%</h1>
          <h2 style={{ color: 'white', marginTop: '20px' }}>{">"} {loadingMessage}</h2>
        </>
      )}

      {/* Processing Logo */}
      {(phase === 'processing' || phase === 'complete') && (
        <img src={cyberpunkLogo} alt="Cyberpunk" className="logo-secure-handshake" />
      )}

    </div>
  );
}