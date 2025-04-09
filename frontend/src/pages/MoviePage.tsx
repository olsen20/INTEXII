import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselRow from "../components/CarouselRow";
import HeroBanner from "../components/HeroBanner";
import { featuredMovie, Movie } from "../types/Movies";
import "../index.css";
import "../styles/MovieCard.css";
import { fetchAllMovies, fetchTrendingMovies } from "../api/MovieAPI";
import AuthorizeView from "../components/AuthorizeView";

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [top10Movies, setTop10Movies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  // Retrieve list of all movies and list of trending (top 10) movies
  useEffect(() => {
    Promise.all([fetchAllMovies(), fetchTrendingMovies()])
      .then(([all, top]) => {
        setMovies(all);
        setTop10Movies(top);
      })
      .catch((err) => setError(err.message));
  }, []);
  
  // Derive filtered data using the raw movies state
  const moviesCategory = movies.filter(
    (movie) => movie.typeField?.toLowerCase() === "movie"
  );
  const tvShowsCategory = movies.filter(
    (movie) => movie.typeField?.toLowerCase() === "tv show"
  );
  const actionMovies = movies.filter((movie) => movie.action === 1);
  const comedyMovies = movies.filter((movie) => movie.comedies === 1);
  const documentaryMovies = movies.filter((movie) => movie.documentaries === 1);
  const horrorMovies = movies.filter((movie) => movie.horrorMovies === 1);

  // Use the first movie as featured or choose a fallback
  const featuredMovie: featuredMovie = { title: "Paris, Texas" };

  // Trailer URL (ensure the video is located in public/trailers)
  const trailerUrl = "/trailers/parisTexas.mp4";

  // Description for the hero banner (could come from featuredMovie if available)
  const heroDescription =
    "Travis Henderson, a disoriented drifter with no memory, is unexpectedly reunited with his long-lost family. Witness a quiet, contemplative journey of rediscovery and hope.";

  return (
    <AuthorizeView>
      <div className="bg-black text-white min-vh-100 pt-5">
        <Header />

        {/* Hero section at the top using the trailer */}
        <HeroBanner
          title={featuredMovie.title || ""}
          description={heroDescription}
          trailerUrl={trailerUrl}
        />
        <br></br>
        <div className="recommended-section">
          {/* New Carousel for Top 10 Movies */}
          <div className="trending px-5">
            <CarouselRow title="Top 10 Movies" movies={top10Movies} limit={10} showRanking={true} />
          </div>
          {/* Carousel section for Movies */}
          <div className="px-5">
            <CarouselRow title="Movies" movies={moviesCategory} limit={15} />
          </div>

          {/* Carousel section for TV Shows */}
          <div className="px-5">
            <CarouselRow title="TV Shows" movies={tvShowsCategory} limit={15} />
          </div>

          {/* Carousel section for Action */}
          <div className="px-5">
            <CarouselRow title="Action" movies={actionMovies} limit={15} />
          </div>

          {/* Carousel section for Comedy */}
          <div className="px-5">
            <CarouselRow title="Comedy" movies={comedyMovies} limit={15} />
          </div>

          {/* Carousel section for Documentary */}
          <div className="px-5">
            <CarouselRow
              title="Documentaries"
              movies={documentaryMovies}
              limit={15}
            />
          </div>

          {/* Carousel section for Horror */}
          <div className="px-5">
            <CarouselRow title="Horror" movies={horrorMovies} limit={15} />
          </div>
        </div>

        <Footer />
      </div>
    </AuthorizeView>
  );
};

export default MoviePage;
