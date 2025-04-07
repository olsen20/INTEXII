import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="full-width-footer bg-dark text-white pt-4">
      {/* Use container-fluid directly on the footer or inside the footer */}
      <div className="container-fluid px-5">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white text-decoration-none" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
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
              <li>
                <Link className="text-white text-decoration-none" to="/cookies">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex">
              <li className="me-3">
                <a className="text-white" href="https://facebook.com">
                  <i
                    className="bi bi-facebook"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
              </li>
              <li className="me-3">
                <a className="text-white" href="https://twitter.com">
                  <i
                    className="bi bi-twitter"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </a>
              </li>
              <li className="me-3">
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

        <div className="row mt-3">
          <div className="col-12 text-center">
            {/* Newsletter or other elements */}
            <form className="d-flex justify-content-center mb-3">
              <input
                type="email"
                className="form-control w-auto me-2"
                placeholder="Enter your email"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="text-center py-2 border-top border-secondary">
          &copy; {new Date().getFullYear()} CineNiche. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
