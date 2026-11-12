
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );

    window.location.href =
      `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">
      <section className="contact-section">
        <div className="contact-header">
          <span>GET IN TOUCH</span>
          <h1>Let's Work Together</h1>
          <p>
            Have a project idea or collaboration opportunity?
            Feel free to contact me.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Let's discuss your next project.</p>

            <div className="contact-info-item">
              <Mail />
              <div>
                <h4>Email</h4>
                <p>your-email@example.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <Phone />
              <div>
                <h4>Phone</h4>
                <p>Update your phone number</p>
              </div>
            </div>

            <div className="contact-info-item">
              <MapPin />
              <div>
                <h4>Location</h4>
                <p>Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
