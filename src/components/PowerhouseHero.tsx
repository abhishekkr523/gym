import { useEffect, useRef } from 'react';

export default function PowerhouseHero() {
  const leftStampRef = useRef<HTMLDivElement>(null);
  const rightStampRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let running = true;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number; alpha: number; size: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 600),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.55 + 0.1,
        size: Math.random() * 1.8 + 0.4,
      });
    }

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,195,0,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Stamp entrance
  useEffect(() => {
    const t1 = setTimeout(() => leftStampRef.current?.classList.add('animate'), 900);
    const t2 = setTimeout(() => rightStampRef.current?.classList.add('animate'), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Staggered content reveal
  useEffect(() => {
    const ids = ['hero-eyebrow', 'hero-h1', 'hero-subbrand', 'hero-tagline', 'hero-cta'];
    ids.forEach((id, i) => {
      setTimeout(() => {
        document.getElementById(id)?.classList.add('hero-fade-in');
      }, 200 + i * 130);
    });
  }, []);

  return (
    <section className="hero ph-hero">
      {/* Real gym bg image */}
      <div className="ph-hero-bg" style={{ backgroundImage: 'url(/gym_hero_bg.png)' }} />
      <div className="ph-hero-overlay" />

      {/* Particle canvas on top */}
      <canvas ref={canvasRef} className="hero-particle-canvas" />

      <div className="stamp-row">
        <div className="stamp stamp-left" ref={leftStampRef}>
          NO PAIN<br /><span className="accent">NO GAIN</span>
        </div>
        <div className="stamp stamp-right" ref={rightStampRef}>
          TRAIN HARD<br /><span className="accent">STAY STRONG</span>
        </div>
      </div>

      <svg className="hero-mark hero-mark-anim" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="92" width="26" height="20" rx="3" fill="#FFC300" />
        <rect x="166" y="92" width="26" height="20" rx="3" fill="#FFC300" />
        <rect x="34" y="98" width="132" height="8" fill="#F4F3EE" />
        <path d="M64 98 C64 60, 136 60, 136 98" stroke="#F4F3EE" strokeWidth="8" fill="none" strokeLinecap="round" />
        <circle cx="100" cy="52" r="20" fill="#F4F3EE" />
      </svg>

      <div id="hero-eyebrow" className="eyebrow center hero-heading-hidden">Discipline · Dedication · Determination</div>
      <h1 id="hero-h1" className="hero-heading-hidden">
        POWER HOUSE<br /><span className="yellow">THE GYM</span>
      </h1>
      <div id="hero-subbrand" className="sub-brand hero-heading-hidden">THE REAL WORKOUT BEGINS AT <span style={{ color: "#F4F3EE" }}>SOHILPATTI</span></div>

      <p id="hero-tagline" className="tagline hero-heading-hidden">
        Build Your Body <span className="divider">•</span> Build Your Confidence
      </p>
      <div id="hero-cta" className="cta-row hero-heading-hidden">
        <a href="#join" className="btn-primary btn-pulse">Join Today</a>
        <a href="#services" className="btn-secondary">See What's Inside</a>
      </div>

      <div className="hero-scroll-indicator">
        <span>SCROLL</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
