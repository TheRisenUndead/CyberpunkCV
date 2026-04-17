import { useState, useEffect } from 'react';
import cyberpunkLogo from './assets/logo.png'; 
import glitchSound from './assets/glitch_effect.mp3';

const LOGO_DURATION_MS = 2000;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  // NEW: We start in 'standby' mode, waiting for user input
  const [phase, setPhase] = useState('standby'); 

  // --- PRELOADER (Keeps assets ready) ---
  useEffect(() => {
    const imgPreload = new Image();
    imgPreload.src = cyberpunkLogo;
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
      
      // Because the user clicked the start button, this will now play!
      const audio = new Audio(glitchSound);
      audio.volume = 0.5; // Sets volume to 50% so we don't blow out recruiters' ears
      audio.play().catch(err => console.log("Autoplay blocked:", err));

      const completionTimer = setTimeout(() => {
        setPhase('complete');
      }, LOGO_DURATION_MS);

      return () => clearTimeout(completionTimer);
    }
  }, [phase]);

  let loadingMessage = "";
  if (progress < 25) loadingMessage = "STARTING UP NEURAL LINK...";
  else if (progress < 50) loadingMessage = "LOADING JOHNNY SILVERHAND...";
  else if (progress < 75) loadingMessage = "CONNECTING TO SANDEVISTAN...";
  else if (progress < 100) loadingMessage = "REMOVING ALL FORMS OF CYBERPSYCHOSIS...";
  else loadingMessage = "SYNC_ESTABLISHED";

  return (
    <div className={phase === 'complete' ? 'fade-out' : ''} style={{
      height: '100vh', width: '100vw', backgroundColor: 'black', color: 'var(--accent)', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* NEW: THE INITIATE BUTTON */}
      {phase === 'standby' && (
        <button 
          onClick={() => setPhase('loading')}
          style={{
            background: 'transparent',
            color: 'var(--accent)',
            border: '2px solid var(--accent)',
            padding: '15px 30px',
            fontSize: '1.5rem',
            fontFamily: 'Orbitron, sans-serif',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transition: 'all 0.3s ease'
          }}
          // Adds a cool hover effect
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--accent)';
            e.target.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--accent)';
          }}
        >
          [ INITIATE NEURAL LINK ]
        </button>
      )}

      {/* PHASE 1: LOADING TEXT */}
      {phase === 'loading' && (
        <>
          <h1>SYSTEM_BOOT: {progress}%</h1>
          <h2 style={{ color: 'white', marginTop: '20px' }}>{">"} {loadingMessage}</h2>
        </>
      )}

      {/* PHASE 2: PROCESSING LOGO */}
      {(phase === 'processing' || phase === 'complete') && (
        <img src={cyberpunkLogo} alt="Cyberpunk" className="logo-secure-handshake" />
      )}

    </div>
  );
}