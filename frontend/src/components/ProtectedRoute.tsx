import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode; // The children passed to ProtectedRoute
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch("https://localhost:5000/api/User/role", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setRole(data.roles[0]); // Assuming only one role for simplicity
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Error fetching role:", error);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the user is not an Administrator, redirect them
  if (role !== "Administrator") {
    navigate("/browse"); // Redirect to unauthorized page
    return null;
  }

  // If the user is an Administrator, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
