import React from 'react'
import MovieCard from './MovieCard';


function Library({ movies }: { movies: { id: string; title: string; imageUrl: string; rating: number }[] }) {
  return (
        <div className="pt-10">
      <div className="px-40 flex-col h-screen">
        <h1 className="text-2xl text-stone-800">My Library</h1>
        <div className='flex justify-between items-center'>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 md:grid-cols-4 mt-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                imageUrl={movie.imageUrl}
                title={movie.title}
                rating={movie.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library