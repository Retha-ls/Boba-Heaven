import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Hero({
  slide,
  nextSlide,
  prevSlide,
  nextImage,
  prevImage,
  direction,
  activeIndex,
  total,
  goToSlide,
}) {
  const descRef   = useRef(null);
  const priceRef  = useRef(null);
  const imgRef    = useRef(null);
  const detailRef = useRef(null);
  const containerRef = useRef(null);

  // Touch/swipe state
  const touchStartX = useRef(null);
  const touchEndX   = useRef(null);

  useEffect(() => {
    // Kill any ongoing animations
    gsap.killTweensOf(imgRef.current);
    
    // Get the preview element positions
    const previewSrc = direction === "next" ? nextImage : prevImage;
    const previewElement = direction === "next" 
      ? document.querySelector('.next-boba') 
      : document.querySelector('.prev-boba');
    
    // Get the center position where the image should end up
    const centerRect = imgRef.current.getBoundingClientRect();
    const startX = direction === "next" 
      ? window.innerWidth - 100  // Start from right side
      : 100;                      // Start from left side
    
    // Set initial position at the preview location
    gsap.set(imgRef.current, {
      x: direction === "next" ? 400 : -400,
      y: 0,
      scale: 0.3,
      opacity: 0,
      filter: "blur(16px)",
      rotate: direction === "next" ? 15 : -15
    });
    
    const tl = gsap.timeline();
    
    // Animate the main image coming from the side
    tl.to(imgRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      rotate: 0,
      duration: 0.8,
      ease: "back.out(0.6)",
      clearProps: "transform"
    })
    .fromTo(priceRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.4"
    )
    .fromTo([descRef.current, detailRef.current],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, "-=0.3"
    );
    
    // Add a subtle bounce to the container
    gsap.fromTo(containerRef.current,
      { scale: 0.95 },
      { scale: 1, duration: 0.6, ease: "back.out(0.5)" }
    );
    
  }, [slide, direction, nextImage, prevImage]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current   = null;
  };

  return (
    <div
      className="hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* LEFT */}
      <div className="left">
        <p className="eyebrow">Premium Bubble Tea</p>
        <h1 className="title">
          Freshly Crafted<br />Boba For Every<br />Mood
        </h1>
        <p ref={descRef} className="desc">{slide.description}</p>
      </div>

      {/* CENTER */}
      <div ref={containerRef} className="center">
        <img
          ref={imgRef}
          src={slide.image}
          className="boba"
          alt="boba drink"
          loading="eager"
          decoding="async"
        />
        <span className="caption">{slide.caption}</span>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div ref={priceRef} className="price">{slide.price}</div>
        <p ref={detailRef} className="details">{slide.tagline}</p>
        <button className="shop-btn">SHOP →</button>
      </div>

      {/* PREV — desktop only */}
      <div className="prev-preview" onClick={prevSlide}>
        <img
          src={prevImage}
          className="prev-boba"
          alt="previous drink"
          loading="lazy"
          decoding="async"
        />
        <button className="arrow" aria-label="Previous drink">←</button>
      </div>

      {/* NEXT — desktop only */}
      <div className="next-preview" onClick={nextSlide}>
        <img
          src={nextImage}
          className="next-boba"
          alt="next drink"
          loading="lazy"
          decoding="async"
        />
        <button className="arrow" aria-label="Next drink">→</button>
      </div>

      {/* DOTS — visible on mobile, hidden on desktop */}
      <div className="dots">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={`dot ${i === activeIndex ? "dot-active" : ""}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* SOCIALS */}
      <div className="socials">
        {/* TikTok */}
        <a href="https://www.tiktok.com/%40bobaheaven_ls?_r=1&_t=ZS-94A8bTnWFbo" aria-label="TikTok" target="_blank" rel="noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/bobaheavenls?igsh=MXRnZXhtZHlweXdoNg==" aria-label="Instagram" target="_blank" rel="noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
          </svg>
        </a>

        {/* WhatsApp */}
        <a href="https://wa.link/tsuzjs" aria-label="WhatsApp" target="_blank" rel="noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 0 1-4.078-1.123l-.292-.174-3.117.884.846-3.083-.189-.308A7.946 7.946 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}