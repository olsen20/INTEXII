import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../api/MovieAPI";
import { getUserRating, submitUserRating } from "../api/RatingAPI";
import StarRating from "../components/StarRating";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MovieDetails.css";
import CarouselRow from "../components/CarouselRow";
import { fetchCollaborativeRecommendations, fetchContentRecommendations } from "../api/RecommenderAPI";
import AuthorizeView from "../components/AuthorizeView";
import { Movie } from "../types/Movies";

function MovieDetails() {
  const { showId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState<number>(0);
  const [colRecommendations, setColRecommendations] = useState<Movie[]>([]);
  const [conRecommendations, setConRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    if (showId) {
      setMovie(null);  // Reset movie to trigger loading state
      setUserRating(0);  // Reset user rating to prevent previous carry-over

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

      // Use Content filtering to get which movies are similar
      fetchContentRecommendations(showId)
        .then(setConRecommendations)
        .catch((err) => console.error("Failed to fetch Content recommendations:", err));

      // Use Collaborative Filtering to get which movies viewers also watched
      fetchCollaborativeRecommendations(showId)
        .then(setColRecommendations)
        .catch((err) => console.error("Failed to fetch Collaborative recommendations:", err));
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
      <AuthorizeView>
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
              <div className="carousel-fade-in movie-info">
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

        {/* Recommended Movie Carousels */}
        <div className="recommended-section">

          {/* Content Filtering */}
          {conRecommendations.length > 0 && (
            <div className="carousel-fade-in trending px-5">
              <CarouselRow
                title="More Movies Like This:"
                movies={conRecommendations}
                limit={10}
                showRanking={false}
              />
            </div>
          )}

          {/* Collaborative Filtering */}
          {colRecommendations.length > 0 && (
            <div className="carousel-fade-in trending px-5">
              <CarouselRow
                title="Viewers Who Watched This Also Watched:"
                movies={colRecommendations}
                limit={10}
                showRanking={false}
              />
            </div>
          )}
        </div>

        <Footer />
      </AuthorizeView>
    </>
  );
}

export default MovieDetails;
