import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../api/MovieAPI";
import { getUserRating, submitUserRating } from "../api/RatingAPI";
import StarRating from "../components/StarRating";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MovieDetails.css";
import CarouselRow from "../components/CarouselRow";
import {
  fetchCollaborativeRecommendations,
  fetchContentRecommendations,
} from "../api/RecommenderAPI";
import AuthorizeView from "../components/AuthorizeView";
import { Movie } from "../types/Movies";
import { FaPlay } from "react-icons/fa";

function MovieDetails() {
  const { showId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState<number>(0);
  const [savedComment, setSavedComment] = useState<string>(""); // What is in the DB
  const [editComment, setEditComment] = useState<string>(""); // What the user is typing
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [colRecommendations, setColRecommendations] = useState<Movie[]>([]);
  const [conRecommendations, setConRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    if (showId) {
      setMovie(null); // Reset movie to trigger loading state
      setUserRating(0); // Reset user rating to prevent previous carry-over
      setShowCommentBox(false);
      setIsEditingComment(false);

      // Retrieve the movie details
      fetchMovieById(showId)
        .then((data) => setMovie(data))
        .catch((err) => setError(err.message));

      // Retrieve the user rating (if provided)
      getUserRating(showId)
        .then((data) => {
          if (data) {
            setUserRating(data.rating ?? 0);
            setSavedComment(data.comment ?? "");
            setEditComment(data.comment ?? "");
            setShowCommentBox(true);
          }
        })
        .catch((err) => console.error("Failed to load user rating:", err));

      fetchContentRecommendations(showId).then(setConRecommendations);
      fetchCollaborativeRecommendations(showId).then(setColRecommendations);
    }
  }, [showId]);

  // Ran when the user changes their rating
  const handleRatingChange = async (rating: number) => {
    if (!showId) return;
    try {
      await submitUserRating(showId, rating, savedComment);  // Send rating + last saved comment
      setUserRating(rating);
      setShowCommentBox(true);
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  // Ran when adding a new comment
  const handleCommentSubmit = async () => {
    if (!showId) return;
    try {
      await submitUserRating(showId, userRating, editComment);
      setSavedComment(editComment); // Update display
      setIsEditingComment(false);
    } catch (err) {
      console.error("Error submitting comment:", err);
      alert("Failed to submit comment.");
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
                src={movie.posterUrl || "/posters/default.png"}
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
                  {movie.releaseYear} &nbsp; | &nbsp;{" "}
                  {movie.rating || "Unrated"}
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

                {/* Watch buttons */}
                <div className="button-row">
                  <button className="watch-now-button mt-3">
                    <FaPlay className="me-2" />
                    Watch Now
                  </button>
                  <button className="watch-trailer-button mt-3">
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
            {/* Comment area */}
            {showCommentBox && (
              <>
                <hr className="divider" />
                <h5>{savedComment ? "Your Comment" : "Add a Comment"}</h5>
                {savedComment && !isEditingComment ? (
                  <>
                    <div className="user-comment">{savedComment}</div>
                    <button
                      className="btn comment-button mt-2"
                      onClick={() => setIsEditingComment(true)}
                    >
                      Edit Comment
                    </button>
                  </>
                ) : (
                  <>
                    <textarea
                      className="form-control"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      placeholder="Leave your thoughts..."
                    />
                    <div className="button-row">
                      <button
                        className="btn comment-button mt-2"
                        onClick={handleCommentSubmit}
                      >
                        Submit Comment
                      </button>
                      {savedComment && (
                        <button
                          className="btn comment-button mt-2"
                          onClick={() => {
                            setIsEditingComment(false);
                            setEditComment(savedComment); // Reset to last saved
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </>
                )}
                <hr className="divider" />
              </>
            )}
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
