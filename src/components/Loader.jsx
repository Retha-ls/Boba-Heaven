import "./Loader.css";
import logo from "../assets/logo.png";
import boba1 from "../assets/boba1.png";
import { useState, useEffect } from "react";

export default function Loader({ onComplete }) {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true); // Ring shows immediately

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = 2; // logo + first boba image

    // Load logo
    const logoImg = new Image();
    logoImg.src = logo;
    logoImg.onload = () => {
      loadedCount++;
      setLogoLoaded(true);
      if (loadedCount === totalImages) {
        // Both images loaded, prepare to transition
        setTimeout(onComplete, 300);
      }
    };
    logoImg.onerror = () => {
      loadedCount++;
      setLogoLoaded(true);
      if (loadedCount === totalImages) {
        setTimeout(onComplete, 300);
      }
    };

    // Load first boba image (background loading)
    const bobaImg = new Image();
    bobaImg.src = boba1;
    bobaImg.onload = () => {
      loadedCount++;
      setFirstImageLoaded(true);
      if (loadedCount === totalImages) {
        setTimeout(onComplete, 300);
      }
    };
    bobaImg.onerror = () => {
      loadedCount++;
      setFirstImageLoaded(true);
      if (loadedCount === totalImages) {
        setTimeout(onComplete, 300);
      }
    };
  }, [onComplete]);

  return (
    <div className="loader-screen">
      <div className="loader-wrapper">
        {/* Rings always show */}
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>

        {/* Logo appears when loaded */}
        <div className="logo-container">
          <img
            src={logo}
            alt="Boba Heaven"
            loading="eager"
            decoding="async"
            style={{
              opacity: logoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
}