import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../api/IdentityAPI";

function Logout(props: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();

  try {
    const response = await logoutUser();
    if (response.ok) {
      navigate("/login");
    } else {
      console.error("Logout failed:", response.status);
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};

  return (
    <a className="logout" href="#" onClick={handleLogout}>
      {props.children}
    </a>
  );
}

export default Logout;