import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNotSignedIn from "../components/HeaderNotSignedIn";
import Footer from "../components/Footer";
import { registerUser } from "../api/IdentityAPI";

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
        <div className="register-container d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
        <div className="register-card card p-4 rounded-4 border-0 text-light" style={{ maxWidth: "500px", width: "100%", backgroundColor: '#1a1a1a' }}>
            <h2 className="text-center mb-4 fw-bold text-light">Create Your Account</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input
                type="email"
                id="email"
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
                id="password"
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
                id="confirmPassword"
                name="confirmPassword"
                className="form-control bg-dark text-light border-light"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                />
                <label htmlFor="confirmPassword" className="text-secondary">Confirm Password</label>
            </div>

            {error && <div className="text-danger mb-3 text-center">{error}</div>}

            <div className="d-grid mb-3">
            <button type="submit" className="btn btn-outline-light login-button w-100">
                Register
                </button>
            </div>

            <div className="d-grid">
                <button onClick={handleLoginClick} className="btn btn-secondary text-light">
                Already have an account? Login
                </button>
            </div>
            </form>
        </div>
        </div>
        <Footer />
    </>
  );
}

export default CreateAccountPage;
