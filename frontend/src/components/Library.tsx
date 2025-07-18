import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
}

interface LibraryProps {
  movies: Movie[];
  onRemoveMovie: (movieId: string) => void;
}

function Library({ movies, onRemoveMovie }: LibraryProps) {
  return (
    <div className="pt-10">
      <div className="px-40 flex-col h-screen">
        <h1 className="text-3xl font-medium text-stone-800">My Library</h1>
        <div className='flex justify-center items-center'>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 md:grid-cols-4 mt-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.imageUrl}
                  title={movie.title}
                  rating={movie.rating}
                  onAdd={() => { }}
                  onRemove={() => onRemoveMovie(movie.id)}
                  isAdded={true}
                />
              ))
            ) : (
                
              <p className="text-stone-600 text-lg col-span-full flex items-center h-64 w-full">Sua biblioteca está vazia. Adicione filmes pela página de busca!</p>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library