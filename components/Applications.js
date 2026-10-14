"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Frame 28–29 maps to Applications section (≈ 28–29s from recording)
const APPLICATIONS = [
  { name: "Ceramic", icon: "/images/assets/Ceramic.webp", desc: "Wall tiles, floor tiles, vitrified bodies, and structural clay." },
  { name: "Cosmetic", icon: "/images/assets/Cometics.webp", desc: "Ultra-pure cosmetic talc, foundations, and skin care powders." },
  { name: "Electronics", icon: "/images/assets/Electronics.webp", desc: "Dielectric substrates, semiconductor fillers, and high-frequency insulators." },
  { name: "Fertilizer", icon: "/images/assets/fertilizer.webp", desc: "Anti-caking agents, soil conditioners, and mineral carriers." },
  { name: "Glass", icon: "/images/assets/Glass.webp", desc: "Container glass, flat glass, optical fibers, and fiberglass insulation." },
  { name: "Industrial Lubricants", icon: "/images/assets/industrial-lubricants.webp", desc: "Solid lubricant additives, greases, and high-temperature thermal barriers." },
  { name: "Insulation", icon: "/images/assets/Insulation.webp", desc: "Thermal barrier coatings, refractory castables, and mica sheets." },
  { name: "Paper", icon: "/images/assets/Paper.webp", desc: "High-whiteness mineral coatings, filler clays, and gloss enhancers." },
  { name: "Porcelain", icon: "/images/assets/Porcelain.webp", desc: "Fine bone china, tableware, high-tension electrical insulators, and sanitary slip." },
];

export default function Applications() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: "top 80%", once: true },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      // Application icons fade from opacity 0 and scale from 0.96 → 1, staggered 50–100ms
      gsap.from(gridRef.current?.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        scale: 0.88,
        y: 25,
        duration: 0.6,
        stagger: { amount: 0.7, from: "start" },
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-gray applications-section" id="applications" ref={sectionRef}>
      <div className="container">
        <div className="head center" ref={headRef}>
          <div className="eyebrow dot-eyebrow">
            <span className="dot-circle" />
            Versatile Industrial Solutions
          </div>
          <h2 className="title">Best Suited Applications</h2>
          <div className="bar" aria-hidden="true" />
          <p className="copy">
            Our versatile range of refined Soda Feldspar, Potash Feldspar, Talc, Kaolin Clay, Quartz, Ball Clay, and Mica powers vital industrial applications across the globe.
          </p>
        </div>

        <div className="applications-grid" ref={gridRef}>
          {APPLICATIONS.map((item) => (
            <div className="app-card" key={item.name}>
              <div className="app-icon-frame">
                <img src={item.icon} alt={item.name} className="app-icon-img" />
              </div>
              <h3 className="app-title">{item.name}</h3>
              <p className="app-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
