// 1. IMPORT THE SOUND EFFECT
import clickSound from './assets/buttonsoundeffect.mp3';

export default function CyberButton({ text, onClick }) {
  
  // 2. THE NEW MASTER CLICK HANDLER
  const handleInteraction = (e) => {
    // Phase A: Fire the sound effect
    const audio = new Audio(clickSound);
    audio.volume = 0.3; 
    audio.play().catch(err => console.log("Browser blocked UI audio:", err));

    // Phase B: Execute whatever the button is supposed to do (like loading the Profile)
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className="cyber-btn-wrapper" 
      onClick={handleInteraction} /* 3. BOTH ACTIONS FIRED HERE */
    >
      
      {/* The trailing lines */}
      <div className="cyber-btn-lines"></div>
      
      {/* The main button */}
      <button className="cyber-btn">
        {text}
      </button>

    </div>
  );
}