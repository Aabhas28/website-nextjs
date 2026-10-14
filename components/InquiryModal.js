"use client";

import { useState } from "react";

export default function InquiryModal({ isOpen, onClose, initialMineral = "" }) {
  const [mineral, setMineral] = useState(initialMineral || "Soda Feldspar");
  const [mesh, setMesh] = useState("200 Mesh");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulate auto close
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          &times;
        </button>

        {submitted ? (
          <div className="modal-success-state">
            <div className="success-icon-ring">
              <svg viewBox="0 0 24 24" width="36" height="36" stroke="#25d366" fill="none" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="success-title">Inquiry Dispatched!</h3>
            <p className="success-desc">
              Thank you, <strong>{name || "Valued Customer"}</strong>. Our technical mineral specialist for <strong>{mineral}</strong> will contact you via WhatsApp / email within 2 business hours.
            </p>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <span className="modal-eyebrow">MACTUS MINERALS &bull; SPEC SHEET INQUIRY</span>
              <h3 className="modal-title">Request Mineral Specifications</h3>
              <p className="modal-subtitle">
                Direct factory pricing and technical data sheet for Morbi wet-processed minerals.
              </p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="inquiry-mineral">Selected Mineral</label>
                <select
                  id="inquiry-mineral"
                  value={mineral}
                  onChange={(e) => setMineral(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="Soda Feldspar">Soda Feldspar (Wet Processed)</option>
                  <option value="Potash Feldspar">Potash Feldspar</option>
                  <option value="Talc">Talc (Micronized)</option>
                  <option value="Kaolin Clay">Kaolin Clay (China Clay)</option>
                  <option value="Quartz">Quartz (High Purity Silica)</option>
                  <option value="Ball Clay">Ball Clay</option>
                  <option value="Mica">Mica (Flakes & Powder)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-mesh">Target Mesh / Particle Size</label>
                <select
                  id="inquiry-mesh"
                  value={mesh}
                  onChange={(e) => setMesh(e.target.value)}
                  className="form-control"
                >
                  <option value="200 Mesh">200 Mesh (Pioneer Wet Process)</option>
                  <option value="300 Mesh">300 Mesh Ultrafine</option>
                  <option value="400 Mesh">400 Mesh Micronized</option>
                  <option value="500 Mesh">500 Mesh Powder</option>
                  <option value="Granular Grits">Granular Grains (0.1–1.0 mm)</option>
                  <option value="Lump / Crude">Crude Lumps</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-name">Your Name / Company *</label>
                <input
                  id="inquiry-name"
                  type="text"
                  placeholder="e.g. Accord Vitrified Pvt Ltd"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                >
                </input>
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-phone">Phone / WhatsApp Number *</label>
                <input
                  id="inquiry-phone"
                  type="tel"
                  placeholder="+91 99000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  required
                >
                </input>
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-email">Business Email</label>
                <input
                  id="inquiry-email"
                  type="email"
                  placeholder="procurement@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                >
                </input>
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-qty">Monthly Requirement (Metric Tons)</label>
                <input
                  id="inquiry-qty"
                  type="text"
                  placeholder="e.g. 100 MT / Month"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control"
                >
                </input>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: 12 }}>
              <label htmlFor="inquiry-msg">Additional Requirements / Kiln Application</label>
              <textarea
                id="inquiry-msg"
                rows={2}
                placeholder="Specify target Fe2O3, whiteness requirements, destination port, or sampling requests..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-navy btn-full" style={{ marginTop: 16 }}>
              Submit Official Specification Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
