"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Frames 8–10 map to About section per doc (≈ 7–10s) — blueprint watermark from frame 9
export default function About({ onOpenInquiry }) {
  const sectionRef = useRef(null);
  const imageARef = useRef(null);
  const imageBRef = useRef(null);
  const textRef = useRef(null);
  const pillarsRef = useRef(null);

  const steps = [
    {
      step: "01",
      title: "Mining",
      desc: "Captive mining operations accessing high-grade crude deposits across rich geological reserves in Rajasthan & Gujarat.",
    },
    {
      step: "02",
      title: "Processing",
      desc: "India's largest wet-type processing facility engineered for high-purity 200 Mesh Feldspar with magnetic separation.",
    },
    {
      step: "03",
      title: "Quality Control",
      desc: "Rigorous laboratory testing for chemical purity, low iron content, uniform mesh size, and batch consistency.",
    },
    {
      step: "04",
      title: "Global Distribution",
      desc: "Seamless logistics servicing Morbi's ceramic manufacturers and international container export shipments worldwide.",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Split image/text reveal for the main profile section (doc spec §5.1)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Text enters from left, images from right (clip-path reveal)
      tl.from(textRef.current, { opacity: 0, x: -60, duration: 1.0 })
        .from(
          imageARef.current,
          {
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
            duration: 1.3,
            ease: "power3.inOut",
          },
          "-=0.6"
        )
        .from(
          imageBRef.current,
          {
            opacity: 0,
            clipPath: "inset(100% 0 0 0)",
            duration: 1.0,
            ease: "power3.inOut",
          },
          "-=0.8"
        );

      // Pillar cards stagger up (card stagger 80–150ms per spec §13)
      gsap.from(pillarsRef.current?.children, {
        scrollTrigger: {
          trigger: pillarsRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.75,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      {/* Blueprint watermark — frame_09 timeframe (≈ 8s) subtle background */}
      <div className="blueprint-watermark" aria-hidden="true">
        <img
          src="/images/mactus/frame_09.jpg"
          alt=""
          className="blueprint-img"
        />
        <div className="blueprint-grid-overlay" />
      </div>

      <div className="container about-inner">
        {/* Left: text content */}
        <div className="about-text" ref={textRef}>
          <div className="eyebrow dot-eyebrow">
            <span className="dot-circle" />
            20+ Years Expert Mineral Supplier
          </div>
          <h2 className="about-headline">
            Leading the Way<br />
            <span className="about-headline-accent">in Ceramic Industry</span>
          </h2>
          <div className="section-pill-tag">ABOUT MACTUS</div>
          <p className="about-lead">
            Mactus specializes in refined <strong>Soda and Potash Feldspar</strong> and describes 20+ years of collective ceramic-industry expertise, alongside <strong>Talc, Kaolin Clay, Quartz, Ball Clay and Mica</strong>.
          </p>
          <p className="about-body">
            From initial quarry mining to state-of-the-art wet processing and global distribution, we engineer high-purity minerals with uncompromising quality standards for tile, sanitaryware, glass, and specialty industries.
          </p>
          <div className="about-actions">
            <a href="#products" className="btn btn-navy">Our Minerals</a>
            <button type="button" className="btn btn-outline" onClick={onOpenInquiry}>
              Company Profile
            </button>
          </div>
        </div>

        {/* Right: images stacked with clip-path reveal */}
        <div className="about-images-col">
          <div className="about-img-primary-wrap" ref={imageARef}>
            <img
              src="https://mactus.co.in/images/aboutus-1.webp"
              alt="Mactus mining and processing facility"
              className="about-img-primary"
            />
            <div className="about-img-badge">
              <span className="badge-num">550,000+</span>
              <span className="badge-lbl">TPA Production Capacity</span>
            </div>
          </div>
          <div className="about-img-secondary-wrap" ref={imageBRef}>
            <img
              src="https://mactus.co.in/images/aboutus-2.webp"
              alt="Mactus processing conveyor"
              className="about-img-secondary"
            />
          </div>
        </div>
      </div>

      {/* 4-step process flow */}
      <div className="container">
        <div className="pillars-grid" ref={pillarsRef}>
          {steps.map((item) => (
            <div className="pillar-card" key={item.step}>
              <div className="pillar-header">
                <span className="pillar-step">{item.step}</span>
                <span className="flow-arrow">→</span>
              </div>
              <h3 className="pillar-title">{item.title}</h3>
              <p className="pillar-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
