"use client";

export default function Footer({ onOpenInquiry }) {
  const quickLinks = [
    { label: "Company Profile", href: "#about" },
    { label: "Achievements", href: "#vision" },
    { label: "Quality Standards", href: "#vision" },
    { label: "Plant Photos", href: "#ventures" },
    { label: "Clients", href: "#testimonials" },
    { label: "Export Divisions", href: "#contact" },
    { label: "Download Catalogue", href: "#contact" },
    { label: "Social Media", href: "#contact" },
    { label: "Events & Exhibition", href: "#contact" },
    { label: "Contact Us", href: "#contact" }
  ];

  const products = [
    { label: "Soda Feldspar", href: "#products" },
    { label: "Potash Feldspar", href: "#products" },
    { label: "Talc", href: "#products" },
    { label: "Kaolin Clay", href: "#products" },
    { label: "Quartz", href: "#products" },
    { label: "Ball Clay", href: "#products" },
    { label: "Mica", href: "#products" }
  ];

  return (
    <footer className="footer-site" id="contact">
      {/* Pre-footer Call to Action */}
      <div className="pre-footer-cta">
        <div className="container pre-footer-container">
          <div className="cta-left">
            <span className="pre-cta-eyebrow">READY TO ELEVATE YOUR FORMULATION?</span>
            <h3 className="pre-cta-title">
              Request Samples or Customized Mesh Specifications
            </h3>
            <p className="pre-cta-sub">
              Our technical engineering team will assist with chemical assays, bulk shipping schedules, and plant visits.
            </p>
          </div>
          <div className="cta-right">
            <button
              type="button"
              className="btn btn-cta-light"
              onClick={onOpenInquiry}
            >
              Request Spec Sheet & Quote
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        {/* Column 1: Brand & Overview */}
        <div className="footer-col footer-col-brand">
          <a href="#top" className="footer-logo-link" aria-label="Mactus Minerals">
            <img
              src="/images/assets/Matus_Logo_Alt.svg"
              alt="Mactus Minerals"
              width={200}
              height={58}
              className="footer-logo-img"
            />
          </a>
          <p className="footer-brand-desc">
            Mactus Minerals LLP specializes in refined Soda and Potash Feldspar, alongside Talc, Kaolin Clay, Quartz, Ball Clay, and Mica. Home to India’s largest wet-type processing plant in Morbi, Gujarat, delivering high-purity minerals across domestic and international markets.
          </p>

          <div className="footer-cert-badges">
            <span className="cert-badge">20+ Years Experience</span>
            <span className="cert-badge">Largest Wet-Type Facility</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links-grid">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="footer-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Products */}
        <div className="footer-col">
          <h4 className="footer-col-title">Products</h4>
          <ul className="footer-links-list">
            {products.map((prod) => (
              <li key={prod.label}>
                <a href={prod.href} className="footer-link">
                  &bull; {prod.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Factory Address & Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Factory & Office</h4>
          <div className="footer-contact-info">
            <div className="contact-row">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="contact-icon">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <address className="contact-address">
                <strong>Factory Address:</strong><br />
                8-A National Highway, Sokhada Road,<br />
                Vaghpur (Piludi), Morbi - 363642,<br />
                Gujarat, India.
              </address>
            </div>

            <div className="contact-row">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="contact-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <a href="tel:+919909912345" className="contact-link">+91 99099 12345</a> /{" "}
                <a href="tel:+919825267890" className="contact-link">+91 98252 67890</a>
              </div>
            </div>

            <div className="contact-row">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="contact-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div>
                <a href="mailto:info@mactus.co.in" className="contact-link">info@mactus.co.in</a><br />
                <a href="mailto:sales@mactus.co.in" className="contact-link">sales@mactus.co.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-container">
          <div className="copyright-text">
            &copy; {new Date().getFullYear()} Mactus Mineral LLP. All Rights Reserved. &bull; Registered in Morbi, Gujarat, India.
          </div>
          <div className="footer-legal-links">
            <a href="#about">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#about">Terms of Supply</a>
            <span>&bull;</span>
            <a href="#about">Quality Certifications</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
