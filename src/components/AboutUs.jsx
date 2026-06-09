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
      statsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1500);

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
        <div className="about-story-inner">
          <div className="about-story-left">
            <div className="about-story-label">Who We Are</div>
            <div className="about-story-rule" />
          </div>
          <div className="about-story-body">
            <p>
              Boba Heaven LS was created to bring the fun, creativity, and culture
              of bubble tea to Lesotho. Inspired by the global love for boba and
              the growing community of bubble tea enthusiasts around the world, we
              set out to create more than just drinks — we wanted to create an
              <em> experience.</em>
            </p>
            <p>
              At Boba Heaven, every cup is crafted to be refreshing, memorable,
              and full of flavour. From fruity refreshers and creamy signature
              blends to exciting seasonal creations, we combine quality ingredients
              with creativity to deliver drinks that stand out.
            </p>
            <p>
              Bubble tea has become one of the world's most loved beverages, known
              for bringing people together through unique flavours, colourful
              presentation, and endless customization. We are proud to be part of
              that movement by introducing a fresh and exciting drink culture to
              Lesotho.
            </p>
            <p className="about-mission">
              Our mission is simple: to create moments of happiness, one cup at a
              time. Whether you're discovering boba for the first time or you're
              already a devoted fan, Boba Heaven LS is your destination for
              flavour, fun, and unforgettable sips.
            </p>
          </div>
        </div>
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