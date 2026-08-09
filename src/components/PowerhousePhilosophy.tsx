import { useEffect, useRef } from 'react';

export default function PowerhousePhilosophy() {
  const lineRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [lineRef, leadRef];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.1 });
    els.forEach(r => r.current && observer.observe(r.current));
    if (quoteRef.current) observer.observe(quoteRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="philosophy" id="philosophy">
      <div className="philosophy-bg-text" aria-hidden="true">STRONGER</div>

      <div className="eyebrow center" style={{ marginBottom: '22px' }}>
        Our Philosophy
      </div>

      <div className="big-line reveal" ref={lineRef}>
        <span className="yellow">Strong body.</span> Strong mind.<br />
        <span className="red">Strong you.</span>
      </div>
      <p className="lead reveal" ref={leadRef}>
        Every program at Power House is built on discipline, dedication, and
        determination — the same three words on our wall are the same three
        words in your plan.
      </p>

      {/* Quote */}
      <div className="ph-quote reveal" ref={quoteRef}>
        <div className="ph-quote-bar" />
        <blockquote>"The only bad workout is the one that didn't happen."</blockquote>
      </div>

      {/* Animated three pillars */}
      <div className="ph-pillars">
        {['DISCIPLINE', 'DEDICATION', 'DETERMINATION'].map((word, i) => (
          <div key={i} className="ph-pillar" style={{ animationDelay: `${i * 0.15}s` }}>
            <span className="ph-pillar-num">0{i + 1}</span>
            <span className="ph-pillar-word">{word}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
