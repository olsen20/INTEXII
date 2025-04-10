import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Optional: external CSS file

interface HeroBannerProps {
  title: string;
  description: string;
  trailerUrl: string; // URL to your trailer video
  movieId: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  description,
  trailerUrl,
  movieId,
}) => {
 const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className="hero-banner position-relative">
      {/* Video element that plays the trailer */}
      <video
        className="hero-video w-100"
        src={trailerUrl}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Overlay content */}
      <div className="hero-content position-absolute top-50 start-0 translate-middle-y ps-5 text-white">
        <h1 className="display-4 fw-bold">{title}</h1>
        <p className="lead" style={{ maxWidth: "600px" }}>
          {description}
        </p>
        <button className="btn btn-outline-light" onClick={handleDetails}>
          Details
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
