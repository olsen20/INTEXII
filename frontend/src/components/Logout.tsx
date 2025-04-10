import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/IdentityAPI";
import "../styles/Header.css"; // Create this CSS file for overlay styling
import ReactDOM from "react-dom";

function Logout(props: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await logoutUser();
      if (response.ok) {
        sessionStorage.removeItem("splashShown");
        setTimeout(() => {
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
      <button className="dropdown-item no-underline" onClick={handleLogout}>
        {props.children}
      </button>
      {/* Portal the overlay outside the dropdown */}
      {isLoggingOut &&
        document.body &&
        ReactDOM.createPortal(
          <div className="logout-overlay">
            <div className="logout-message">Logging Out...</div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Logout;
