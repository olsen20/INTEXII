import React from "react";
import "../styles/SearchPage.css";

interface GenreCarouselProps {
  subGenreMap: { [key: string]: string[] };
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
}

const GenreCarousel: React.FC<GenreCarouselProps> = ({
  subGenreMap,
  selectedGenres,
  onToggleGenre,
}) => {
  return (
    <div className="genre-carousel">
      {Object.keys(subGenreMap).map((genre) => (
        <div
          key={genre}
          className={`genre-item ${selectedGenres.includes(genre) ? "selected" : ""}`}
          onClick={() => onToggleGenre(genre)}
        >
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default GenreCarousel;
