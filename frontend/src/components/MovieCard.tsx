import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/Movies";
import "../index.css";
import "../styles/MovieCard.css";

interface MovieCardProps {
  movie: Movie;
  rank?: number; // optional rank prop for Top 10 Movies
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, rank }) => {
  // Use posterUrl from API; fallback to default image if necessary.
  const posterUrl =
    movie.posterUrl && movie.posterUrl.trim() !== ""
      ? movie.posterUrl
      : "/posters/default.png";

  return (
    <Link to={`/movies/${movie.showId}`} className="text-decoration-none me-3">
      {/* Add the "top10" class if a rank is provided */}
      <div className={`card movie-card ${rank ? "top10" : ""}`}>
        <img
          src={posterUrl}
          alt={movie.title}
          className="card-img-top"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
            (e.currentTarget.src = "/posters/default.png")
          }
        />
        {rank && <span className="top10-ranking">{rank}</span>}
        <div className="card-body p-2 movie-card-body">
          <p className="card-text text-center text-white">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
