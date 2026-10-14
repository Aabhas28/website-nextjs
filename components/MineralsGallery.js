"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Frames 11–19 are the Our Minerals section (≈ 10–18.5s from recording)
// 7 minerals from doc spec §6.1, images from live product pages via doc §6.2
const MINERALS_DATA = [
  {
    id: "soda-feldspar",
    index: "01",
    name: "Soda Feldspar",
    tag: "High Sodium Flux",
    formula: "Na₂O·Al₂O₃·6SiO₂",
    image: "/images/mactus/frame_12.jpg", // Frame ≈ 11s minerals gallery
    heroImage: "https://mactus.co.in/images/assets/Soda-FeldSpar.webp",
    mesh: "200–500 Mesh & Grains",
    purity: "Na₂O > 9.5% | Fe₂O₃ < 0.10%",
    description:
      "A primary vitrification agent that lowers the melting point of ceramic bodies. Essential for floor tiles, wall tiles, sanitaryware, and container glass.",
    applications: ["Ceramic Tiles", "Sanitaryware", "Glass Containers"],
  },
  {
    id: "potash-feldspar",
    index: "02",
    name: "Potash Feldspar",
    tag: "High-Temperature Flux",
    formula: "K₂O·Al₂O₃·6SiO₂",
    image: "/images/mactus/frame_13.jpg",
    heroImage: "https://mactus.co.in/images/assets/Potash-Feldspar.webp",
    mesh: "200–400 Mesh & Grains",
    purity: "K₂O > 11.5% | Fe₂O₃ < 0.08%",
    description:
      "Provides superior melt viscosity, preventing deformation during high-temperature firing. Imparts exceptional gloss and thermal resistance to glazes and porcelain.",
    applications: ["Porcelain Tiles", "Ceramic Glazes", "Electrical Insulators"],
  },
  {
    id: "talc",
    index: "03",
    name: "Talc",
    tag: "Ultra-Pure Magnesium Silicate",
    formula: "Mg₃Si₄O₁₀(OH)₂",
    image: "/images/mactus/frame_14.jpg",
    heroImage: "https://mactus.co.in/images/assets/Talc.webp",
    mesh: "300–700 Mesh Micronized",
    purity: "Whiteness > 94% | SiO₂ > 60%",
    description:
      "Natural hydrous magnesium silicate with lamellar structure, extreme softness, and thermal resistance for ceramics, cosmetics, and paints.",
    applications: ["Ceramics & Cordierite", "Cosmetics", "Paints & Plastics"],
  },
  {
    id: "kaolin-clay",
    index: "04",
    name: "Kaolin Clay",
    tag: "China Clay",
    formula: "Al₂Si₂O₅(OH)₄",
    image: "/images/mactus/frame_15.jpg",
    heroImage: "https://mactus.co.in/images/assets/China-Claty.webp",
    mesh: "300–500 Mesh Powder & Noodles",
    purity: "Al₂O₃ > 36% | High Plasticity",
    description:
      "Refined hydrous kaolinite possessing exceptional firing whiteness, fine particle size, and chemical inertness for fine china and coatings.",
    applications: ["Bone China & Tableware", "Sanitaryware Slip", "Paper Coating"],
  },
  {
    id: "quartz",
    index: "05",
    name: "Quartz",
    tag: "Crystalline Silica > 99.5%",
    formula: "SiO₂",
    image: "/images/mactus/frame_16.jpg",
    heroImage: "https://mactus.co.in/uploads/media/Quartz.webp",
    mesh: "100–500 Mesh Powder & Grits",
    purity: "SiO₂ > 99.5% | Fe₂O₃ < 0.03%",
    description:
      "High-purity silica providing high melting point, superior hardness, and low thermal expansion to ceramic bodies and engineered stone.",
    applications: ["Engineered Stone", "Ceramic Bodies", "Solar Glass"],
  },
  {
    id: "ball-clay",
    index: "06",
    name: "Ball Clay",
    tag: "High Plasticity Bond Clay",
    formula: "Al₂O₃·2SiO₂·2H₂O",
    image: "/images/mactus/frame_17.jpg",
    heroImage: "https://mactus.co.in/images/assets/Ball Clay.webp",
    mesh: "Shredded Lumps & 200–300 Mesh",
    purity: "High Green Strength | Fluidity",
    description:
      "Fine-grained sedimentary clay featuring extreme plasticity and high green bonding strength for shaping and extrusion.",
    applications: ["Sanitaryware Casting", "Wall & Floor Tiles", "Refractory Clays"],
  },
  {
    id: "mica",
    index: "07",
    name: "Mica",
    tag: "High-Aspect Ratio Sheet Silicate",
    formula: "KAl₂(AlSi₃O₁₀)(OH)₂",
    image: "/images/mactus/frame_18.jpg",
    heroImage: "https://mactus.co.in/uploads/media/Mica.webp",
    mesh: "Flakes & 100–325 Mesh Powder",
    purity: "Dielectric Strength | Heat Resistant",
    description:
      "Naturally laminated sheet silicate known for outstanding electrical insulation, high aspect ratio, and temperature stability.",
    applications: ["Welding Rods", "Automotive & Friction", "Insulation"],
  },
];

