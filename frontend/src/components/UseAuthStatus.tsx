// This determines whether or not the user is logged in so that different information can be displayed

import { useEffect, useState } from "react";

export function useAuthStatus(): boolean | null {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("https://localhost:5000/pingauth", {
      method: "GET",
      credentials: "include", // Send cookies
    })
      .then((res) => setIsLoggedIn(res.ok))
      .catch(() => setIsLoggedIn(false));
  }, []);

  return isLoggedIn;
}
