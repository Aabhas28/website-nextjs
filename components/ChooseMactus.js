"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Frames 19–21 map to Choose Mactus section (≈ 18.5–20.5s)
// Vision/Mission/Achievement cards stagger entrance
const CARDS_DATA = [
  {
    id: "vision",
    title: "Vision",
    badge: "GLOBAL BENCHMARK",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    lead: "To be the globally recognized benchmark in mineral processing and supply, setting industry standards for purity, technological advancement, and sustainable mining practices.",
    details: "Setting new standards through automated wet classification, zero-impurity magnetic separation, and dedicated international customer partnerships.",
  },
  {
    id: "mission",
    title: "Mission",
    badge: "SUPERIOR QUALITY",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    lead: "Delivering consistently superior refined minerals with uncompromising quality control, state-of-the-art wet-type processing, and dedicated customer service to foster long-term partnerships.",
    details: "Every batch undergoes rigorous mesh sizing and chemical assay validation to guarantee flawless kiln firing and surface smoothness.",
  },
  {
    id: "achievements",
    title: "Achievements",
    badge: "INDIA'S 1ST WET 200 MESH",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
        <path d="M18 4H6v7a6 6 0 0 0 12 0V4z" />
      </svg>
    ),
    lead: "India's first premium-quality 200 Mesh Feldspar Powder through wet-type processing. India's largest wet-type processing plant, serving premier vitrified tile manufacturers.",
    details: "550,000+ TPA production capacity. 68+ whiteness index for Soda/Potash Feldspar mesh powders. Products in lumps, chips and powder forms.",
  },
];

export default function ChooseMactus() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const bannerRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section heading fade up
      gsap.from(headRef.current, {
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 35,
        duration: 0.85,
        ease: "power2.out",
      });

      // Achievement banner clip-path reveal (reuses Home vertical-strip logic)
      gsap.from(bannerRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 82%",
          once: true,
        },
        opacity: 0,
        scaleX: 0.9,
        duration: 0.85,
        ease: "power3.out",
      });

      // Card stagger — opacity 0→1 + translateY 40→0 (doc spec §7, §13)
      gsap.from(cardsRef.current?.children, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-gray choose-mactus-section" id="vision" ref={sectionRef}>
      <div className="container">
        <div className="head center" ref={headRef}>
          <div className="eyebrow dot-eyebrow">
            <span className="dot-circle" />
            Choose Mactus
          </div>
          <h2 className="title">Choose Mactus</h2>
          <div className="section-pill-tag">YOUR LEADING MINERAL SUPPLIER</div>
          <div className="bar" aria-hidden="true" />
          <p className="copy">
            Delivering consistently superior refined minerals with uncompromising quality control and India&apos;s premier wet-type classification facilities.
          </p>
        </div>

        {/* Achievement highlight banner */}
        <div className="achievement-highlight-banner" ref={bannerRef}>
          <div className="achievement-icon-wrap">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.5-6.2 4.5 2.3-7.1-6.1-4.5h7.6z" />
            </svg>
          </div>
          <div className="achievement-text">
            <span className="achievement-title">Achievement Highlight</span>
            <p className="achievement-desc">
              India&apos;s first premium-quality <strong>200 Mesh Feldspar Powder</strong> through wet-type processing — India&apos;s largest wet-type processing plant with <strong>550,000+ TPA</strong> capacity.
            </p>
          </div>
        </div>

        {/* Vision / Mission / Achievements cards */}
        <div className="cards-grid" ref={cardsRef}>
          {CARDS_DATA.map((card) => (
            <article className="mactus-card" key={card.id}>
              <div className="card-top">
                <div className="card-icon-box">{card.icon}</div>
                <span className="card-badge">{card.badge}</span>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-lead">{card.lead}</p>
              <p className="card-details">{card.details}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
