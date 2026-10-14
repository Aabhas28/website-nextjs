"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header({ onOpenInquiry }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setOpen(false);
    setActiveDropdown(null);
  };

  const navLinks = [
    {
      label: "About",
      href: "#about",
      subItems: [
        { label: "Company Profile", href: "#about" },
        { label: "Achievements", href: "#vision" },
        { label: "Quality Standards", href: "#vision" },
        { label: "Plant Photos", href: "#ventures" }
      ]
    },
    {
      label: "Products",
      href: "#products",
      subItems: [
        { label: "Soda Feldspar", href: "#products" },
        { label: "Potash Feldspar", href: "#products" },
        { label: "Talc", href: "#products" },
        { label: "Kaolin Clay", href: "#products" },
        { label: "Quartz", href: "#products" },
        { label: "Ball Clay", href: "#products" },
        { label: "Mica", href: "#products" }
      ]
    },
    { label: "Clients", href: "#testimonials" },
    { label: "Ventures", href: "#ventures" },
    { label: "Applications", href: "#applications" },
    { label: "Export", href: "#contact" },
    { label: "Catalogue", href: "#contact" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Top CTA announcement bar */}
      <div className="cta-bar">
        <div className="container">
          <div className="cta-info">
            <span className="cta-badge">EXPERTISE</span>
            <span className="cta-text">
              20+ Years Expert Mineral Supplier &bull; India’s Largest Wet-Type Processing Plant
            </span>
          </div>
          <div className="cta-actions">
            <div className="lang-selector" title="Language Translation">
              <img
                src="/images/assets/g_translate.svg"
                alt="Translate"
                width={18}
                height={18}
                className="lang-icon"
              />
              <span className="lang-text">EN / English</span>
            </div>
            <a href="tel:+919909912345" className="cta-phone">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>+91 99099 12345</span>
            </a>
            <button
              type="button"
              className="cta-btn"
              onClick={onOpenInquiry}
              id="top-inquire-btn"
            >
              Inquire Now
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main site header */}
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-container">
          <a className="logo-brand" href="#top" aria-label="Mactus Minerals Home">
            <img
              src="/images/assets/Mactus_Logo.svg"
              alt="Mactus Minerals"
              width={180}
              height={52}
              className="brand-logo"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <div
                key={item.label}
                className="nav-item-wrapper"
                onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className={`nav-link ${activeDropdown === item.label ? "active-link" : ""}`}
                >
                  {item.label}
                  {item.subItems && (
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" strokeWidth="2.5" className="chevron">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </a>

                {item.subItems && activeDropdown === item.label && (
                  <div className="dropdown-menu">
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="dropdown-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Header Controls */}
          <div className="header-actions">
            <button
              type="button"
              className="quote-pill-btn"
              onClick={onOpenInquiry}
            >
              Get In Touch
            </button>

            <button
              className="icon-btn mobile-toggle"
              type="button"
              aria-label="Toggle Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <nav className={`menu-panel ${open ? "open" : ""}`} aria-label="Mobile Navigation">
          <div className="container mobile-nav-content">
            {navLinks.map((link) => (
              <div key={link.label} className="mobile-item">
                <a
                  href={link.href}
                  className="mobile-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
                {link.subItems && (
                  <div className="mobile-sublinks">
                    {link.subItems.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="mobile-sublink"
                        onClick={closeMenu}
                      >
                        &bull; {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mobile-cta-wrap">
              <button
                type="button"
                className="btn btn-full"
                onClick={() => {
                  closeMenu();
                  if (onOpenInquiry) onOpenInquiry();
                }}
              >
                Inquire Now
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
