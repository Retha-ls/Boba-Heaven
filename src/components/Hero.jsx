import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({
  slide, nextSlide, prevSlide,
  nextImage, prevImage,
  direction, activeIndex, total, goToSlide,
}) {
  const descRef      = useRef(null);
  const priceRef     = useRef(null);
  const imgRef       = useRef(null);
  const detailRef    = useRef(null);
  const containerRef = useRef(null);
  const heroRef      = useRef(null);

  // GSAP entrance animation
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const img       = imgRef.current;
    const price     = priceRef.current;
    const desc      = descRef.current;
    const detail    = detailRef.current;
    const container = containerRef.current;

    gsap.killTweensOf([img, price, desc, detail, container]);

    const isNext  = direction === "next";
    const xOffset = isNext ? 280 : -280;

    gsap.set(img, {
      x: xOffset,
      scale: 0.55,
      opacity: 0,
      filter: "blur(12px)",
      rotate: isNext ? 10 : -10,
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(img, {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      rotate: 0,
      duration: 0.72,
      ease: "back.out(0.7)",
      onComplete: () => {
        gsap.set(img, { clearProps: "x,rotate,scale,filter" });
      },
    })
    .fromTo(
      price,
      { opacity: 0, x: isNext ? 30 : -30 },
      { opacity: 1, x: 0, duration: 0.45 },
      "0.12"
    )
    .fromTo(
      [desc, detail],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.38, stagger: 0.08 },
      "0.18"
    );

    gsap.fromTo(container,
      { scale: 0.96, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.72, ease: "power2.out" }
    );

  }, [slide, direction]);

  // Non-passive touch listener to allow preventDefault
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let startX  = null;
    let startY  = null;
    let endX    = null;
    let dragging = false;

    const onStart = (e) => {
      startX   = e.targetTouches[0].clientX;
      startY   = e.targetTouches[0].clientY;
      endX     = null;
      dragging = false;
    };

    const onMove = (e) => {
      const dx = Math.abs(e.targetTouches[0].clientX - startX);
      const dy = Math.abs(e.targetTouches[0].clientY - startY);
      if (!dragging && dx > dy + 6) dragging = true;
      if (dragging) {
        e.preventDefault();
        endX = e.targetTouches[0].clientX;
      }
    };

    const onEnd = () => {
      if (!dragging || endX === null) return;
      const delta = startX - endX;
      if (Math.abs(delta) > 48) {
        delta > 0 ? nextSlide() : prevSlide();
      }
      startX   = null;
      endX     = null;
      dragging = false;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove",  onMove,  { passive: false });
    el.addEventListener("touchend",   onEnd,   { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="hero" ref={heroRef}>

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

      {/* PREV */}
      <div className="prev-preview" onClick={prevSlide}>
        <img src={prevImage} className="prev-boba" alt="previous drink" loading="lazy" decoding="async" />
        <button className="arrow" aria-label="Previous drink">←</button>
      </div>

      {/* NEXT */}
      <div className="next-preview" onClick={nextSlide}>
        <img src={nextImage} className="next-boba" alt="next drink" loading="lazy" decoding="async" />
        <button className="arrow" aria-label="Next drink">→</button>
      </div>

      {/* DOTS */}
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
        <a href="https://www.tiktok.com/%40bobaheaven_ls?_r=1&_t=ZS-94A8bTnWFbo" aria-label="TikTok" target="_blank" rel="noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/bobaheavenls?igsh=MXRnZXhtZHlweXdoNg==" aria-label="Instagram" target="_blank" rel="noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
          </svg>
        </a>
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