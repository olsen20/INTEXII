import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../types/Movies";

interface CarouselRowProps {
  title: string;
  movies: Movie[];
  limit?: number; // Optional prop to limit the number of movies displayed
}

const CarouselRow: React.FC<CarouselRowProps> = ({ title, movies, limit }) => {
  // If limit is provided, slice the array, otherwise use full array
  const moviesToDisplay = limit ? movies.slice(0, limit) : movies;
  return (
    <div className="mb-4">
      <h2 className="text-white ms-3">{title}</h2>
      <div className="d-flex overflow-auto py-2">
        {moviesToDisplay.map((movie) => (
          <MovieCard key={movie.showId} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default CarouselRow;
