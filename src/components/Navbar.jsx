import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar-wrapper">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Boba Heaven" className="logo-img" />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo-text">Boba Heaven</span>
        </Link>
      </div>

      {/* Desktop nav */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      {/* Hamburger button — mobile only */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
        <span className={`ham-line ${menuOpen ? "open" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/"        onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/menu"    onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link to="/about"   onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
}