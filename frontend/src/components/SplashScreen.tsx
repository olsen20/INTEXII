import "../styles/SplashScreen.css";
import logo from "../assets/fullLogo2.png"; // adjust path as needed

function SplashScreen() {
  return (
    <div className="splash-overlay">
      <img src={logo} alt="CineNiche" className="splash-logo" />
    </div>
  );
}

export default SplashScreen;