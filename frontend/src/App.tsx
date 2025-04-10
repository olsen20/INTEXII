import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MoviePage from "./pages/MoviePage";
import SearchPage from "./pages/SearchPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import MovieDetails from "./pages/MovieDetails";
import MyStuffPage from "./pages/MyStuffPage";
import AdminPage from "./pages/AdminPage";
import ScrollToTop from "./components/ScrollToTop";
import AuthorizeView from "./components/AuthorizeView";
import CookieConsent from "react-cookie-consent";
import ProtectedRoute from "./components/ProtectedRoute";
import { RoleProvider } from "./context/RoleContext"; // Import RoleProvider

function App() {
  return (
    <RoleProvider>
      {" "}
      {/* Wrap everything with RoleProvider */}
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browse" element={<MoviePage />} />
          <Route
            path="/movies/:showId"
            element={
              <AuthorizeView>
                <MovieDetails />
              </AuthorizeView>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mystuff" element={<MyStuffPage />} />

          {/* Use ProtectedRoute here to protect the /admin route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      {/* Cookie Consent Section */}
      <CookieConsent
        location="bottom"
        buttonText="Accept All Cookies"
        declineButtonText="Decline"
        enableDeclineButton
        style={{
          background: "#1c1c2e",
          color: "#fff",
          fontSize: "0.9rem",
        }}
        buttonStyle={{
          backgroundColor: "#a3acd7",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "4px",
          padding: "8px 15px",
        }}
        declineButtonStyle={{
          backgroundColor: "#444",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "4px",
          padding: "8px 15px",
        }}
        cookieName="cineNicheUserConsent"
      >
        We use cookies to personalize content and improve your experience. By
        clicking "Accept", you agree to our use of cookies.
      </CookieConsent>
    </RoleProvider> // End of RoleProvider
  );
}

export default App;
