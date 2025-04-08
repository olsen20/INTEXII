import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../api/MovieAPI";
import { getUserRating, submitUserRating } from "../api/RatingAPI";
import StarRating from "../components/StarRating";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { showId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    if (showId) {

      // Retrieve the movie details
      fetchMovieById(showId)
        .then((data) => setMovie(data))
        .catch((err) => setError(err.message));
      
        // Retrieve the user rating (if provided)
      getUserRating(showId)
        .then((rating) => {
          if (rating !== null) setUserRating(rating);
        })
        .catch(() => console.error("Could not load user rating."));
    }
  }, [showId]);

  // Ran when the user changes their rating
  const handleRatingChange = async (rating: number) => {
    if (!showId) return;
    try {
      await submitUserRating(showId, rating);
      setUserRating(rating);
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  if (error) return <div className="text-danger">{error}</div>;
  if (!movie) return <div className="text-light px-4 py-5">Loading...</div>;

  return (
    <>
      <Header />
      <div className="movie-detail-container">
        <div className="movie-detail-content">
          <div className="poster-and-info">

            {/* Poster Image */}
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop if default also fails
                    target.src = "/posters/default.png";
            }}
            />

            {/* Movie Info */}
            <div className="movie-info">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-subtitle">
                {movie.releaseYear} &nbsp; | &nbsp; {movie.rating || "Unrated"}
              </p>
              <p className="movie-meta">
                <span>{movie.typeField || "Unknown Type"}</span>
                <span>{movie.duration || "Unknown Duration"}</span>
                <span>{movie.country || "Unknown Country"}</span>
              </p>

              {/* Star Rating */}
              <div className="rating-row">
                <span className="rating-label">Your Rating</span>
                <StarRating
                  initialRating={userRating}
                  onRate={handleRatingChange}
                />
              </div>

              <p className="movie-detail">
                <strong>Director:</strong> {movie.director || "Not listed"}
              </p>
              <p className="movie-detail">
                <strong>Cast:</strong> {movie.cast_field || "Not listed"}
              </p>
              <p className="movie-detail">
                <strong>Description:</strong> {movie.description}
              </p>

              {/* Genres if available */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="movie-genres">
                  {movie.genres.map((genre: string, index: number) => (
                    <span key={index} className="genre-badge">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MovieDetails;
