import './index.css'
import Library from './components/Library';

function App() {

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
    },
    {
      id: 4,
      title: 'A Volta dos que Não Foram',
      imageUrl: 'https://image.tmdb.org/t/p/w500/uxy2VfT0qY14d1XJg4c0Y1mY8jU.jpg',
      rating: 100.0,
    },
    {
      id: 4,
      title: 'A Volta dos que Não Foram',
      imageUrl: 'https://image.tmdb.org/t/p/w500/uxy2VfT0qY14d1XJg4c0Y1mY8jU.jpg',
      rating: 100.0,
    },
    {
      id: 4,
      title: 'A Volta dos que Não Foram',
      imageUrl: 'https://image.tmdb.org/t/p/w500/uxy2VfT0qY14d1XJg4c0Y1mY8jU.jpg',
      rating: 100.0,
    },
    {
      id: 4,
      title: 'A Volta dos que Não Foram',
      imageUrl: 'https://image.tmdb.org/t/p/w500/uxy2VfT0qY14d1XJg4c0Y1mY8jU.jpg',
      rating: 100.0,
    },
  ];
  
  return (
    <Library
      movies={movies}
    />
  )
}

export default App
