import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselRow from "../components/CarouselRow";
import HeroBanner from "../components/HeroBanner";
import { featuredMovie, Movie } from "../types/Movies";
import "../index.css";
import "../styles/MovieCard.css";
import { fetchAllMovies, fetchTrendingMovies } from "../api/MovieAPI";
import { fetchUserRecommendations } from "../api/RecommenderAPI";

import AuthorizeView from "../components/AuthorizeView";

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [top10Movies, setTop10Movies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  // Retrieve list of all movies and list of trending (top 10) movies, and user recs
  useEffect(() => {
    Promise.all([
      fetchAllMovies(),
      fetchTrendingMovies(),
      fetchUserRecommendations("1"), // Replace "1" with real user ID later
    ])
      .then(([all, top, recs]) => {
        setMovies(all);
        setTop10Movies(top);
        setUserRecs(recs);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Get user-specific recommendations
  const [userRecs, setUserRecs] = useState<Movie[]>([]);

  const [visibleSections, setVisibleSections] = useState<number>(3); // how many carousels are rendered

  const [observeNode, setObserveNode] = useState<HTMLElement | null>(null);
  const lastRowRef = useRef<HTMLDivElement | null>(null);

  // Derive filtered data using the raw movies state
  const moviesCategory = movies.filter(
    (movie) => movie.typeField?.toLowerCase() === "movie"
  );
  const tvShowsCategory = movies.filter(
    (movie) => movie.typeField?.toLowerCase() === "tv show"
  );
  const actionMovies = movies.filter((movie) => movie.action || movie.tvAction === 1);
  const comedyMovies = movies.filter((movie) => movie.comedies === 1);
  const documentaryMovies = movies.filter((movie) => movie.documentaries === 1);
  const horrorMovies = movies.filter((movie) => movie.horrorMovies === 1);
  const adventureMovies = movies.filter((movie) => movie.adventure === 1);
  const animeMovies = movies.filter((movie) => movie.animeSeriesInternationalTvShows === 1);
  const kidsMovies = movies.filter((movie) => movie.children || movie.familyMovies === 1);
  const romanceMovies = movies.filter((movie) => movie.dramasRomanticMovies || movie.comediesRomanticMovies === 1);
  const thrillerMovies = movies.filter((movie) => movie.thrillers || movie.internationalMoviesThrillers === 1);
  const fantasyMovies = movies.filter((movie) => movie.fantasy === 1);
  const crimeMovies = movies.filter((movie) => movie.crimeTvShowsDocuseries === 1);
  const dramaMovies = movies.filter((movie) => movie.comediesDramasInternationalMovies || movie.dramas || movie.dramasInternationalMovies || movie.dramasRomanticMovies || movie.internationalTvShowsRomanticTvShowsTvDramas || movie.tvDramas === 1);

  const sections = [
    {
      title: "Top 10 Movies",
      movies: top10Movies,
      props: { limit: 10, showRanking: true },
    },
    { title: "Movies", movies: moviesCategory, props: { limit: 15 } },
    { title: "TV Shows", movies: tvShowsCategory, props: { limit: 15 } },
    { title: "Action", movies: actionMovies, props: { limit: 15 } },
    { title: "Adventure", movies: adventureMovies, props: { limit: 15 } },
    { title: "Anime", movies: animeMovies, props: { limit: 15 } },
    { title: "Comedy", movies: comedyMovies, props: { limit: 15 } },
    { title: "Crime", movies: crimeMovies, props: { limit: 15 } },
    { title: "Drama", movies: dramaMovies, props: { limit: 15 } },
    { title: "Documentaries", movies: documentaryMovies, props: { limit: 15 } },
    { title: "Fantasy", movies: fantasyMovies, props: { limit: 15 } },
    { title: "Horror", movies: horrorMovies, props: { limit: 15 } },
    { title: "Kids", movies: kidsMovies, props: { limit: 15 } },
    { title: "Romance", movies: romanceMovies, props: { limit: 15 } },
    { title: "Thriller", movies: thrillerMovies, props: { limit: 15 } },
  ];

  useEffect(() => {
    if (!observeNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("📡 Triggered lazy-load");
          setVisibleSections((prev) => Math.min(prev + 1, sections.length));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observeNode);

    return () => {
      observer.disconnect(); // cleanup
    };
  }, [observeNode]);

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
          {userRecs.length > 0 && (
            <div className="carousel-fade-in px-5">
              <CarouselRow
                title="Recommended for You"
                movies={userRecs}
                limit={10}
              />
            </div>
          )}
          {sections.slice(0, visibleSections).map((section, index) => (
            <div
              key={section.title}
              className="carousel-fade-in px-5"
              ref={(el) => {
                if (index === visibleSections - 1) {
                  lastRowRef.current = el;
                  setObserveNode(el); // ✅ update the element to observe
                }
              }}
            >
              <CarouselRow
                title={section.title}
                movies={section.movies}
                {...section.props}
              />
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </AuthorizeView>
  );
};

export default MoviePage;
