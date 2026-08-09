import { useEffect, useRef } from 'react';

export default function PowerhouseFinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('ph-cta-in');
      });
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="final-cta" id="join">
      <div className="ph-cta-grid" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="ph-cta-grid-cell" />
        ))}
      </div>
      <div className="wrap ph-cta-content" ref={sectionRef}>
        <div className="join-stamp">Be a Part of Power House Family</div>
        <h2 className="ph-cta-heading">Join Today.</h2>
        <p>
          Transform today, strong tomorrow. Your first session is a walk-in
          away.
        </p>
        <div className="cta-row">
          <a href="#" className="btn-primary btn-pulse">Join Today</a>
          <a href="#services" className="btn-secondary">View Programs</a>
        </div>
      </div>
    </section>
  );
}
