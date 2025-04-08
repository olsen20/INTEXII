import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"; // If you have any custom styles

const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if the email input field is empty (after trimming whitespace)
    if (!email.trim()) {
      // Optionally, you could display a warning or error here.
      return;
    }

    // Update state to show thank-you message
    setSubscribed(true);
  };

  return (
    <footer className="footer full-width-footer bg-dark text-white pt-4">
      <div className="container-fluid px-5">
        {/* Single row with three columns */}
        <div className="row">
          {/* Left-aligned column */}
          <div className="col-md-4 text-start mb-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white text-decoration-none" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Centered column */}
          <div className="col-md-4 text-center mb-3">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white text-decoration-none" to="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Right-aligned column */}
          <div className="col-md-4 text-end mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-end">
              <li className="ms-3">
                <a className="text-white" href="https://facebook.com">
                  <i
                    className="bi bi-facebook"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-white" href="https://twitter.com">
                  <i
                    className="bi bi-twitter"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-white" href="https://instagram.com">
                  <i
                    className="bi bi-instagram"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter or other elements */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            {/* Conditionally render text and form if not subscribed */}
            {!subscribed ? (
              <>
                <p className="small mb-1">
                  Subscribe to our mailing list
                </p>
                <form
                  className="d-flex justify-content-center mb-3"
                  onSubmit={handleSubscribe}
                >
                  <input
                    type="email"
                    className="form-control w-auto me-2"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-subscribe">
                    Subscribe
                  </button>
                </form>
              </>
            ) : (
              <div className="mb-3">
                <p className="fs-6">Thanks for subscribing!</p>
              </div>
            )}
          </div>
        </div>

        <br />
        {/* Copyright */}
        <div className="text-center py-2 border-top border-secondary">
          &copy; {new Date().getFullYear()} CineNiche. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
