import { useState, useEffect } from 'react';
// We are re-using the logo you uploaded previously
import cyberpunkLogo from './assets/logo.png'; 

// NETRUNNER CONFIGURATION HUB
// How long the logo sequence runs total (glitch in, hold, glitch out).
// Must match the CSS duration (2.4s = 2400ms).
const LOGO_DURATION_MS = 2400;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  // We've simplified the phase management: 
  // 'loading' (0-100%) or 'processing' (the finite logo sequence)
  const [phase, setPhase] = useState('loading'); 

  // --- TIMER 1: THE COUNTER ---
  useEffect(() => {
    // If the counter is complete or canceled, do nothing
    if (phase !== 'loading') return; 

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setPhase('processing'); // NEW: Triggers the sequence!
          return 100;
        }
        return oldProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [phase]);

  // --- TIMER 2: THE SECURE HANDSHAKE COMPLETION ---
  // This timer triggers ONCE, based on LOGO_DURATION_MS,
  // to finalize the fade transition after the glitch sequence completes.
  useEffect(() => {
    if (phase === 'processing') {
      const completionTimer = setTimeout(() => {
        setPhase('complete'); // Triggers the final fade
      }, LOGO_DURATION_MS);

      // Cleanup if component unmounts before sequence finishes
      return () => clearTimeout(completionTimer);
    }
  }, [phase]);

  // --- THE LOGIC (Messages unchanged) ---
  let loadingMessage = "";
  if (progress < 25) loadingMessage = "INITIALIZING KIROSHI OPTICS...";
  else if (progress < 50) loadingMessage = "LOADING SKILLS DATASHARD...";
  else if (progress < 75) loadingMessage = "CONNECTING TO SANDEVISTAN...";
  else if (progress < 100) loadingMessage = "BYPASSING ICE BLACKWALL...";
  else loadingMessage = "SYNC_ESTABLISHED";

  // --- THE UI ---
  return (
    // Only fade the entire screen when the sequence is fully 'complete'
    <div className={phase === 'complete' ? 'fade-out' : ''} style={{
      height: '100vh', width: '100vw', backgroundColor: 'black', color: 'var(--accent)', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* PHASE 1: LOADING TEXT */}
      {phase === 'loading' && (
        <>
          <h1>SYSTEM_BOOT: {progress}%</h1>
          <h2 style={{ color: 'white', marginTop: '20px' }}>{">"} {loadingMessage}</h2>
        </>
      )}

      {/* PHASE 2: PROCESSING LOGO (Finite handshake sequence) */}
      {(phase === 'processing' || phase === 'complete') && (
        <img src={cyberpunkLogo} alt="Cyberpunk" className="logo-secure-handshake" />
      )}

    </div>
  );
}