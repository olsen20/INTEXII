import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/Movies";
import "../index.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // Use posterUrl from API, fallback to a default image
  const posterUrl =
    movie.posterUrl && movie.posterUrl.trim() !== ""
      ? movie.posterUrl
      : "/posters/default.png";

  return (
    <Link to={`/movies/${movie.showId}`} className="text-decoration-none me-3">
      <div className="card" style={{ width: "10rem", border: "none" }}>
        <img
          src={posterUrl}
          className="card-img-top"
          style={{ width: "10rem", height: "15rem", border: "none" }}
          alt={movie.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
            (e.currentTarget.src = "/posters/default.png")
          }
        />
        <div
          className="card-body p-2 card-hover"
          style={{
            backgroundColor: "#202020",
            border: "none",
          }}
        >
          <p className="card-text text-center text-white">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
