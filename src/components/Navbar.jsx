import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import logo from '../assets/logo_bg.png';

function useCountdown() {
  const getSecondsUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.max(0, Math.floor((midnight - now) / 1000));
  };

  const [seconds, setSeconds] = useState(getSecondsUntilMidnight);

  useEffect(() => {
    const id = setInterval(() => setSeconds(getSecondsUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  return {
    h: Math.floor(seconds / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: seconds % 60,
  };
}

const pad = (n) => String(n).padStart(2, '0');

export default function Navbar({ activeTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const { h, m, s } = useCountdown();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSelector = () => {
    document.getElementById('selector')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-50 flex items-center justify-between px-5 py-2.5 transition-all duration-500 border backdrop-blur-md"
      style={{
        borderRadius: activeTheme.overrides.borderRadiusButton,
        borderColor: scrolled ? `${activeTheme.colors.text}28` : 'transparent',
        backgroundColor: scrolled ? `${activeTheme.colors.card}e0` : 'transparent',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="BrustBizeps Startseite"
        className="select-none leading-none flex items-center"
      >
        <img src={logo} alt="BrustBizeps" className="h-5 sm:h-6 w-auto" />
      </button>

      {/* Live countdown — hidden on smallest screens */}
      <div className="hidden sm:flex flex-col items-center gap-0.5">
        <span
          className="font-mono text-[9px] uppercase tracking-widest leading-none opacity-55"
          style={{ color: activeTheme.colors.text }}
        >
          Gratis-Versand endet in
        </span>
        <span
          className="font-mono text-sm font-bold tabular-nums leading-none"
          style={{ color: activeTheme.colors.accent }}
        >
          {pad(h)}:{pad(m)}:{pad(s)}
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={scrollToSelector}
        className="btn-hover-lift px-4 py-2 text-xs font-heading tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
        style={{
          backgroundColor: activeTheme.colors.accent,
          color: activeTheme.overrides.ctaTextColor ?? activeTheme.colors.bg,
          borderRadius: activeTheme.overrides.borderRadiusButton,
          boxShadow: activeTheme.overrides.shadowStyle,
          border: activeTheme.overrides.borderStyle,
        }}
      >
        <ShoppingCart className="w-4 h-4" />
        <span className="hidden xs:inline">Jetzt sichern</span>
        <span className="xs:hidden">Sichern</span>
      </button>
    </nav>
  );
}
