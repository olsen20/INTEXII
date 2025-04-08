import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/Movies';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = `/posters/${movie.title}.jpg`; // Change as needed
  return (
    <Link to={`/movies/${movie.show_id}`} className="text-decoration-none me-3">
      <div className="card" style={{ width: '10rem' }}>
        {/* <img
          src={posterUrl}
          className="card-img-top"
          alt={movie.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
            (e.currentTarget.src = '/posters/default.jpg')
          }
        /> */}
        <div className="card-body p-2">
          <p className="card-text text-center text-white">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
