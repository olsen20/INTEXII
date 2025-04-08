import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNotSignedIn from "../components/HeaderNotSignedIn";
import Footer from "../components/Footer";
import { loginUser } from "../api/IdentityAPI";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState("");
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

      if (!response.ok) throw new Error(data?.message || "Invalid email or password.");
      navigate("/browse");
    } catch (error: any) {
      setError(error.message || "Error logging in.");
    }
  };

  return (
    <>
      <HeaderNotSignedIn />
      <div className="login-background">
        <div className="login-overlay d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="login-card p-5 text-light rounded-4 shadow-lg">
                  <h1 className="text-center fw-bold mb-4 display-5 text-light">Sign In</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control bg-dark text-light border-light"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                      />
                      <label htmlFor="email" className="text-secondary">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        name="password"
                        className="form-control bg-dark text-light border-light"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                      />
                      <label htmlFor="password" className="text-secondary">Password</label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        name="rememberme"
                        className="custom-checkbox"
                        checked={rememberme}
                        onChange={handleChange}
                      />
                      <label className="form-check-label text-light" htmlFor="rememberme">
                        Remember me
                      </label>
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>}

                    <div className="d-grid mb-3">
                      <button type="submit" className="btn btn-secondary text-light w-100">
                        Sign In
                      </button>
                    </div>

                    <div className="d-grid">
                      <button
                        onClick={handleRegisterClick}
                        className="btn btn-outline-light fw-bold w-100"
                      >
                        New to CineNiche? Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
