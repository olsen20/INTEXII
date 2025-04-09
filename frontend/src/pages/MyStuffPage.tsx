import { FaUserCircle } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MyStuffPage.css";
import CarouselRow from "../components/CarouselRow";
import { useEffect, useState } from "react";
import { fetchFavoriteMovies, fetchRatedMovies } from "../api/MovieAPI";
import { fetchUserRecommendations } from "../api/RecommenderAPI";
import { Movie } from "../types/Movies";
import AuthorizeView from "../components/AuthorizeView";

function MyStuffPage() {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [rated, setRated] = useState<Movie[]>([]);
    const [userRecs, setUserRecs] = useState<Movie[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
      // Fetch favorites, rated, and user-specific recommendations
      Promise.all([
        fetchFavoriteMovies(),
        fetchRatedMovies(),
        fetchUserRecommendations("1")  // Hard-coded for now
      ])
        .then(([favoritesData, ratedData, recommendations]) => {
          setFavorites(favoritesData);
          setRated(ratedData);
          setUserRecs(recommendations);
        })
        .catch((err) => setError(err.message));
    }, []);
  
  return (
    <>
      <AuthorizeView>
        <Header />
        <div className="my-stuff-container">
          <div className="profile-header">
            <FaUserCircle className="profile-icon" />
            <h1 className="page-title">My Stuff</h1>
          </div>

          {/* Favorite Movies (rated 5 stars) */}
          <div className="section">
              <div className="px-5">
              <CarouselRow title="My Favorites" movies={favorites} />
              </div>
          </div>

          {/* Movies the user has rated */}
          <div className="section">
              <div className="px-5">
                  <CarouselRow title="Movies I've Rated" movies={rated} />
              </div>
          </div>

          {/* Recommended movies to watch based on the user */}
          <div className="section">
              <div className="px-5">
                  <CarouselRow title="Recommended for Me" movies={userRecs} />
              </div>
          </div>
        </div>
        <Footer />
      </AuthorizeView>
    </>
  );
}

export default MyStuffPage;
