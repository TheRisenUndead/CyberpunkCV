import { useState, useEffect, useRef } from 'react';
import CyberButton from './CyberButton';
import Profile from './Profile'; // <-- Imported the new Profile component!

const TOTAL_SONGS = 30; 

export default function MainMenu({ isActive, onVideoReady }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [recentSongs, setRecentSongs] = useState([]);
  const audioRef = useRef(null);
  
  // NEW STATE: Tracks which screen we are currently looking at ('hub' or 'profile')
  const [activeView, setActiveView] = useState('hub');

  const pickNextSong = () => {
    let nextSong;
    let attempts = 0;
    do {
      nextSong = Math.floor(Math.random() * TOTAL_SONGS) + 1;
      attempts++;
    } while (recentSongs.includes(nextSong) && attempts < 50);

    setRecentSongs(prev => [nextSong, ...prev].slice(0, 2));
    setCurrentSong(nextSong);
  };

  useEffect(() => {
    pickNextSong();
  }, []);

  useEffect(() => {
    // Only play audio if the Main Menu is actually visible!
    // Music will keep playing even when you swap to the Profile page because the menu is still "active"
    if (isActive && audioRef.current && currentSong) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(e => console.log("Audio block:", e));
    }
  }, [isActive, currentSong]);

  const getFileExtension = (songNum) => {
    if (songNum === 15) return 'opus';
    return 'm4a';
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      
      {/* 1. BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={() => onVideoReady()} // The signal to the loading screen!
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: -1,
          filter: 'brightness(0.3) sepia(0.2) hue-rotate(-20deg)'
        }}
      >
        <source src="/menubackground.mp4" type="video/mp4" />
      </video>

      {/* 2. AUDIO PLAYER */}
      {currentSong && (
        <audio
          ref={audioRef}
          src={`/MenuSongs/${currentSong}.${getFileExtension(currentSong)}`}
          onEnded={pickNextSong} 
        />
      )}

      {/* 3. OCCASIONAL GLITCH NAME (Top Right - Stays visible on all pages) */}
      <div className="glitch-name" data-text="SENITH SUMANASIRI CV">
        SENITH SUMANASIRI CV
      </div>

      {/* 4. MASTER UI ROUTER CONTAINER */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: '50px', boxSizing: 'border-box' }}>
        
        {/* VIEW A: THE MAIN HUB */}
        {activeView === 'hub' && (
          <div className="fade-in" style={{ height: '100%', color: 'var(--accent)', fontFamily: 'Orbitron, sans-serif' }}>
            <h1 style={{ fontSize: '4rem', textShadow: '2px 2px black', margin: '0' }}>MAIN_HUB</h1>
            <p style={{ fontSize: '1.5rem', color: 'white', marginTop: '10px' }}>Welcome to the Afterlife.</p>
            
            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Wiring the PROFILE button to trigger the state change */}
              <CyberButton text="PROFILE" onClick={() => setActiveView('profile')} />
              <CyberButton text="EDUCATION" onClick={() => console.log("Education clicked")} />
              <CyberButton text="SKILLS" onClick={() => console.log("Skills clicked")} />
              <CyberButton text="PROJECTS" onClick={() => console.log("Projects clicked")} />
              <CyberButton text="ACHIEVEMENTS" onClick={() => console.log("Achievements clicked")} />
              <CyberButton text="PORTFOLIO" onClick={() => console.log("Portfolio clicked")} />
            </div>

            <div style={{ position: 'absolute', bottom: '50px', padding: '10px', border: '1px solid var(--accent)', display: 'inline-block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <p style={{ margin: 0, fontSize: '0.8rem' }}>
                [ RADIO STATUS: ONLINE ] - TRACK_{currentSong}.{getFileExtension(currentSong)}
              </p>
            </div>
          </div>
        )}

        {/* VIEW B: THE PROFILE PAGE */}
        {activeView === 'profile' && (
          /* Passes the reset function down so the [X] CLOSE button works */
          <Profile onBack={() => setActiveView('hub')} />
        )}

      </div>
    </div>
  );
}