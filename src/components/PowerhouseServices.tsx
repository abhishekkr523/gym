import { useEffect, useRef, useState } from 'react';

export default function PowerhouseServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.08 });
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    { emoji: '🏋️', title: 'Advance Imported Machines', desc: 'Commercial-grade equipment sourced for real load, real durability, zero wobble.' },
    { emoji: '👤', title: 'Certified Personal Training', desc: 'One-on-one coaching from trainers certified to plan, spot, and correct your form.' },
    { emoji: '🏃', title: 'Cardio', desc: 'Treadmills, bikes, and rowers for every conditioning block on your plan.' },
    { emoji: '💪', title: 'Body Building', desc: 'Structured hypertrophy programming for members chasing serious size.' },
    { emoji: '⚡', title: 'Weight Loss Training', desc: 'Fat-loss focused circuits paired with nutrition check-ins that actually get followed.' },
    { emoji: '🎯', title: 'Power Strength', desc: 'Squat, bench, deadlift programming for members training toward a number.' },
    { emoji: '📋', title: 'Diet Guideline', desc: 'A straightforward eating plan matched to your program, not a generic PDF.' },
  ];

  return (
    <section id="services" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Our Services</div>
          <h2>Everything you need,<br />under one roof.</h2>
          <p>Power House is built around seven disciplines — pick one or train all of them under the same coaching standard.</p>
        </div>
      </div>

      {/* Feature image banner */}
      <div className="ph-services-banner">
        <img src="/gym_equipment.png" alt="Premium gym equipment" className="ph-services-banner-img" />
        <div className="ph-services-banner-overlay" />
        <div className="ph-services-banner-text">
          <span className="eyebrow center">World-Class Facilities</span>
          <p>500+ sq ft of premium training space</p>
        </div>
      </div>

      <div className="wrap">
        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={i}
              className={`service-card reveal ph-service-card${activeCard === i ? ' ph-card-active' : ''}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="ph-service-emoji">{s.emoji}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="ph-service-arrow">→</div>
            </div>
          ))}
          <div className="service-card reveal ph-service-cta-card" style={{ transitionDelay: `${services.length * 0.06}s` }}>
            <div className="eyebrow" style={{ marginBottom: '10px' }}>Ready?</div>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '26px' }}>Join the family.</h3>
            <a href="#join" className="btn-primary" style={{ marginTop: '16px', padding: '12px 22px', fontSize: '13px' }}>Join Today</a>
          </div>
        </div>
      </div>
    </section>
  );
}
