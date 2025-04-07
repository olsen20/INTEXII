import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
// import SearchPage from "./pages/SearchPage";
// import AccountPage from "./pages/AccountPage";
// import LoginPage from "./pages/LoginPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
      </Routes>
    </Router>
  );
}

export default App;
