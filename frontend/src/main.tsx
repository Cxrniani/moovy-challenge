import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NavBar from './components/NavBar.tsx'

createRoot(document.getElementById('root')!).render(
  <div className='bg-stone-200 min-h-screen'>
  <StrictMode>
    <NavBar />
    <App />
  </StrictMode>
  </div>,
)
