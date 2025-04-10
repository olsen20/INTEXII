import profileIcon from "../assets/profileIcon.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MyStuffPage.css";
import CarouselRow from "../components/CarouselRow";
import { useEffect, useState } from "react";
import { fetchFavoriteMovies, fetchRatedMovies } from "../api/MovieAPI";
import { fetchUserRecommendations } from "../api/RecommenderAPI";
import { Movie } from "../types/Movies";
import AuthorizeView from "../components/AuthorizeView";
import { fetchCurrentUserEmail } from "../api/IdentityAPI";

function MyStuffPage() {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [rated, setRated] = useState<Movie[]>([]);
    const [userRecs, setUserRecs] = useState<Movie[]>([]);
    const [error, setError] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
      // Fetch favorites, rated, and user-specific recommendations
      Promise.all([
        fetchFavoriteMovies(),
        fetchRatedMovies(),
        fetchUserRecommendations("1") // Hard-coded for now
      ])
        .then(([favoritesData, ratedData, recommendations]) => {
          setFavorites(favoritesData);
          setRated(ratedData);
          setUserRecs(recommendations);
        })
        .catch((err) => setError(err.message));
    
      // Fetch user email
      fetchCurrentUserEmail()
        .then((email) => {
          if (email) setUserEmail(email);
        })
        .catch(() => {});
    }, []);
  
  return (
    <>
      <AuthorizeView>
        <Header />
        <div className="my-stuff-container">

          {/* User Email */}
          <div className="profile-header">
            <img src={profileIcon} alt="User Profile" className="profile-image" />
            <div>
              <h1 className="page-title">My Stuff</h1>
              {userEmail && <p className="user-email">{userEmail}</p>}
            </div>
          </div>

          {/* Favorite Movies (rated 5 stars) */}
          <div className="section">
            <div className="carousel-fade-in px-5">
              <h2 className="carousel-title">My Favorites</h2>
              {favorites.length > 0 ? (
                <CarouselRow title="" movies={favorites} />
              ) : (
                <p className="text-light text-center">No Favorites Yet</p>
              )}
            </div>
          </div>

          {/* Movies the user has rated */}
          <div className="section">
            <div className="carousel-fade-in px-5">
              <h2 className="carousel-title">Movies I've Rated</h2>
              {rated.length > 0 ? (
                <CarouselRow title="" movies={rated} />
              ) : (
                <p className="text-light text-center">No Rated Movies Yet</p>
              )}
            </div>
          </div>

          {/* Recommended movies to watch based on the user */}
          <div className="section">
            <div className="carousel-fade-in px-5">
              <h2 className="carousel-title">Recommended for Me</h2>
              {userRecs.length > 0 ? (
                <CarouselRow title="" movies={userRecs} />
              ) : (
                <p className="text-light text-center">Start Watching Movies for Suggestions</p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </AuthorizeView>
    </>
  );
}

export default MyStuffPage;
