import { FaUserCircle } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MyStuffPage.css";
import CarouselRow from "../components/CarouselRow";
import { useEffect, useState } from "react";
import { fetchFavoriteMovies, fetchRatedMovies } from "../api/MovieAPI";

function MyStuffPage() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [rated, setRated] = useState<any[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch both favorites and rated movies
        Promise.all([fetchFavoriteMovies(), fetchRatedMovies()])
        .then(([favoritesData, ratedData]) => {
            setFavorites(favoritesData);
            setRated(ratedData);
        })
        .catch((err) => setError(err.message));
    }, []);
  
  return (
    <>
      <Header />
      <div className="my-stuff-container">
        <div className="profile-header">
          <FaUserCircle className="profile-icon" />
          <h1 className="page-title">My Stuff</h1>
        </div>

        <div className="section">
            <div className="px-5">
            <CarouselRow title="My Favorites" movies={favorites} />
            </div>
        </div>

        <div className="section">
            <div className="px-5">
                <CarouselRow title="Movies I've Rated" movies={rated} />
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyStuffPage;
