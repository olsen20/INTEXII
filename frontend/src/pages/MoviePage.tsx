import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarouselRow from '../components/CarouselRow';
// import { getRecommendations, getMoviesByGenre } from '../services/api';
import { Movie } from '../types/Movies';

const Home: React.FC = () => {
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Record<string, Movie[]>>({});

//   useEffect(() => {
//     // Fetch recommendations from your ASP.NET backend
//     getRecommendations().then((data) => setRecommended(data));
//     // Fetch movies grouped by genre
//     getMoviesByGenre().then((data) => setGenres(data));
//   }, []);

  return (
    <div className="bg-black text-white min-vh-100 pt-5">
      <Header />
      <div className="container mt-5 pt-5">
        {recommended.length > 0 && (
          <CarouselRow title="Recommended for You" movies={recommended} />
        )}
        {Object.entries(genres).map(([genre, movies]) => (
          <CarouselRow key={genre} title={genre} movies={movies} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
