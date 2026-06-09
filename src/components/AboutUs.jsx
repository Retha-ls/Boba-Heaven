import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./AboutUs.css";
import Navbar from "./Navbar";

const stats = [
  { value: "3+", label: "Signature Blends" },
  { value: "100%", label: "Fresh Ingredients" },
  { value: "1", label: "Cup at a Time" },
];

const pillars = [
  {
    icon: "✦",
    title: "Quality",
    body: "Every ingredient is chosen for freshness and flavour. No shortcuts, no compromises.",
  },
  {
    icon: "◈",
    title: "Creativity",
    body: "Seasonal creations, bold combinations, and drinks that surprise even the most devoted boba fan.",
  },
  {
    icon: "◉",
    title: "Community",
    body: "We're not just serving drinks — we're building a culture and bringing people together.",
  },
];

export default function AboutUs() {
  const heroRef    = useRef(null);
  const taglineRef = useRef(null);
  const statsRef   = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("bobaGradient") || "g3";
    document.querySelector(".about-page")?.classList.add(saved);
  }, []);

  useEffect(() => {
    const lines = heroRef.current.querySelectorAll(".about-hero-line");
    gsap.fromTo(lines,
      { opacity: 0, y: 60, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out", stagger: 0.15, delay: 0.2 }
    );
    gsap.fromTo(taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.85 }
    );

    const timer = setTimeout(() => {
      if (statsRef.current) {
        const navbarHeight = 100;
        const y =
          statsRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="about-hero" ref={heroRef}>
        <div className="about-hero-inner">
          <p className="about-eyebrow">Our Story</p>
          <h1 className="about-headline">
            <span className="about-hero-line">Bringing Boba</span>
            <span className="about-hero-line about-hero-line--accent">to Lesotho.</span>
          </h1>
          <p className="about-sub" ref={taglineRef}>
            Sip. Smile. Stay Bubbly.
          </p>
        </div>
        <div className="bubble bubble--lg" />
        <div className="bubble bubble--md" />
        <div className="bubble bubble--sm" />
      </section>

      {/* ── STATS ── */}
      <section className="about-stats" ref={statsRef}>
        {stats.map((s, i) => (
          <div className="about-stat" key={i}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── STORY ── */}
      <section className="about-story">

        {/* Opening pull-quote — full width, large */}
        <div className="about-story-pullquote">
          <span className="pullquote-decoration">✦</span>
          <p>
            Boba Heaven LS was created to bring the fun, creativity, and culture
            of bubble tea to Lesotho, to create more than just drinks.
            We wanted to create an <em>experience.</em>
          </p>
        </div>

        {/* Two-column body */}
        <div className="about-story-inner">
          <div className="about-story-col">
            <p className="story-lead">Every cup is crafted to be refreshing, memorable, and full of flavour.</p>
            <p>
              From fruity refreshers and creamy signature blends to exciting
              seasonal creations, we combine quality ingredients with creativity
              to deliver drinks that genuinely stand out.
            </p>
          </div>
          <div className="about-story-col">
            <p className="story-lead">Bubble tea has become one of the world's most loved beverages.</p>
            <p>
              Known for bringing people together through unique flavours,
              colourful presentation, and endless customization — we're proud
              to introduce that culture to Lesotho.
            </p>
          </div>
        </div>

      </section>

      {/* ── MISSION INTERSTITIAL ── */}
      <section className="about-mission-section">
        <div className="about-mission-inner">
          <span className="mission-rule" />
          <p className="about-mission">
            Our mission is simple, to create moments of happiness,
            <br /><em>ONE CUP AT A TIME.</em>
          </p>
          <span className="mission-rule" />
        </div>
        <p className="mission-sub">Made with love in Maseru.</p>
      </section>

      {/* ── PILLARS ── */}
      <section className="about-pillars">
        <div className="pillars-header">
          <span className="pillars-eyebrow">What We Stand For</span>
          <h2 className="pillars-heading">Three things we<br /><em>never compromise on.</em></h2>
        </div>
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <div className="pillar-card" key={i}>
              <span className="pillar-icon">{p.icon}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-body">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <p className="cta-eyebrow">Ready to sip?</p>
          <h2 className="cta-heading">Your first cup<br />is waiting.</h2>
          <a href="/" className="cta-btn">Explore the Menu →</a>
        </div>
        <div className="cta-glow" />
      </section>

    </div>
  );
}