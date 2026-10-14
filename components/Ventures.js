"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Frames 21–24 map to Mactus Ventures (≈ 20.5–24s)
const VENTURES = [
  {
    name: "A&J MICRONS Pvt. Ltd",
    specialty: "Micronization & Ultrafine Grinding",
    desc: "Specialized in precision micronization, high-efficiency air classification, and custom mesh distributions for premier ceramic bodies and glazes.",
    tag: "MICRONIZATION",
    accent: "#2e3d7c",
  },
  {
    name: "A&J MINECHEM Pvt. Ltd",
    specialty: "Mining & Chemical Analysis",
    desc: "Managing extensive captive mineral leases across Rajasthan & Gujarat with rigorous raw assay testing and selective extraction.",
    tag: "EXTRACTION",
    accent: "#1c7ed6",
  },
  {
    name: "A&J MICRONS (BHARAT) Pvt. Ltd",
    specialty: "Pan-India Logistics & Supply",
    desc: "Operating an expansive national distribution network, strategic buffer warehouses, and rapid delivery for high-volume ceramic manufacturers.",
    tag: "DOMESTIC SUPPLY",
    accent: "#c89d53",
  },
  {
    name: "MACTUS MINERAL LLP",
    specialty: "Wet-Type Processing & Global Export",
    desc: "Our flagship facility in Morbi housing India's largest wet-type processing plant, pioneering 200 Mesh Feldspar with worldwide sea shipments.",
    tag: "FLAGSHIP",
    accent: "#2e3d7c",
    isMain: true,
  },
];

export default function Ventures() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      // Logo/cards slide upward with stagger (doc spec §11 + §13 Logo reveal 0.4–0.7s)
      gsap.from(cardsRef.current?.children, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section ventures-section" id="ventures" ref={sectionRef}>
      <div className="container">
        <div className="head center" ref={headRef}>
          <div className="eyebrow dot-eyebrow">
            <span className="dot-circle" />
            Mactus Ventures
          </div>
          <h2 className="title">Mactus Ventures</h2>
          <div className="section-pill-tag">A COLLECTIVE FORCE</div>
          <div className="bar" aria-hidden="true" />
          <p className="copy">
            A collaborative synergy of specialized mineral entities uniting quarrying, chemical micronization, high-capacity wet processing, and global logistics under one powerful banner.
          </p>
        </div>

        <div className="ventures-grid" ref={cardsRef}>
          {VENTURES.map((item, idx) => (
            <div className={`venture-card ${item.isMain ? "venture-card-main" : ""}`} key={item.name}>
              <div className="venture-header">
                <span className="venture-tag" style={{ background: item.accent }}>{item.tag}</span>
                <div className="venture-indicator" />
              </div>

              <div className="venture-brand-area">
                {item.isMain ? (
                  <img
                    src="/images/assets/Mactus_Logo.svg"
                    alt="Mactus Mineral LLP"
                    className="venture-logo-img"
                  />
                ) : (
                  <div className="venture-text-logo">
                    <span className="logo-acronym">A&J</span>
                    <span className="logo-title">{item.name.split(" ")[1] || "MICRONS"}</span>
                  </div>
                )}
              </div>

              <h3 className="venture-name">{item.name}</h3>
              <span className="venture-specialty">{item.specialty}</span>
              <p className="venture-desc">{item.desc}</p>

              <div className="venture-footer">
                <span className="venture-badge">Part of Mactus Group</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
