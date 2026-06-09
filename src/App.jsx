import { useState, useRef, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Loader from "./components/Loader";

import boba1 from "./assets/boba1.png";
import boba2 from "./assets/boba2.png";
import boba3 from "./assets/boba3.png";

const slides = [
  {
    id: 0,
    image: boba3,
    price: "Cloudy Chai",
    description:
      "A warming blend of spiced chai, velvety milk, and rich cocoa undertones, topped with soft brown sugar pearls that melt into every sip.",
    tagline: "Spiced. Warm. Velvety.",
    caption: "Cloudy Chai · Boba Heaven",
    gradient: "g3",
  },
  {
    id: 1,
    image: boba1,
    price: "Sunrise Popping",
    description:
      "Bold black tea meets creamy milk in this classic crowd-pleaser, loaded with chewy tapioca pearls and a golden caramel drizzle.",
    tagline: "Bold. Creamy. Classic.",
    caption: "Sunrise Popping Boba · Boba Heaven",
    gradient: "g1",
  },
  {
    id: 2,
    image: boba2,
    price: "BlueBerry",
    description:
      "A dreamy taro base swirled with coconut cream and topped with popping blueberry boba that bursts with every sip.",
    tagline: "Dreamy. Fruity. Fresh.",
    caption: "Blueberry Float · Boba Heaven",
    gradient: "g2",
  },
];

function Home() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState("next");
  const [loading, setLoading]     = useState(true);

  const appRef       = useRef(null);
  const prevGradient = useRef(slides[0].gradient);

  const nextSlide = useCallback(() => {
    setDirection("next");
    setActive((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection("prev");
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setDirection(index > active ? "next" : "prev");
    setActive(index);
  }, [active]);
  
  // Preload all images before showing anything
  useEffect(() => {
    let loaded = 0;
    const images = slides.map(s => s.image);

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length) setLoading(false);
      };
    });
  }, []);

  // Auto-advance every 9 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 9000);
    return () => clearInterval(timer);
  }, [active, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft")  prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide]);

  // Background gradient switching
  useEffect(() => {
    const el = appRef.current;
    if (!el) return;
    el.classList.remove(prevGradient.current);
    el.classList.add(slides[active].gradient);
    prevGradient.current = slides[active].gradient;
  }, [active]);

  const nextIndex = (active + 1) % slides.length;
  const prevIndex = (active - 1 + slides.length) % slides.length;

  if (loading) return <Loader />;

  return (
    <div ref={appRef} className={`app ${slides[active].gradient}`}>
      <Navbar />
      <Hero
        slide={slides[active]}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        nextImage={slides[nextIndex].image}
        prevImage={slides[prevIndex].image}
        direction={direction}
        activeIndex={active}
        total={slides.length}
        goToSlide={goToSlide}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/about"   element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}