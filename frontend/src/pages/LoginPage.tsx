import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNotSignedIn from "../components/HeaderNotSignedIn";
import Footer from "../components/Footer";
import { loginUser } from "../api/IdentityAPI";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") setRememberme(checked);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/create-account");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await loginUser(email, password, rememberme);
  
      let data = null;
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }
  
      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }
  
      navigate("/browse");
    } catch (error: any) {
      setError(error.message || "Error logging in.");
      console.error("Fetch failed:", error);
    }
  };  

  return (
    <>
    <HeaderNotSignedIn />
    <div className="register-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="register-card card p-4 rounded-4 border-0 text-light" style={{ maxWidth: "500px", width: "100%", backgroundColor: '#1a1a1a' }}>
        <h2 className="text-center mb-4 fw-bold">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
            />
            <label htmlFor="email" className="text-secondary">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
            />
            <label htmlFor="password" className="text-secondary">Password</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberme"
              name="rememberme"
              checked={rememberme}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rememberme">
              Remember me
            </label>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-outline-light login-button w-100">
              Sign In
            </button>
          </div>

          <div className="d-grid mb-3">
            <button onClick={handleRegisterClick} className="btn btn-secondary w-100">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default LoginPage;
