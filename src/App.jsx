import { useState } from 'react'
import './App.css'
import LoadingScreen from './LoadingScreen';

function App() {
  const [count, setCount] = useState(0)

  return (
  <LoadingScreen />
  )

}

export default App