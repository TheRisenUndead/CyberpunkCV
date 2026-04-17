import { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import MainMenu from './MainMenu';
import './App.css';

export default function App() {
  // We track the state of the entire website here
  const [appState, setAppState] = useState('booting'); // Starts as 'booting', changes to 'menu'

  return (
    <>
      {/* If we are booting, show the loading screen and wait for the 'onComplete' signal */}
      {appState === 'booting' && (
        <LoadingScreen onComplete={() => setAppState('menu')} />
      )}

      {/* If we get the signal, mount the Main Menu! */}
      {appState === 'menu' && (
        <MainMenu />
      )}
    </>
  );
}