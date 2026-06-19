import "./Loader.css";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

export default function Loader() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      setTimeout(() => setImageLoaded(true), 500);
    };
  }, []);

  return (
    <div className="loader-screen">
      <div className="loader-wrapper">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="logo-container">
          {imageLoaded && (
            <img
              src={logo}
              alt="Boba Heaven"
              loading="eager"
              decoding="async"
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}