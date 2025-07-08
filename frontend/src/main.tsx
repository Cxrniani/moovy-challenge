import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import NavBar from './components/NavBar.tsx'
import Library from './components/Library.tsx';
import SearchMovie from './components/SearchMovie.tsx';

const movies = [
  {
    id: 1,
    title: 'Duna: Parte Dois',
    imageUrl: 'https://image.tmdb.org/t/p/w500/A0K03oB41wOq6t8rO4D620d4fR3.jpg',
    rating: 8.5,
  },
  {
    id: 2,
    title: 'Oppenheimer',
    imageUrl: 'https://image.tmdb.org/t/p/w500/fm6KqXz3M2M1k3Cdz5wR9eJz1mQ.jpg',
    rating: 8.3,
  },
  {
    id: 3,
    title: 'Interestelar',
    imageUrl: 'https://image.tmdb.org/t/p/w500/uxy2VfT0qY14d1XJg4c0Y1mY8jU.jpg',
    rating: 8.6,
  }, {
    id: 4,
    title: 'A Volta dos que Não Foram',
    imageUrl: 'https://image.tmdb.org/t/p/w500/uxy2VfT0qY14d1XJg4c0Y1mY8jU.jpg',
    rating: 100.0,
  }
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/movies" element={<SearchMovie movies={movies} />} /> 
        <Route path="/my-library" element={<Library movies={movies} />} /> 
      </Routes>
    </Router>
  </StrictMode>
)
