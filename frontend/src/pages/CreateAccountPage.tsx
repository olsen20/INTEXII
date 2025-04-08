import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNotSignedIn from "../components/HeaderNotSignedIn";
import Footer from "../components/Footer";
import { registerUser } from "../api/IdentityAPI";
import "../styles/LoginPage.css";

function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      registerUser(email, password)
        .then((res) => {
            if (res.ok) {
            setError("Successful registration. Please log in.");
            setTimeout(() => navigate("/login"), 1500);
            } else {
            setError(res.message || "Error registering.");
            }
        })
        .catch(() => {
            setError("Error registering.");
        });
  }};

  return (
    <>
      <HeaderNotSignedIn />
      <div className="login-background">
        <div className="login-overlay d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="login-card p-5 text-light rounded-4 shadow-lg">
                  <h1 className="text-center fw-bold mb-4 display-5 text-light">Create Account</h1>
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

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control bg-dark text-light border-light"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleChange}
                      />
                      <label htmlFor="confirmPassword" className="text-secondary">Confirm Password</label>
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>}

                    <div className="d-grid mb-3">
                      <button type="submit" className="btn btn-secondary text-light w-100">
                        Register
                      </button>
                    </div>

                    <div className="d-grid">
                      <button
                        onClick={handleLoginClick}
                        className="btn btn-outline-light fw-bold w-100"
                      >
                        Already have an account? Login
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

export default CreateAccountPage;
