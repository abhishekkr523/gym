import { useState, useEffect, useRef } from 'react';

interface Props { onComplete: () => void; }

export default function PowerhouseLoader({ onComplete }: Props) {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING...');
  const [exit, setExit] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const statuses = [
      'INITIALIZING...',
      'LOADING TRAINING PROGRAMS...',
      'CALIBRATING METRICS...',
      'PREPARING YOUR WORKOUT...',
      'POWER HOUSE // READY',
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPercent(100);
        setStatusText(statuses[statuses.length - 1]);
        // Start exit animation, then call onComplete to unmount
        setTimeout(() => {
          setExit(true);
          setTimeout(() => onCompleteRef.current(), 800);
        }, 400);
        return;
      }
      const stage = Math.min(
        Math.floor((current / 100) * (statuses.length - 1)),
        statuses.length - 1
      );
      setStatusText(statuses[stage]);
      setPercent(current);
    }, 35);

    return () => clearInterval(interval);
  }, []); // run once

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0b0b0c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        opacity: exit ? 0 : 1,
        transform: exit ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        pointerEvents: exit ? 'none' : 'all',
      }}
    >
      {/* Barbell SVG */}
      <svg
        viewBox="0 0 220 70"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: 180,
          height: 55,
          marginBottom: '2rem',
          animation: 'ph-loader-bounce 1.4s ease-in-out infinite',
        }}
        aria-hidden="true"
      >
        <rect x="4"   y="28" width="22" height="16" rx="3" fill="#FFC300" />
        <rect x="194" y="28" width="22" height="16" rx="3" fill="#FFC300" />
        <rect x="26"  y="33" width="168" height="6"  fill="#F4F3EE" />
        <rect x="40"  y="18" width="10"  height="36" rx="2" fill="#F4F3EE" />
        <rect x="58"  y="12" width="10"  height="48" rx="2" fill="#F4F3EE" />
        <rect x="152" y="12" width="10"  height="48" rx="2" fill="#F4F3EE" />
        <rect x="170" y="18" width="10"  height="36" rx="2" fill="#F4F3EE" />
        <circle cx="110" cy="14" r="12" fill="#F4F3EE" />
        <path d="M98 36 Q110 46 122 36" stroke="#F4F3EE" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>

      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '2.6rem', letterSpacing: '0.12em', color: '#F4F3EE', lineHeight: 1 }}>
        POWER HOUSE
      </div>
      <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '0.85rem', letterSpacing: '0.45em', color: '#FFC300', marginTop: 4, marginBottom: '2.5rem' }}>
        THE GYM
      </div>

      <div style={{ width: 280 }}>
        <div style={{ height: 2, background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${percent}%`,
              background: '#FFC300',
              boxShadow: '0 0 12px #FFC300',
              transition: 'width 0.1s ease',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'Oswald, sans-serif', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(244,243,238,0.45)' }}>
          <span>{statusText}</span>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
}
