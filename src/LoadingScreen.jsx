import { useState, useEffect } from 'react';
import cyberpunkLogo from './assets/logo.png'; 
import glitchSound from './assets/glitch_effect.mp3';

const LOGO_DURATION_MS = 2000;

export default function LoadingScreen({ onComplete, videoLoaded }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('standby'); 

  useEffect(() => {
    const imgPreload = new Image(); imgPreload.src = cyberpunkLogo;
    const audioPreload = new Audio(); audioPreload.src = glitchSound; audioPreload.load(); 
  }, []);

  // --- THE SMART TIMER ---
  useEffect(() => {
    if (phase !== 'loading') return; 

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // NEW LOGIC: If we hit 99 but the video is still downloading, hold at 99!
        if (oldProgress === 99 && !videoLoaded) {
          return 99; 
        }

        if (oldProgress >= 100) {
          clearInterval(timer);
          setPhase('processing');
          return 100;
        }
        return oldProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [phase, videoLoaded]);

  useEffect(() => {
    if (phase === 'processing') {
      const audio = new Audio(glitchSound);
      audio.volume = 0.5;
      audio.play().catch(err => console.log("Autoplay blocked:", err));

      const completionTimer = setTimeout(() => {
        setPhase('complete');
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1500); 
      }, LOGO_DURATION_MS);

      return () => clearTimeout(completionTimer);
    }
  }, [phase, onComplete]);

  let loadingMessage = "";
  if (progress < 25) loadingMessage = "STARTING UP NEURAL LINK...";
  else if (progress < 50) loadingMessage = "LOADING JOHNNY SILVERHAND...";
  else if (progress < 75) loadingMessage = "CONNECTING TO SANDEVISTAN...";
  else if (progress < 99) loadingMessage = "REMOVING ALL FORMS OF CYBERPSYCHOSIS...";
  // If we are stuck at 99 waiting for the video, tell the user!
  else if (progress === 99 && !videoLoaded) loadingMessage = "DECRYPTING HEAVY VIDEO ASSETS...";
  else loadingMessage = "SYNC_ESTABLISHED";

  return (
    <div className={phase === 'complete' ? 'fade-out' : ''} style={{
      height: '100vh', width: '100vw', backgroundColor: 'black', color: 'var(--accent)', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {phase === 'standby' && (
        <button 
          onClick={() => setPhase('loading')}
          style={{
            background: 'transparent', color: 'var(--accent)', border: '2px solid var(--accent)',
            padding: '15px 30px', fontSize: '1.5rem', fontFamily: 'Orbitron, sans-serif',
            cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px', transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.target.style.background = 'var(--accent)'; e.target.style.color = 'black'; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)'; }}
        >
          [ INITIATE NEURAL LINK ]
        </button>
      )}

      {phase === 'loading' && (
        <>
          <h1>SYSTEM_BOOT: {progress}%</h1>
          <h2 style={{ 
            color: 'white', marginTop: '20px', 
            // Add a pulse effect if we are stuck at 99%
            animation: progress === 99 && !videoLoaded ? 'pulse 1.5s infinite' : 'none' 
          }}>
            {">"} {loadingMessage}
          </h2>
        </>
      )}

      {(phase === 'processing' || phase === 'complete') && (
        <img src={cyberpunkLogo} alt="Cyberpunk" className="logo-secure-handshake" />
      )}
    </div>
  );
}