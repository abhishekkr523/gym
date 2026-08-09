import { useEffect, useRef } from 'react';

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useCounter(target: number, suffix = '+') {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();

      const duration = 1600;
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target) + (progress === 1 ? suffix : '');
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);
  return ref;
}

export default function PowerhouseWhyUs() {
  const headRef = useReveal();
  const statsRef = useReveal();
  const gridRef = useReveal();
  const membersRef = useCounter(500);
  const trainersRef = useCounter(10);
  const yearsRef = useCounter(5);
  const satisfactionRef = useCounter(99, '%');

  return (
    <section className="why-us" id="why-us">
      <div className="wrap">
        <div className="section-head center reveal" ref={headRef} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="eyebrow center">Why Power House</div>
          <h2>Your fitness destination.</h2>
        </div>

        {/* Animated stats */}
        <div className="ph-stats-row reveal" ref={statsRef}>
          {[
            { ref: membersRef, label: 'Happy Members' },
            { ref: trainersRef, label: 'Expert Trainers' },
            { ref: yearsRef, label: 'Years Strong' },
            { ref: satisfactionRef, label: 'Satisfaction Rate' },
          ].map((item, i) => (
            <div className="ph-stat-item" key={i}>
              <span className="ph-stat-num" ref={item.ref}>0</span>
              <span className="ph-stat-label">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Trainer feature image */}
        <div className="ph-trainer-feature reveal" ref={gridRef}>
          <div className="ph-trainer-img-wrap">
            <img src="/gym_trainer.png" alt="Expert trainer coaching a member" />
            <div className="ph-trainer-badge">
              <span className="ph-trainer-badge-icon">✓</span>
              <span>Certified Professionals</span>
            </div>
          </div>
          <div className="ph-trainer-content">
            <div className="eyebrow" style={{ marginBottom: '16px' }}>What Sets Us Apart</div>
            <div className="why-grid why-grid-2col">
              {[
                { icon: '🏆', title: 'Modern Equipment', text: 'Fully imported machines, maintained on a strict rotation.' },
                { icon: '👨‍🏫', title: 'Expert Trainers', text: 'Certified coaches who correct form before it becomes an injury.' },
                { icon: '🤝', title: 'Friendly Environment', text: 'A floor built for beginners and lifters alike — no attitude, just work.' },
                { icon: '📈', title: 'Real Results', text: 'Progress tracked session to session, not left to guesswork.' },
              ].map((item, i) => (
                <div className="why-item ph-why-item-card" key={i}>
                  <div className="ph-why-emoji">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
