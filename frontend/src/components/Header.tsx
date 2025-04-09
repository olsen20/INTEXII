import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Import custom CSS for slide-up/slide-down animations
import fullLogo2 from "../assets/fullLogo2.png"; // Logo image
import profileIcon from "../assets/profileIcon.png"; // Profile icon image
import Logout from "../components/Logout"; // Import the Logout component
import { useRole } from "../context/RoleContext";

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const lastScrollY = useRef<number>(window.pageYOffset);

  const { role, isLoading } = useRole();

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
    <>
      <nav
        className={`navbar fixed-top navbar-dark bg-dark fs-5 ${
          showHeader ? "slide-down" : "slide-up"
        }`}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left Section: Logo + "Browse" + "My Stuff" */}
          <div className="d-flex align-items-center">
            {/* Logo */}
            <Link className="navbar-brand me-5" to="/browse">
              <img
                src={fullLogo2}
                alt="CineNiche Logo"
                className="header-logo"
              />
            </Link>
            {/* Navigation Links */}
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item me-5">
                <Link className="nav-link" to="/browse">
                  Browse
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to="/mystuff">
                  My Stuff
                </Link>
              </li>
              {/* Conditional admin button */}
              {!isLoading && role === "Administrator" && (
                <li className="nav-item me-5">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Right Section: Search + Profile Icon + Log Out */}
          <div className="d-flex align-items-center">
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item me-5">
                <Link className="nav-link" to="/search">
                  <i className="bi bi-search search-icon"></i>
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to="/mystuff">
                  <img
                    src={profileIcon}
                    alt="Profile"
                    className="profile-icon"
                  />
                </Link>
              </li>
              <li className="nav-item me-5">
                {/* Use Logout component with a button inside */}
                <Logout>
                  <button className="btn logout-button">Log Out</button>
                </Logout>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
