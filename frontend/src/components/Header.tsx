import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Import custom CSS for slide-up/slide-down animations
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import fullLogo2 from "../assets/fullLogo2.png"; // Logo image
import profileIcon from "../assets/profileIcon.png"; // Profile icon image
import { fetchCurrentUserEmail } from "../api/IdentityAPI";
import { logoutUser } from "../api/IdentityAPI";
import { fetchUserRoles } from "../api/IdentityAPI";

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const lastScrollY = useRef<number>(window.pageYOffset);

  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  const [roles, setRoles] = useState<string[]>([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  // Get the user's role to see if they are an Administrator
  useEffect(() => {
    fetchUserRoles()
      .then(setRoles)
      .catch((err) => console.error(err));
  }, []);

  // Add scroll effect to header
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById("profileDropdown");
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);

    // Fetch user email
    fetchCurrentUserEmail()
      .then((email) => {
        if (email) setUserEmail(email);
      })
      .catch(() => {});

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
              {roles.includes("Administrator") && (
                <li className="nav-item me-5">
                  <Link to="/admin" className="nav-link admin-link">Admin</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Right Section: Search + Profile Icon + Log Out */}
          <div className="d-flex align-items-center">
            {/* Seach icon */}
            <div className="me-5">
              <Link className="nav-link" to="/search">
                <i className="bi bi-search search-icon"></i>
              </Link>
            </div>
            <div className="d-flex align-items-center position-relative me-5">
              <button
                className="profile-toggle d-flex align-items-center"
                id="profileDropdown"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <img
                  src={profileIcon}
                  alt="Profile"
                  className="profile-icon me-2"
                />
                <span className="user-email-display">
                  {userEmail} <span className="dropdown-caret">▼</span>
                </span>
              </button>

              {dropdownOpen && (
                <div className="custom-dropdown-overlay">
                  <div className="dropdown-item no-underline">
                    <button
                      className="dropdown-item no-underline"
                      onClick={async () => {
                        setIsLoggingOut(true);
                        const response = await logoutUser();
                        if (response.ok) {
                          sessionStorage.removeItem("splashShown");
                          setTimeout(() => {
                            navigate("/");
                          }, 1000);
                        } else {
                          console.error("Logout failed");
                          setIsLoggingOut(false);
                        }
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isLoggingOut && (
          <div className="logout-overlay">
            <div className="logout-message">Logging Out...</div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
