import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselRow from "../components/CarouselRow";
import { Movie } from "../types/Movies";
import "../index.css";

const Home: React.FC = () => {
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Record<string, Movie[]>>({});

  // Dummy data for recommended movies
  const sampleRecommended: Movie[] = [
    { show_id: 1, title: "The Matrix" },
    { show_id: 2, title: "Inception" },
    { show_id: 3, title: "Interstellar" },
    { show_id: 4, title: "The Godfather" },
    { show_id: 5, title: "Pulp Fiction" },
  ];

  // Dummy data for movies grouped by genre
  const sampleGenres: Record<string, Movie[]> = {
    Action: [
      { show_id: 6, title: "Die Hard" },
      { show_id: 7, title: "Mad Max: Fury Road" },
      { show_id: 8, title: "John Wick" },
    ],
    Comedy: [
      { show_id: 9, title: "Superbad" },
      { show_id: 10, title: "Step Brothers" },
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
      {/* Full-width recommended section */}
      <div className="recommended-section">
        <CarouselRow title="Recommended for You" movies={recommended} />
      </div>

      {/* Other genre sections remain inside a container */}
      <div className="container mt-5 pt-3">
        {Object.entries(genres).map(([genre, movies]) => (
          <CarouselRow key={genre} title={genre} movies={movies} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
