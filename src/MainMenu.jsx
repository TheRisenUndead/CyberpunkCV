import { useState, useEffect, useRef } from 'react';

const TOTAL_SONGS = 30; 

export default function MainMenu() {
  const [currentSong, setCurrentSong] = useState(null);
  const [recentSongs, setRecentSongs] = useState([]);
  const audioRef = useRef(null);

  // --- THE SMART RANDOMIZER ALGORITHM ---
  const pickNextSong = () => {
    let nextSong;
    let attempts = 0;
    
    do {
      nextSong = Math.floor(Math.random() * TOTAL_SONGS) + 1;
      attempts++;
    } while (recentSongs.includes(nextSong) && attempts < 50);

    setRecentSongs(prev => {
      const newMemory = [nextSong, ...prev];
      return newMemory.slice(0, 2); 
    });

    setCurrentSong(nextSong);
  };

  useEffect(() => {
    pickNextSong();
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(e => console.log("Audio block:", e));
    }
  }, [currentSong]);

  // --- NEW: EXTENSION ROUTER ---
  // If the song is 15, use .opus. Otherwise, default to .m4a
  const getFileExtension = (songNum) => {
    if (songNum === 15) return 'opus';
    return 'm4a';
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* 1. THE VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: -1,
          filter: 'brightness(0.3) sepia(0.2) hue-rotate(-20deg)'
        }}
      >
        <source src="/menubackground.mp4" type="video/mp4" />
      </video>

      {/* 2. THE HIDDEN AUDIO PLAYER */}
      {currentSong && (
        <audio
          ref={audioRef}
          // Here we dynamically inject the correct extension based on the song number!
          src={`/MenuSongs/${currentSong}.${getFileExtension(currentSong)}`}
          onEnded={pickNextSong} 
        />
      )}

      {/* 3. THE MENU UI */}
      <div style={{ padding: '50px', color: 'var(--accent)', fontFamily: 'Orbitron, sans-serif' }}>
        <h1 style={{ fontSize: '4rem', textShadow: '2px 2px black' }}>MAIN_HUB</h1>
        <p style={{ fontSize: '1.5rem', color: 'white' }}>Welcome to the Afterlife.</p>
        
        <div style={{ marginTop: '30px', padding: '10px', border: '1px solid var(--accent)', display: 'inline-block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <p style={{ margin: 0, fontSize: '0.8rem' }}>
            [ RADIO STATUS: ONLINE ] - TRACK_{currentSong}.{getFileExtension(currentSong)}
          </p>
        </div>
      </div>

    </div>
  );
}