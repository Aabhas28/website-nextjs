"use client";

import { useState } from "react";

const DEFAULT_CARDS = [
  {
    title: "Vision",
    text: [
      "To be the globally recognized benchmark in mineral processing and supply, setting industry standards for purity, technological advancement, and sustainable mining practices that empower ceramic and industrial manufacturing worldwide."
    ]
  },
  {
    title: "Mission",
    text: [
      "Delivering consistently superior refined minerals with uncompromising quality control, state-of-the-art wet-type processing, and dedicated customer service to foster long-term partnerships across international markets."
    ]
  },
  {
    title: "Achievements",
    text: [
      "India’s first premium-quality 200 Mesh Feldspar Powder through wet-type processing; the site positions the facility as India’s largest wet-type processing plant."
    ]
  }
];

export default function InfoCards({ items = DEFAULT_CARDS }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="cards">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <article
            key={item.title}
            className={`info-card${isOpen ? " open" : ""}`}
            onClick={() => setOpen(isOpen ? null : i)}
          >
            <button type="button" className="info-head" aria-expanded={isOpen}>
              <span className="icon-box" aria-hidden="true">
                <i />
              </span>
              <h3>{item.title}</h3>
            </button>
            <div className="info-body">
              {item.text.map((para, n) => (
                <p key={n}>{para}</p>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
