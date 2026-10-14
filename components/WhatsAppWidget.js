"use client";

import { useEffect, useState } from "react";

const representatives = [
  {
    name: "Export & Technical Sales",
    phone: "+91 99099 12345",
    number: "919909912345",
    initial: "EX",
    role: "Global shipments & Technical Data"
  },
  {
    name: "Morbi Plant & Domestic Supply",
    phone: "+91 98252 67890",
    number: "919825267890",
    initial: "PL",
    role: "Bulk supply & Plant Dispatch"
  }
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        className="fab"
        type="button"
        aria-label="Open WhatsApp chat with Mactus Minerals"
        aria-expanded={open}
        aria-controls="wa-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.25-8.24 8.25zm4.52-6.17c-.25-.12-1.46-.72-1.69-.81-.23-.08-.39-.12-.55.12-.17.25-.63.81-.77.97-.14.17-.28.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
        </svg>
      </button>

      <div className={`wa-panel ${open ? "open" : ""}`} id="wa-panel" role="dialog" aria-label="Mactus WhatsApp Chat">
        <header>
          <div className="wa-header-brand">
            <span className="wa-title">Mactus Minerals Helpdesk</span>
            <span className="wa-sub">Typical reply time: within 15 mins</span>
          </div>
          <button className="wa-close" type="button" aria-label="Close" onClick={() => setOpen(false)}>
            &times;
          </button>
        </header>
        <p className="wa-intro">Connect with a Mactus mineral specialist for instant spec sheets and dispatch schedules:</p>
        <ul className="reps">
          {representatives.map((rep) => (
            <li key={rep.number}>
              <a
                className="rep"
                href={`https://wa.me/${rep.number}?text=Hello%20Mactus%20Minerals,%20I%20would%20like%20to%20inquire%20about%20mineral%20specifications.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="avatar" aria-hidden="true">
                  {rep.initial}
                </span>
                <span className="rep-details">
                  <div className="rep-name">{rep.name}</div>
                  <div className="rep-role">{rep.role}</div>
                  <div className="rep-phone">{rep.phone}</div>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
