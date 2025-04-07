import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/Movies';

interface CarouselRowProps {
  title: string;
  movies: Movie[];
}

const CarouselRow: React.FC<CarouselRowProps> = ({ title, movies }) => {
  return (
    <div className="mb-4">
      <h2 className="text-white ms-3">{title}</h2>
      <div className="d-flex overflow-auto py-2">
        {movies.map((movie) => (
          <MovieCard key={movie.show_id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default CarouselRow;
