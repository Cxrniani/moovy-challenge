import React, { useState } from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: string; 
  title: string;
  imageUrl: string; 
  rating: number; 
}

interface SearchProps {
  movies: Movie[];
}

function SearchMovie({ movies }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-10">
      <div className="px-40 flex-col h-screen">
        <h1 className="text-2xl text-stone-800 mb-6">Search Movies</h1>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 md:grid-cols-4 mt-6">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  imageUrl={movie.imageUrl}
                  title={movie.title}
                  rating={movie.rating}
                />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-64 w-full" style={{ gridColumn: '1 / -1' }}>
                <p className="text-stone-600 text-lg text-center">No movies found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMovie;