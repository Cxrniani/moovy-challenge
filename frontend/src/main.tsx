import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import NavBar from './components/NavBar.tsx'
import Library from './components/Library.tsx';
import Search from './components/SearchMovie.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/movies" element={<Search movies={movies} />} /> 
        <Route path="/my-library" element={<Library movies={movies} />} /> 
      </Routes>
    </Router>
  </StrictMode>
)
