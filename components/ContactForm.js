"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";

const COUNTRY_CODES = [["+91", "IN"], ["+1", "US"], ["+44", "UK"], ["+971", "AE"], ["+966", "SA"], ["+974", "QA"], ["+968", "OM"], ["+61", "AU"], ["+86", "CN"], ["+84", "VN"], ["+62", "ID"], ["+66", "TH"], ["+90", "TR"], ["+7", "RU"], ["+49", "DE"], ["+33", "FR"], ["+234", "NG"], ["+254", "KE"], ["+256", "UG"], ["+212", "MA"]];
const MESSAGE_LIMIT = 350;
const EMPTY_FORM = { name: "", email: "", countryCode: "+91", phone: "", message: "", website: "" };

function validateContact(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[\d\s().-]{6,20}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!form.message.trim()) errors.message = "Please tell us how we can help.";
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [sentTo, setSentTo] = useState("");
  const submitting = useRef(false);
  const openedAt = useRef(0);
  useEffect(() => { openedAt.current = Date.now(); }, []);
  const loading = status.type === "loading";
  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };
  const submit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    const found = validateContact(form);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ type: "idle", text: "" });
      document.querySelector(`.ref-contact-form [name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setStatus({ type: "loading", text: "" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, elapsed: Date.now() - openedAt.current }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not send your message. Please try again.");
      setSentTo(form.name.trim().split(/\s+/)[0]);
      setForm(EMPTY_FORM);
      setStatus({ type: "success", text: result.message });
    } catch (error) {
      const offline = error instanceof TypeError;
      setStatus({ type: "error", text: offline ? "Network error. Check your connection and try again." : error.message });
    } finally {
      submitting.current = false;
    }
  };
  if (status.type === "success") return <div className="ref-contact-card ref-contact-success" role="status">
    <span className="ref-success-mark"><Icon name="check" size={34} /></span>
    <h2>Thank you{sentTo ? `, ${sentTo}` : ""}!</h2>
    <p>Your message has reached the Mactus team. We will get back to you shortly.</p>
    <button type="button" className="ref-send ref-send-secondary" onClick={() => { setStatus({ type: "idle", text: "" }); openedAt.current = Date.now(); }}>Send another message</button>
  </div>;
  const field = (name) => ({ name, value: form[name], onChange: update, disabled: loading, "aria-invalid": errors[name] ? "true" : undefined, "aria-describedby": errors[name] ? `contact-${name}-error` : undefined });
  const error = (name) => errors[name] ? <span className="ref-field-error" id={`contact-${name}-error`}>{errors[name]}</span> : null;
  return <form className="ref-contact-card ref-contact-form" onSubmit={submit} noValidate>
    <p className="ref-contact-eyebrow">KEEP IN TOUCH</p>
    <h2>Send us a message</h2>
    <p className="ref-contact-lead">Tell us what you need and the Mactus team will get back to you.</p>
    <input name="website" value={form.website} onChange={update} className="ref-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className="ref-field-grid">
      <label className="ref-field"><span>Full name</span><input {...field("name")} placeholder="Your name" autoComplete="name" maxLength={100} />{error("name")}</label>
      <label className="ref-field"><span>Email</span><input {...field("email")} placeholder="you@company.com" type="email" autoComplete="email" inputMode="email" />{error("email")}</label>
    </div>
    <div className="ref-field">
      <span>Phone</span>
      <div className="ref-phone-group">
        <select name="countryCode" value={form.countryCode} onChange={update} disabled={loading} aria-label="Country code">{COUNTRY_CODES.map(([code, country]) => <option key={code} value={code}>{country} {code}</option>)}</select>
        <input {...field("phone")} placeholder="98765 43210" type="tel" autoComplete="tel-national" inputMode="tel" maxLength={20} aria-label="Phone number" />
      </div>
      {error("phone")}
    </div>
    <label className="ref-field"><span>Message</span><textarea {...field("message")} placeholder="How can we help you?" rows={5} maxLength={MESSAGE_LIMIT} /><em className={form.message.length > MESSAGE_LIMIT - 30 ? "is-near-limit" : ""}>{form.message.length}/{MESSAGE_LIMIT}</em>{error("message")}</label>
    {status.type === "error" && <p className="ref-form-alert" role="alert">{status.text}</p>}
    <button className="ref-send" type="submit" disabled={loading}>{loading ? <><span className="ref-spinner" aria-hidden="true" />Sending…</> : <>Send message <Icon name="send" size={18} /></>}</button>
    <p className="ref-contact-note">We only use your details to respond to your enquiry.</p>
  </form>;
}

