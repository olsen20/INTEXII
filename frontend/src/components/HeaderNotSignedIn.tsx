import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Import custom CSS for slide-up/slide-down animations
import fullLogo2 from "../assets/fullLogo2.png"; // Import your logo image

const HeaderNotSignedIn: React.FC = () => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const lastScrollY = useRef<number>(window.pageYOffset);

  const controlHeader = () => {
    const currentScrollY = window.pageYOffset;
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      // Scrolling down past 100px: hide header
      setShowHeader(false);
    } else {
      // Scrolling up: show header
      setShowHeader(true);
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, []);

  return (
    <nav
      className={`navbar fixed-top navbar-dark bg-dark fs-5 ${
        showHeader ? "slide-down" : "slide-up"
      }`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left Section: Logo */}
        <div className="d-flex align-items-center">
          <Link className="navbar-brand me-5" to="/">
          <img
            src={fullLogo2}
            alt="CineNiche Logo"
            className="header-logo"
          />
          </Link>
        </div>
        {/* Right Section: Login and Sign Up */}
        <div className="d-flex align-items-center">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item me-5">
              <Link className="nav-link" to="/create-account">
                Create Account
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link to="/login" className="login-button">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNotSignedIn;
