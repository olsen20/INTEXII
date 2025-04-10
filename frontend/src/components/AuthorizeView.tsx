import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../types/User';
import { getAuthenticatedUser } from "../api/IdentityAPI";

const UserContext = createContext<User | null>(null);

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // add a loading state
  //const navigate = useNavigate();
  let emptyuser: User = { email: '' };

  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    async function checkAuth() {
      const user = await getAuthenticatedUser();
      if (user) {
        setUser(user);
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    }
  
    checkAuth();
  }, []);
  

  if (loading) {
    return <div className="bg-black text-white min-vh-100 d-flex justify-content-center align-items-center">Loading...</div>;
  }

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/" />;
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null; // Prevents errors if context is null

  return props.value === 'email' ? <>{user.email}</> : null;
}

export default AuthorizeView;