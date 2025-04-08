// TableOfContents.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/TableOfContents.css";

const TableOfContents: React.FC = () => {
  return (
    <nav className="list-group">
      <Link to="/browse" className="list-group-item list-group-item-action">
        Home
      </Link>
      <Link to="/about" className="list-group-item list-group-item-action">
        About Us
      </Link>
      <Link to="/privacy" className="list-group-item list-group-item-action">
        Privacy
      </Link>
      <Link to="/terms" className="list-group-item list-group-item-action">
        Terms
      </Link>
      <Link to="/contact" className="list-group-item list-group-item-action">
        Contact
      </Link>
    </nav>
  );
};

export default TableOfContents;
