import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar.tsx';
import Library from './components/Library.tsx';
import Search from './components/SearchMovie.tsx';


interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  rating: number; 
}

function Main() {
  const [userLibrary, setUserLibrary] = useState<Movie[]>([]);

  const addMovieToLibrary = (movieToAdd: Movie) => {
    setUserLibrary((prevLibrary) => {
      if (!prevLibrary.some(movie => movie.id === movieToAdd.id)) {
        return [...prevLibrary, movieToAdd];
      }
      return prevLibrary;
    });
  };

  return (
    <StrictMode>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Search userLibrary={userLibrary} onAddMovie={addMovieToLibrary} />} />
          <Route
            path="/movies"
            element={<Search userLibrary={userLibrary} onAddMovie={addMovieToLibrary} />}
          />
          <Route path="/my-library" element={<Library movies={userLibrary} />} />
        </Routes>
      </Router>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);