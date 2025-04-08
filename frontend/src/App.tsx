import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/LandingPage";
import MoviePage from "./pages/MoviePage";
// import SearchPage from "./pages/SearchPage";
// import AccountPage from "./pages/AccountPage";
// import LoginPage from "./pages/LoginPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<MoviePage />} />
        {/* <Route path="/search" element={<SearchPage />} /> */}
        {/* <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
