import { useState } from 'react';

export default function PowerhouseNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav>
        <div className="logo">
          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="27" width="8" height="6" rx="1" fill="#FFC300" />
            <rect x="48" y="27" width="8" height="6" rx="1" fill="#FFC300" />
            <rect x="12" y="29" width="36" height="2" fill="#F4F3EE" />
            <path d="M20 29 C20 18, 40 18, 40 29" stroke="#F4F3EE" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <circle cx="30" cy="16" r="6" fill="#F4F3EE" />
          </svg>
          <div className="logo-text">POWER HOUSE<small>THE GYM</small></div>
        </div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#why-us">Why Us</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#contact">Contact</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <a href="#join" className="nav-cta">Join Today</a>
          <button
            className={`nav-toggle ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
        <a href="#why-us" onClick={() => setIsOpen(false)}>Why Us</a>
        <a href="#philosophy" onClick={() => setIsOpen(false)}>Philosophy</a>
        <a href="#visit" onClick={() => setIsOpen(false)}>Visit</a>
        <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
      </div>
    </header>
  );
}
