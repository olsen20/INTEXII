import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  initialRating?: number;
  onRate?: (rating: number) => void;
};

function StarRating({ initialRating = 0, onRate }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(initialRating);

  // Update selected when initialRating changes
  useEffect(() => {
    setSelected(initialRating);
  }, [initialRating]);

  // Update the rating when changed
  const handleClick = (rating: number) => {
    setSelected(rating);
    if (onRate) onRate(rating);
  };

  return (
    <div className="d-flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{ cursor: "pointer", transition: "color 0.2s" }}
          color={star <= (hovered || selected) ? "#f5c518" : "#999"}
        />
      ))}
    </div>
  );
}

export default StarRating;