export default function MineralsGallery({ onOpenInquiry }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section header animate in
      gsap.from(headRef.current, {
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
      });

      // Pinned scroll sequence (doc spec §6.3 and §13 Pinned sequence)
      // Desktop only — scrolls through 7 minerals
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${MINERALS_DATA.length * 320}`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(
              MINERALS_DATA.length - 1,
              Math.floor(self.progress * MINERALS_DATA.length)
            );
            setActiveIndex(idx);
          },
        });
        return () => {};
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate expanded panel content when activeIndex changes
  useEffect(() => {
    const expanded = document.querySelector(".mineral-expanded-content");
    if (expanded) {
      gsap.from(expanded, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [activeIndex]);

  const activeMineral = MINERALS_DATA[activeIndex];

  return (
    <section className="section minerals-section" id="products" ref={sectionRef}>
      <div className="container">
        <div className="head center" ref={headRef}>
          <div className="eyebrow dot-eyebrow">
            <span className="dot-circle" />
            Our Minerals — Primary Animation
          </div>
          <h2 className="title">Our Minerals</h2>
          <div className="bar" aria-hidden="true" />
          <p className="copy">
            Cinematic mineral gallery — scroll to explore seven premium minerals. Each panel features a live image zoom and detailed specification reveal.
          </p>
        </div>

        {/* Navigation bar */}
        <div className="minerals-ctrl-bar">
          <div className="minerals-count">
            <span className="current-num">{activeMineral.index}</span>
            <span className="slash">/</span>
            <span className="total-num">07</span>
            <span className="active-mineral-label">{activeMineral.name}</span>
          </div>
          <div className="minerals-nav-arrows">
            <button
              type="button"
              className="gallery-arrow"
              onClick={() =>
                setActiveIndex((p) => (p - 1 + MINERALS_DATA.length) % MINERALS_DATA.length)
              }
              aria-label="Previous mineral"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="gallery-arrow"
              onClick={() =>
                setActiveIndex((p) => (p + 1) % MINERALS_DATA.length)
              }
              aria-label="Next mineral"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Multi-panel gallery */}
        <div className="minerals-strip-container" ref={galleryRef}>
          {MINERALS_DATA.map((mineral, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={mineral.id}
                className={`mineral-panel ${isActive ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={`View ${mineral.name}`}
              >
                <div
                  className="mineral-panel-bg"
                  style={{ backgroundImage: `url('${mineral.image}')` }}
                />
                <div className="mineral-panel-overlay" />

                {/* Collapsed label shown when not active */}
                <div className="mineral-collapsed-label">
                  <span className="panel-index">{mineral.index}</span>
                  <span className="panel-name">{mineral.name}</span>
                </div>

                {/* Expanded content on active panel */}
                {isActive && (
                  <div className="mineral-expanded-content">
                    <div className="mineral-pill-tag">{mineral.tag}</div>
                    <h3 className="mineral-heading">{mineral.name}</h3>
                    <div className="mineral-formula">{mineral.formula}</div>

                    <div className="mineral-spec-chips">
                      <div className="spec-chip">
                        <span className="spec-label">Mesh:</span>
                        <span className="spec-val">{mineral.mesh}</span>
                      </div>
                      <div className="spec-chip">
                        <span className="spec-label">Purity:</span>
                        <span className="spec-val">{mineral.purity}</span>
                      </div>
                    </div>

                    <p className="mineral-desc">{mineral.description}</p>

                    <div className="mineral-apps-row">
                      <span className="apps-lead">Applications:</span>
                      {mineral.applications.map((app) => (
                        <span key={app} className="app-badge">{app}</span>
                      ))}
                    </div>

                    <div className="mineral-actions">
                      <button
                        type="button"
                        className="btn btn-inquire-spec"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenInquiry) onOpenInquiry(mineral.name);
                        }}
                      >
                        Inquire Specifications
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick selector pills */}
        <div className="mineral-selector-pills">
          {MINERALS_DATA.map((mineral, idx) => (
            <button
              key={mineral.id}
              type="button"
              className={`selector-pill ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span className="pill-dot" />
              <span className="pill-text">{mineral.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
