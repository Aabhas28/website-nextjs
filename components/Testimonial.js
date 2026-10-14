"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Frames 24–28 map to Testimonials (≈ 24–28s from recording)
// Circular portraits enter independently from testimonial copy (doc §9)
const TESTIMONIALS = [
  {
    id: 0,
    quote:
      "Mactus Minerals has been our trusted partner for Soda and Potash Feldspar for several years. Their consistency in mesh size and mineral purity has elevated our vitrified tile manufacturing standards significantly. Deliveries are always prompt, and technical support is second to none.",
    name: "Khimjibhai Saidva",
    role: "Director",
    company: "Accord Vitrified Private Limited",
    avatar: "/images/assets/test1.webp",
  },
  {
    id: 1,
    quote:
      "The technical expertise and reliable supply chain of Mactus Minerals ensure our production lines run smoothly without disruption. Their wet-processed feldspar is truly best-in-class, exhibiting virtually zero iron contamination and unparalleled firing whiteness in our premium glaze batches.",
    name: "Vimalbhai Savsani",
    role: "Director",
    company: "Silktouch Vitrified Private Limited",
    avatar: "/images/assets/test2.webp",
  },
  {
    id: 2,
    quote:
      "Simpolo values quality and innovation above all else. Mactus Minerals matches our high expectations with premium mineral raw materials that meet strict international quality criteria. Their ability to deliver customized particle distributions is unmatched in the Indian mineral industry.",
    name: "Jitendra T. Aghara",
    role: "CMD",
    company: "Simpolo Group",
    avatar: "/images/assets/test3.webp",
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const sectionRef = useRef(null);
  const avatarsRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Circular portraits enter independently (doc §9)
      gsap.from(avatarsRef.current?.children, {
        scrollTrigger: {
          trigger: avatarsRef.current,
          start: "top 82%",
          once: true,
        },
        opacity: 0,
        scale: 0.7,
        y: 30,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
      });

      // Main quote box slides up
      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 82%",
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.85,
        ease: "power2.out",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setIsFading(false);
      }, 300);
    }, 7000);
    return () => clearInterval(timer);
  }, [index]);

  // Animate quote text on index change
  useEffect(() => {
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current.querySelector("blockquote"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [index]);

  const active = TESTIMONIALS[index];

  const switchTo = (idx) => {
    if (idx === index) return;
    setIsFading(true);
    setTimeout(() => {
      setIndex(idx);
      setIsFading(false);
    }, 300);
  };

  return (
    <section className="section testimonials-section" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="head center">
          <div className="eyebrow dot-eyebrow">
            <span className="dot-circle" />
            What Our Clients Say
          </div>
          <h2 className="title">Testimonials</h2>
          <div className="bar" aria-hidden="true" />
          <p className="copy">
            Endorsements from industry-leading tile manufacturers and ceramic pioneers who rely on Mactus Minerals for uncompromised raw material purity.
          </p>
        </div>

        <div className="testimonials-card-container">
          {/* Circular portraits row — enter independently */}
          <div className="testimonials-avatars-row" ref={avatarsRef}>
            {TESTIMONIALS.map((t, idx) => {
              const isActive = idx === index;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`testimonial-avatar-btn ${isActive ? "active" : ""}`}
                  onClick={() => switchTo(idx)}
                  aria-label={`Select testimonial by ${t.name}`}
                >
                  <div className="avatar-ring">
                    <img src={t.avatar} alt={t.name} className="avatar-photo" />
                  </div>
                  <span className="avatar-caption">{t.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Quote box — independent from portraits */}
          <div className={`testimonial-quote-box ${isFading ? "fading" : ""}`} ref={quoteRef}>
            <div className="quote-mark-icon" aria-hidden="true">&ldquo;</div>

            <blockquote className="quote-text">{active.quote}</blockquote>

            <div className="quote-author-info">
              <div className="author-name-row">
                <h3 className="author-name">{active.name}</h3>
                <span className="author-dot">&bull;</span>
                <span className="author-role">{active.role}</span>
              </div>
              <div className="author-company-row">
                <span className="author-company">{active.company}</span>
              </div>
            </div>

            <div className="testimonial-dashes">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`dash-pill ${idx === index ? "active" : ""}`}
                  onClick={() => switchTo(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  <span className="dash-fill" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
