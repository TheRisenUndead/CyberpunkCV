import { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import MainMenu from './MainMenu';
import './App.css';

export default function App() {
  const [appState, setAppState] = useState('booting'); 
  const [videoLoaded, setVideoLoaded] = useState(false); // Tracks the heavy MP4

  return (
    <>
      {/* 1. The Boot Sequence */}
      {appState === 'booting' && (
        <LoadingScreen 
          videoLoaded={videoLoaded} 
          onComplete={() => setAppState('menu')} 
        />
      )}

      {/* 2. The Main Menu (Always rendering to load the video, but hidden if booting) */}
      <div style={{ 
        display: appState === 'booting' ? 'none' : 'block',
        height: '100vh', 
        width: '100vw'
      }}>
        <MainMenu 
          isActive={appState === 'menu'} 
          onVideoReady={() => setVideoLoaded(true)} 
        />
      </div>
    </>
  );
}