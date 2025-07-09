import { StrictMode, useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/movies');
        if (!response.ok) {
          throw new Error('Falha ao buscar filmes do backend.');
        }
        const data = await response.json();
        setUserLibrary(data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };
    fetchMovies();
  }, []);

  const addMovieToLibrary = async (movieToAdd: Movie) => {
    try {
      const response = await fetch('/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieToAdd),
      });
      if (!response.ok) {
        if (response.status === 409) {
          console.warn('Filme já existe na sua Library.');
        } else {
          throw new Error('Erro ao adicionar filme à Library.');
        }
      } else {
        const addedMovie = await response.json();
        setUserLibrary((prevLibrary) => {
          if (!prevLibrary.some(movie => movie.id === addedMovie.id)) {
            return [...prevLibrary, addedMovie];
          }
          return prevLibrary;
        });
      }
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
    }
  }

  const removeMovieFromLibrary = async (movieId: string) => {
    try {
      const response = await fetch(`/movies/${movieId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao remover filme da Library.');
      }

      setUserLibrary((prevLibrary) =>
        prevLibrary.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      console.error('Erro removendo filme da Library:', error);
    }
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
          <Route path="/my-library" element={<Library movies={userLibrary}
          onRemoveMovie={removeMovieFromLibrary} />} />
        </Routes>
      </Router>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);