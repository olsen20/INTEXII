import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/IdentityAPI";
import "../styles/Header.css"; // Create this CSS file for overlay styling

function Logout(props: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Show the overlay transition
    setIsLoggingOut(true);
    try {
      const response = await logoutUser();
      if (response.ok) {
        // Delay the navigation to allow the overlay to show
        setTimeout(() => {
          sessionStorage.removeItem("splashShown");
          navigate("/");
        }, 1000);
      } else {
        console.error("Logout failed:", response.status);
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <a className="logout" href="#" onClick={handleLogout}>
        {props.children}
      </a>
      {isLoggingOut && (
        <div className="logout-overlay">
          <div className="logout-message">Logging Out...</div>
        </div>
      )}
    </>
  );
}

export default Logout;
