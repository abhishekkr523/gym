import { useState, useCallback, useEffect } from 'react';
import './App.css';
import './animations.css';
import PowerhouseLoader from './components/PowerhouseLoader';
import PowerhouseCursor from './components/PowerhouseCursor';
import PowerhouseNavbar from './components/PowerhouseNavbar';
import PowerhouseHero from './components/PowerhouseHero';
import PowerhouseServiceStrip from './components/PowerhouseServiceStrip';
import PowerhouseMarquee from './components/PowerhouseMarquee';
import PowerhouseServices from './components/PowerhouseServices';
import PowerhouseWhyUs from './components/PowerhouseWhyUs';
import PowerhousePhilosophy from './components/PowerhousePhilosophy';
import PowerhouseInfoStrip from './components/PowerhouseInfoStrip';
import PowerhouseContact from './components/PowerhouseContact';
import PowerhouseFinalCTA from './components/PowerhouseFinalCTA';
import PowerhouseFooter from './components/PowerhouseFooter';
import PowerhouseWhatsApp from './components/PowerhouseWhatsApp';

function App() {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  // Stable callback — loader calls this once when done
  const handleLoaderComplete = useCallback(() => {
    setPhase('done');
  }, []);

  // Scroll-linked navbar
  useEffect(() => {
    if (phase !== 'done') return;
    const header = document.querySelector('header');
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [phase]);

  return (
    <>
      {/* Loader is unmounted from DOM once complete — no more black overlay */}
      {phase === 'loading' && (
        <PowerhouseLoader onComplete={handleLoaderComplete} />
      )}

      {phase === 'done' && (
        <>
          <PowerhouseCursor />
          <PowerhouseNavbar />
          <PowerhouseHero />
          <PowerhouseServiceStrip />
          <PowerhouseMarquee />
          <PowerhouseServices />
          <PowerhouseWhyUs />
          <PowerhousePhilosophy />
          <PowerhouseInfoStrip />
          <PowerhouseContact />
          <PowerhouseFinalCTA />
          <PowerhouseFooter />
          <PowerhouseWhatsApp />
        </>
      )}
    </>
  );
}

export default App;
