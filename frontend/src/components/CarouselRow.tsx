// In CarouselRow.tsx (ensure it accepts a showRanking prop)
import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../types/Movies";

interface CarouselRowProps {
  title: string;
  movies: Movie[];
  limit?: number;
  showRanking?: boolean;
}

const CarouselRow: React.FC<CarouselRowProps> = ({ title, movies, limit, showRanking }) => {
  const moviesToDisplay = limit ? movies.slice(0, limit) : movies;
  return (
    <div className="mb-4">
      <h2 className="text-white ms-3" style={{ padding: "1rem" }}>{title}</h2>
      <div className="d-flex overflow-auto py-2">
        {moviesToDisplay.map((movie, index) => (
          <MovieCard
            key={movie.showId}
            movie={movie}
            rank={showRanking ? index + 1 : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselRow;
