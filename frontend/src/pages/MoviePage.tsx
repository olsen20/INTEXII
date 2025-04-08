import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselRow from "../components/CarouselRow";
import HeroBanner from "../components/HeroBanner";
import { Movie } from "../types/Movies";
import "../index.css";

const Home: React.FC = () => {
  // Define the featured movie for the hero banner
  const featuredMovie: Movie = {
    show_id: 1,
    title: "Paris, Texas",
  };

  // A trailer for the hero – make sure this file exists in your public/trailers folder.
  const trailerUrl = "/trailers/parisTexas.mp4";

  // A description for the featured movie
  const heroDescription =
    "Travis Henderson, a disoriented drifter with no memory, is unexpectedly reunited with his long-lost family. Witness a quiet, contemplative journey of rediscovery and hope.";

  // State for recommended movies and genres
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Record<string, Movie[]>>({});

  // Dummy data for recommended movies
  const sampleRecommended: Movie[] = [
    { show_id: 2, title: "The Matrix" },
    { show_id: 3, title: "Inception" },
    { show_id: 4, title: "Interstellar" },
    { show_id: 5, title: "The Godfather" },
    { show_id: 6, title: "Pulp Fiction" },
  ];

  // Dummy data for movies grouped by genre
  const sampleGenres: Record<string, Movie[]> = {
    Action: [
      { show_id: 7, title: "Die Hard" },
      { show_id: 8, title: "Mad Max: Fury Road" },
      { show_id: 9, title: "John Wick" },
    ],
    Comedy: [
      { show_id: 10, title: "Superbad" },
      { show_id: 11, title: "Step Brothers" },
    ],
  };

  useEffect(() => {
    // Set the dummy data immediately for testing
    setRecommended(sampleRecommended);
    setGenres(sampleGenres);
  }, []);

  return (
    <div className="bg-black text-white min-vh-100 pt-5">
      <Header />

      {/* Hero section at the very top with video trailer */}
      <HeroBanner
        title={featuredMovie.title}
        description={heroDescription}
        trailerUrl={trailerUrl}
        movieId={featuredMovie.show_id}
      />

      {/* Full-width recommended section */}
      <div className="recommended-section">
        <CarouselRow title="Recommended for You" movies={recommended} />
      </div>

      <div className="recommended-section">
        {Object.entries(genres).map(([genre, movies]) => (
          <CarouselRow key={genre} title={genre} movies={movies} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
