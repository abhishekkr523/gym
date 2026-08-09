import { useState, useRef, useEffect } from 'react';

export default function PowerhouseContact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.1 });
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Get In Touch</div>
          <h2>Come train with us.</h2>
          <p>Walk in, call, or send a message — we'll set you up with a trial session and a trainer walkthrough.</p>
        </div>

        <div className="contact-grid reveal">
          <div>
            {/* Address card */}
            <div className="ph-address-card">
              <div className="ph-address-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className="ph-address-body">
                <h4>Our Location</h4>
                <div className="ph-address-details">
                  <div className="ph-address-line">
                    <span className="ph-addr-label">Place</span>
                    <span>Sohilpatti</span>
                  </div>

                  <div className="ph-address-line">
                    <span className="ph-addr-label">Route</span>
                    <span>Basantpur Musepur Road</span>
                  </div>
                  <div className="ph-address-line">
                    <span className="ph-addr-label">Block</span>
                    <span>Basantpur</span>
                  </div>
                  <div className="ph-address-line">
                    <span className="ph-addr-label">District</span>
                    <span>Siwan</span>
                  </div>
                  <div className="ph-address-line">
                    <span className="ph-addr-label">State</span>
                    <span>Bihar</span>
                  </div>
                  <div className="ph-address-line">
                    <span className="ph-addr-label">PIN</span>
                    <span className="ph-pin">841406</span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Basantpur+Musepur+Road+Siwan+Bihar+841406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ph-map-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" width="14" height="14">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="contact-info-item" style={{ marginTop: '20px' }}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.7a2 2 0 0 1 1.7 2.1z" />
              </svg>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+919430945506">+91 9430945506</a></p>
              </div>
            </div>

            <div className="contact-info-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              <div>
                <h4>Hours</h4>
                <p>Open 6 days a week · flexible timings</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {status === 'success' && (
              <div className="form-success show">
                Thanks — your message is in. We'll call you back shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="form-error show">
                Something went wrong. Please try again or WhatsApp us directly.
              </div>
            )}

            <div className="form-row">
              <div className="field">
                <label htmlFor="cf-name">Name</label>
                <input type="text" id="cf-name" name="name" placeholder="Your full name" required />
              </div>
              <div className="field">
                <label htmlFor="cf-phone">Phone</label>
                <input type="tel" id="cf-phone" name="phone" placeholder="Your phone number" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input type="email" id="cf-email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="field">
              <label htmlFor="cf-interest">I'm interested in</label>
              <select id="cf-interest" name="interest">
                <option>Body Building</option>
                <option>Weight Loss Training</option>
                <option>Power Strength</option>
                <option>Cardio</option>
                <option>Personal Training</option>
                <option>Just visiting / free trial</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" name="message" placeholder="Tell us your goals, or when you'd like to visit"></textarea>
            </div>
            <button type="submit" className="form-submit" disabled={status === 'success'}>Send Message</button>
            <p className="form-note">
              We usually reply within a few hours, same day if you message before 6pm.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
