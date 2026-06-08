import "./Loader.css";
import logo from "../assets/logo.png";

export default function Loader() {
  return (
    <div className="loader-screen">
      <div className="loader-wrapper">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>

        <div className="logo-container">
          <img
            src={logo}
            alt="Boba Heaven"
            loading="eager"
            decoding="async"
            />
        </div>
      </div>
    </div>
  );
}