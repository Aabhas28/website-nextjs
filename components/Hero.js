"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Frames 01–07 are the Hero animation timeframe (0–7s from recording)
// Each stage maps to doc spec: Factory → Mineral reveal → Vertical strip → Headline change
const HERO_STAGES = [
  {
    id: 0,
    tagline: "MINING & PROCESSING EXCELLENCE",
    headline: "From Deep Within\nthe Earth to You",
    subhead: "Nature's Finest Minerals",
    subtitle:
      "Over two decades of precision mineral extraction and refinement powering world-class ceramic manufacturing.",
    image: "/images/mactus/frame_01.jpg", // ≈ 0s factory opening
  },
  {
    id: 1,
    tagline: "PURITY & QUALITY REDEFINED",
    headline: "Nature's Finest\nMinerals",
    subhead: "Premium Wet-Processed Excellence",
    subtitle:
      "Refined Soda and Potash Feldspar, Talc, Kaolin Clay, Quartz, Ball Clay and Mica engineered for superior ceramic performance.",
    image: "/images/mactus/frame_03.jpg", // ≈ 2s mineral imagery reveals
  },
  {
    id: 2,
    tagline: "INDIA'S LARGEST WET-TYPE PLANT",
    headline: "Each Piece a Link\nto the Past",
    subhead: "India's First 200 Mesh Wet Process",
    subtitle:
      "India's first premium-quality 200 Mesh Feldspar Powder through wet-type processing at our advanced Morbi facility.",
    image: "/images/mactus/frame_06.jpg", // ≈ 5s vertical strip transition
  },
];

export default function Hero({ onExploreClick }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [nextStage, setNextStage] = useState(null);
  const stripsRef = useRef(null);
  const bgLayersRef = useRef([]);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const subtitleRef = useRef(null);
  const isAnimating = useRef(false);
  const stageTimerRef = useRef(null);

  // Hero intro timeline on mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-tagline-wrap", { opacity: 0, y: 20, duration: 0.7, delay: 0.3 })
      .from(".hero-title", { opacity: 0, y: 40, duration: 0.9, clipPath: "inset(0 0 100% 0)" }, "-=0.3")
      .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
      .from(".hero-cta-group", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
      .from(".hero-metrics", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
      .from(".stage-indicators", { opacity: 0, duration: 0.5 }, "-=0.2");
  }, []);

  // Auto advance stages
  useEffect(() => {
    stageTimerRef.current = setInterval(() => {
      if (!isAnimating.current) {
        const next = (currentStage + 1) % HERO_STAGES.length;
        doTransition(next);
      }
    }, 5500);
    return () => clearInterval(stageTimerRef.current);
  }, [currentStage]);

  function doTransition(targetIdx) {
    if (isAnimating.current || targetIdx === currentStage) return;
    isAnimating.current = true;

    const strips = stripsRef.current?.querySelectorAll(".curtain-strip");
    if (!strips) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStage(targetIdx);
        isAnimating.current = false;
      },
    });

    // Stage D: vertical strips sweep down (power3.inOut, 0.8–1.2s)
    tl.set(strips, { scaleY: 0, transformOrigin: "top center" })
      .to(strips, {
        scaleY: 1,
        duration: 0.6,
        stagger: { amount: 0.55, from: "start" },
        ease: "power3.inOut",
      })
      .call(() => setNextStage(targetIdx))
      // Stage E: strips retract from bottom
      .set(strips, { transformOrigin: "bottom center" })
      .to(strips, {
        scaleY: 0,
        duration: 0.55,
        stagger: { amount: 0.45, from: "end" },
        ease: "power3.inOut",
      });

    // Headline crossfade (0.7–1.0s, power2.out)
    gsap.timeline()
      .to([headlineRef.current, subheadRef.current, subtitleRef.current], {
        opacity: 0,
        y: -18,
        duration: 0.35,
        ease: "power2.in",
      })
      .then(() => {
        // Reveal after strip covers the frame (halfway)
        gsap.fromTo(
          [headlineRef.current, subheadRef.current, subtitleRef.current],
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }
        );
      });
  }

  const handleManualChange = (idx) => {
    clearInterval(stageTimerRef.current);
    doTransition(idx);
    stageTimerRef.current = setInterval(() => {
      if (!isAnimating.current) {
        const next = (currentStage + 1) % HERO_STAGES.length;
        doTransition(next);
      }
    }, 5500);
  };

  const activeData = HERO_STAGES[currentStage];

  return (
    <section className="hero-section" id="top">
      {/* Background image layers — all 3 stacked, active gets opacity 1 */}
      <div className="hero-background-stack">
        {HERO_STAGES.map((stage, idx) => (
          <div
            key={stage.id}
            className={`hero-bg-layer ${idx === currentStage ? "active" : ""}`}
            style={{ backgroundImage: `url('${stage.image}')` }}
          >
            <div className="hero-dark-overlay" />
          </div>
        ))}
      </div>

      {/* 12 vertical curtain strips */}
      <div ref={stripsRef} className="hero-strips-curtain" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="curtain-strip" />
        ))}
      </div>

      {/* Content */}
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-tagline-wrap">
            <span className="hero-dot-indicator" />
            <span className="hero-tagline">{activeData.tagline}</span>
          </div>

          <h1 className="hero-title" ref={headlineRef}>
            {activeData.headline.split("\n").map((line, i) => (
              <span key={i} className={i === 1 ? "title-row-accent" : "title-row-1"}>
                {line}
              </span>
            ))}
          </h1>

          <div className="hero-subhead" ref={subheadRef}>{activeData.subhead}</div>

          <p className="hero-subtitle" ref={subtitleRef}>{activeData.subtitle}</p>

          <div className="hero-cta-group">
            <a href="#products" className="btn btn-hero-primary" onClick={onExploreClick}>
              Explore Our Minerals
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#about" className="btn btn-hero-outline">About Mactus</a>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">20+</span>
              <span className="metric-label">Years Ceramic Expertise</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-number">200</span>
              <span className="metric-label">Mesh Wet Process Purity</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-number">#1</span>
              <span className="metric-label">Largest Wet-Type Facility</span>
            </div>
          </div>
        </div>

        {/* Stage pagination */}
        <div className="hero-stage-pagination">
          <div className="stage-indicators">
            {HERO_STAGES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`stage-dot ${idx === currentStage ? "active" : ""}`}
                onClick={() => handleManualChange(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className="dot-index">0{idx + 1}</span>
                <span className="dot-progress-bar" />
              </button>
            ))}
          </div>

          <a href="#about" aria-label="Scroll to About section" className="scroll-cue-link">
            <span className="scroll-cue-text">SCROLL DOWN</span>
            <div className="scroll-arrow-anim">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
