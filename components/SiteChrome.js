"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Icon } from "./ui";
import { PRODUCTS, QUICK_LINKS } from "./site-data";

const NAV = [
  ["About", "/company-profile", QUICK_LINKS.slice(0, 4)],
  ["Products", "/product/soda-feldspar", PRODUCTS.map(([name, slug]) => [name, `/product/${slug}`])],
  ["Clients", "/client"],
  ["Export", "/export"],
  ["Catalogue", "/catalogue"],
  ["Information", "/blog", QUICK_LINKS.slice(7, 10)],
  ["Contact", "/contact"],
];

const isActive = (pathname, href) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState("");
  const [mobile, setMobile] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

  return <header className={`ref-header ${scrolled ? "is-scrolled" : ""}`}>
    <Link href="/" className="ref-logo" aria-label="Mactus home"><img src="/images/assets/Mactus_Logo.svg" alt="Mactus" /></Link>
    <nav className="ref-nav" aria-label="Main navigation">
      {NAV.map(([label, href, children]) => <div className="ref-nav-item" key={label} onMouseEnter={() => setOpen(label)} onMouseLeave={() => setOpen("")} onFocus={() => setOpen(label)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(""); }}>
        <Link href={href} className={isActive(pathname, href) ? "is-active" : ""}>{label}{children && <Icon name="chevron" size={12} />}</Link>
        {children && open === label && <div className="ref-dropdown">{children.map(([name, subHref]) => <Link href={subHref} key={name}>{name}</Link>)}</div>}
      </div>)}
      <Button href="/contact" size="sm">Inquire now <Icon name="arrow" size={16} /></Button>
    </nav>
    <button className="ref-menu" type="button" onClick={() => setMobile(!mobile)} aria-expanded={mobile} aria-controls="mobile-nav" aria-label={mobile ? "Close navigation" : "Open navigation"}><Icon name={mobile ? "close" : "menu"} size={26} /></button>
    {mobile && <nav className="ref-mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
      {NAV.map(([label, href, children]) => <div className="ref-mobile-group" key={label}>
        <div className="ref-mobile-row">
          <Link href={href} className={isActive(pathname, href) ? "is-active" : ""}>{label}</Link>
          {children && <button type="button" aria-expanded={expanded === label} aria-label={`${label} submenu`} onClick={() => setExpanded(expanded === label ? "" : label)}><Icon name="chevron" size={16} /></button>}
        </div>
        {children && expanded === label && <div className="ref-mobile-sub">{children.map(([name, subHref]) => <Link href={subHref} key={name}>{name}</Link>)}</div>}
      </div>)}
      <Button href="/contact" className="ref-mobile-cta">Inquire now <Icon name="arrow" size={16} /></Button>
    </nav>}
  </header>;
}

export function Footer() {
  return <footer className="ref-footer">
    <div className="ref-footer-grid">
      <div>
        <img src="/images/assets/Matus_Logo_Alt.svg" alt="Mactus" className="ref-footer-logo" />
        <p>Leading in manufacturing Refined Soda and Potash Feldspar, with 20+ years of ceramic industry expertise. From mining to global distribution, we&apos;re committed to excellence at every step.</p>
      </div>
      <div><h3>Quick Links</h3>{QUICK_LINKS.map(([name, href]) => <Link key={name} href={href}>{name}</Link>)}</div>
      <div><h3>Products</h3>{PRODUCTS.map(([name, slug]) => <Link key={slug} href={`/product/${slug}`}>{name}</Link>)}</div>
      <div>
        <h3>Factory Address</h3>
        <p>8-A National Highway,<br />Sokhada Road, Vaghpur(Piludi),<br />Morbi-363642 (Gujarat) India.</p>
        <div className="ref-footer-contact">
          <a href="tel:+919824066283"><Icon name="phone" size={16} /> +91 98240 66283</a>
          <a href="mailto:info@mactus.co.in"><Icon name="mail" size={16} /> info@mactus.co.in</a>
        </div>
      </div>
    </div>
    <div className="ref-copyright">© {new Date().getFullYear()} MACTUS | Managed By : <a href="https://lightlinksolutions.com/">LightLink Solutions</a></div>
  </footer>;
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <>
    <a href="https://wa.me/919824066283" className="ref-whatsapp" aria-label="Chat on WhatsApp" target="_blank" rel="noreferrer"><img src="/images/assets/whatsapp.webp" alt="" /></a>
    <button type="button" className={`ref-top ${visible ? "is-visible" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Icon name="up" size={20} /></button>
  </>;
}
