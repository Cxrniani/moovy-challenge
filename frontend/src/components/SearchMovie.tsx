// frontend/src/components/Search.tsx
import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';

interface Movie {
    id: string;
    title: string;
    imageUrl: string;
    rating: number;
}

interface SearchProps {
    userLibrary: Movie[];
    onAddMovie: (movie: Movie) => void;
}

function Search({ userLibrary, onAddMovie }: SearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (searchTerm.trim() === '') {
            setSearchedMovies([]);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);



        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${OMDB_API_KEY}&type=movie`
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.Response === 'True' && data.Search) {
                    const fetchedMovies: Movie[] = await Promise.all(
                        data.Search.map(async (omdbMovie: any) => {
                            let ratingValue = 0;
                            try {
                                const detailResponse = await fetch(
                                    `https://www.omdbapi.com/?i=${omdbMovie.imdbID}&apikey=${OMDB_API_KEY}`
                                );
                                const detailData = await detailResponse.json();
                                if (detailData.Response === 'True' && detailData.imdbRating && detailData.imdbRating !== 'N/A') {
                                    ratingValue = parseFloat(detailData.imdbRating);
                                }
                            } catch (detailError) {
                                console.error("Failed to fetch movie details:", detailError);
                            }

                            return {
                                id: omdbMovie.imdbID,
                                title: omdbMovie.Title,
                                imageUrl: omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : 'https://via.placeholder.com/200x300?text=No+Image',
                                rating: ratingValue,
                            };
                        })
                    );
                    setSearchedMovies(fetchedMovies);
                } else {
                    setSearchedMovies([]);
                    if (data.Error) {
                        setError(data.Error);
                    } else {
                        setError('No movies found.');
                    }
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch movies. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 500);
    }, [searchTerm, OMDB_API_KEY]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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
                        {loading && (
                            <div className="col-span-full flex justify-center items-center h-64 w-full" style={{ gridColumn: '1 / -1' }}>
                                <p className="text-stone-600 text-lg text-center">Loading movies...</p>
                            </div>
                        )}

                        {error && !loading && (
                            <div className="col-span-full flex justify-center items-center h-64 w-full" style={{ gridColumn: '1 / -1' }}>
                                <p className="text-red-500 text-lg text-center">Error: {error}</p>
                            </div>
                        )}

                        {!loading && !error && searchedMovies.length > 0 ? (
                            searchedMovies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    imageUrl={movie.imageUrl}
                                    title={movie.title}
                                    rating={movie.rating}
                                    onAdd={() => onAddMovie(movie)}
                                    isAdded={userLibrary.some(libMovie => libMovie.id === movie.id)}
                                />
                            ))
                        ) : (!loading && !error && searchTerm.trim() !== '' && (
                            <div className="col-span-full flex justify-center items-center h-64 w-full" style={{ gridColumn: '1 / -1' }}>
                                <p className="text-stone-600 text-lg text-center">No movies found matching your search. Try a different title.</p>
                            </div>
                        ))}
                        {!loading && !error && searchTerm.trim() === '' && (
                            <div className="col-span-full flex justify-center items-center h-64 w-full" style={{ gridColumn: '1 / -1' }}>
                                <p className="text-stone-600 text-lg text-center">Start typing to search for movies.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;