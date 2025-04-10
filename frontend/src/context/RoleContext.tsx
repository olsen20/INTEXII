import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// RoleContextType to define the context structure
interface RoleContextType {
  role: string | null;
  setRole: (role: string | null) => void;
  isLoading: boolean;
  error: string | null;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// The RoleProvider component to provide the role and loading state
export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Effect to simulate fetching the role from an API or localStorage
  useEffect(() => {
    const fetchRole = async () => {
      try {
        // Simulate role fetch (replace with actual logic such as API call)
        const fetchedRole = await new Promise<string>((resolve) =>
          setTimeout(() => resolve("Administrator"), 1000) // Simulate API delay
        );

        setRole(fetchedRole);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching role:", err);
        setError("Failed to fetch role");
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []); // Empty array means it runs once on mount

  return (
    <RoleContext.Provider value={{ role, setRole, isLoading, error }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook to use role context
export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
