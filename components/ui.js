import Link from "next/link";

const ICON_PATHS = {
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  vision: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  mission: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  achievements: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  mail: "M3 5h18v14H3zM3 7l9 6 9-6",
  check: "M20 6L9 17l-5-5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  download: "M12 4v12M6 11l6 6 6-6M4 20h16",
  chevron: "M6 9l6 6 6-6",
  close: "M6 6l12 12M18 6L6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  up: "M12 19V5M5 12l7-7 7 7",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
};

export function Icon({ name, size = 30 }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICON_PATHS[name]} /></svg>;
}


export function SectionTitle({ eyebrow, title }) {
  return <div className="ref-section-title"><p>{eyebrow}</p><h2>{title}</h2><span aria-hidden="true" /></div>;
}

export function PageBanner({ eyebrow, title, image = "/images/mactus/hero/hero-minerals-clean.webp" }) {
  return <section className="ref-page-banner" style={{ backgroundImage: `linear-gradient(rgba(28,35,64,.78), rgba(42,53,99,.7)), url("${image}")` }}><div><p>{eyebrow}</p><h1>{title}</h1></div></section>;
}


/** Primary / outline / light button. Renders a Link, an external anchor or a <button> depending on props. */
export function Button({ href, variant = "primary", size = "md", className = "", children, ...rest }) {
  const classes = `ui-btn ui-btn--${variant} ui-btn--${size} ${className}`.trim();
  if (!href) return <button type="button" className={classes} {...rest}>{children}</button>;
  if (/^https?:/.test(href)) return <a className={classes} href={href} target="_blank" rel="noreferrer" {...rest}>{children}</a>;
  return <Link className={classes} href={href} {...rest}>{children}</Link>;
}

/** Text link with an arrow ("Read more"). */
export function ReadMore({ href, children }) {
  return <Link className="ui-readmore" href={href}>{children}<Icon name="arrow" size={16} /></Link>;
}

/** Elevated surface used for every card-like block on the site. */
export function Card({ as: Tag = "article", className = "", children, ...rest }) {
  return <Tag className={`ui-card ${className}`.trim()} {...rest}>{children}</Tag>;
}
