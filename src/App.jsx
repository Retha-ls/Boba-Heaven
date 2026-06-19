import { useState, useRef, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import Menu from "./components/Menu";

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
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("next");
  const [loading, setLoading] = useState(true);
  const [isHomeReady, setIsHomeReady] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState({
    0: true, // First image loaded in loader
    1: false,
    2: false
  });

  const appRef = useRef(null);
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

  const handleLoaderComplete = () => {
    setLoading(false); // Remove loader, show home page
    setTimeout(() => {
      setIsHomeReady(true); // Home is ready
    }, 100);
  };

  useEffect(() => {
    if (!isHomeReady) return;

    // Preload 2nd and 3rd images in background
    const imagesToPreload = [
      { src: slides[1].image, id: 1 },
      { src: slides[2].image, id: 2 }
    ];

    imagesToPreload.forEach(({ src, id }) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesPreloaded(prev => ({ ...prev, [id]: true }));
      };
      img.onerror = () => {
        setImagesPreloaded(prev => ({ ...prev, [id]: true }));
      };
    });
  }, [isHomeReady]);

  useEffect(() => {
    if (!isHomeReady) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => clearInterval(timer);
  }, [isHomeReady, nextSlide]);

  useEffect(() => {
    if (!isHomeReady) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isHomeReady, nextSlide, prevSlide]);

  useEffect(() => {
    const el = appRef.current;
    if (!el) return;
    el.classList.remove(prevGradient.current);
    el.classList.add(slides[active].gradient);
    prevGradient.current = slides[active].gradient;
  }, [active]);

  const nextIndex = (active + 1) % slides.length;
  const prevIndex = (active - 1 + slides.length) % slides.length;

  // Show loader while loading
  if (loading) return <Loader onComplete={handleLoaderComplete} />;

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
        isHomeReady={isHomeReady}
        imagesPreloaded={imagesPreloaded}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}