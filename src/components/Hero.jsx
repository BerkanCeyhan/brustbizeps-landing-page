import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ activeTheme, onSelectFlavor, themesList }) {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(elementsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeTheme]); // Re-run entries on flavor swap for satisfying transition!

  const addToElementsRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  // Reset elements refs array on theme change to prevent stacking
  elementsRef.current = [];

  const handleCTA = () => {
    const el = document.getElementById('selector');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      style={{
        background: activeTheme.heroGradient,
        transition: 'background 0.8s ease'
      }}
      className="relative min-h-[92dvh] pt-32 pb-16 px-6 md:px-12 flex flex-col justify-center overflow-hidden w-full"
    >
      {/* Dynamic Background Motif Pattern Overlay */}
      <div 
        className={`absolute inset-0 opacity-10 pointer-events-none transition-all duration-800 ${
          activeTheme.overrides.bgPattern === 'candy-stripes' ? 'candy-stripes' :
          activeTheme.overrides.bgPattern === 'cereal-stripes' ? 'cereal-stripes' :
          activeTheme.overrides.bgPattern === 'popcorn-stripes' ? 'popcorn-stripes' :
          activeTheme.overrides.bgPattern === 'swirl-overlay' ? 'swirl-overlay' :
          'bg-opacity-5'
        }`}
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">

        {/* Left Side: Copywriting engine outcome stack — auf Mobile NACH dem Produktbild */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
          
          {/* Trust rating badge */}
          <div
            ref={addToElementsRef}
            style={{
              borderColor: activeTheme.colors.text,
              backgroundColor: activeTheme.colors.card,
              borderRadius: activeTheme.overrides.borderRadiusButton,
            }}
            className="flex items-center gap-2 border px-3 py-1 text-xs font-mono uppercase tracking-wider mb-6"
          >
            <span className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500" />
              ))}
            </span>
            <span className="font-bold">4.9/5 STARS</span>
            <span className="opacity-60">· 8.400+ Athleten</span>
          </div>

          {/* Outcome + pain constraint headline */}
          <h1
            ref={addToElementsRef}
            style={{ color: activeTheme.colors.text }}
            className="font-heading text-5xl sm:text-6xl lg:text-8xl leading-none mb-6 tracking-tight flex flex-col"
          >
            <span>PREMIUM WHEY PROTEIN</span>
            <span
              className="text-4xl sm:text-5xl lg:text-6xl font-normal italic mt-2"
              style={{ fontFamily: activeTheme.fonts.heading.includes('Boogaloo') ? "'Lobster Two', serif" : activeTheme.fonts.heading.includes('Pacifico') ? "'Playfair Display', serif" : activeTheme.fonts.heading.includes('Righteous') ? "'Source Serif 4', serif" : 'inherit' }}
            >
              für die Hälfte vom Original.
            </span>
          </h1>

          {/* Trust row: three hard numbers, one line */}
          <div
            ref={addToElementsRef}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 font-mono text-[11px] uppercase tracking-widest"
            style={{ color: activeTheme.colors.text }}
          >
            <span><span className="font-bold text-lg font-heading not-italic mr-1.5">8.400+</span>Käufer</span>
            <span className="opacity-30">·</span>
            <span><span className="font-bold text-lg font-heading not-italic mr-1.5">4,9/5</span>Sterne</span>
            <span className="opacity-30">·</span>
            <span><span className="font-bold text-lg font-heading not-italic mr-1.5">27 g</span>Eiweiß</span>
          </div>

          {/* Core Avatar Promise */}
          <p
            ref={addToElementsRef}
            className="text-xl md:text-2xl opacity-80 max-w-xl mb-8 leading-relaxed font-body"
            style={{ color: activeTheme.colors.text }}
          >
            <span className="font-bold" style={{ color: activeTheme.colors.accent }}>22,95 €</span> statt <span className="line-through opacity-70">42,95 €</span>. Voll filtriertes Molkenprotein, cremig löslich, in 5 Geschmacksrichtungen, die wirklich schmecken. Über 8.400 Athleten kaufen bereits regelmäßig nach.
          </p>

          {/* Direct CTA */}
          <div ref={addToElementsRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full mb-8">
            <button
              onClick={handleCTA}
              style={{
                backgroundColor: activeTheme.colors.accent,
                color: activeTheme.overrides.ctaTextColor ?? activeTheme.colors.bg,
                borderRadius: activeTheme.overrides.borderRadiusButton,
                boxShadow: activeTheme.overrides.shadowStyle,
                border: activeTheme.overrides.borderStyle,
              }}
              className="btn-hover-lift px-6 py-3.5 font-heading text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Jetzt bestellen</span>
            </button>

            {/* Versand-Hinweis (kein Fake-Urgency) */}
            <div className="flex items-center gap-2 justify-center font-mono text-xs opacity-75">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Versandkostenfrei ab 50 €</span>
            </div>
          </div>

          {/* 5 Sorten Anker-Link (keine Flavor-Doppelung mehr) */}
          <div ref={addToElementsRef} className="w-full">
            <button
              onClick={handleCTA}
              className="font-mono text-xs uppercase tracking-widest opacity-70 hover:opacity-100 underline underline-offset-4 transition-opacity"
              style={{ color: activeTheme.colors.text }}
            >
              5 Sorten zur Auswahl &darr;
            </button>
          </div>

        </div>

        {/* Right Side: Floating dynamic premium product bags — auf Mobile als ERSTES */}
        <div ref={addToElementsRef} className="relative flex justify-center items-center lg:h-[500px] order-1 lg:order-2">
          {/* Ambient Glow */}
          <div 
            style={{
              backgroundColor: activeTheme.colors.primary,
              filter: 'blur(100px)',
            }}
            className="absolute w-72 h-72 rounded-full opacity-30 pointer-events-none animate-pulse"
          />

          {/* Dynamic Image Container */}
          <div 
            style={{
              borderRadius: activeTheme.overrides.borderRadiusCard,
              border: activeTheme.overrides.borderStyle,
              boxShadow: activeTheme.overrides.shadowStyle,
              backgroundColor: activeTheme.colors.card,
            }}
            className="relative p-6 max-w-sm w-full animate-float transition-all duration-500"
          >
            {/* Discount badge — Rabatt ist relevanter als das Brand-Sigel */}
            <div
              style={{
                backgroundColor: activeTheme.colors.accent,
                color: '#fff',
                borderRadius: activeTheme.overrides.borderRadiusButton,
                border: activeTheme.overrides.borderStyle,
                transform: 'rotate(-4deg) translate(-10px, -15px)'
              }}
              className="absolute top-0 left-0 px-4 py-1.5 text-base font-heading tracking-wider font-bold z-20 shadow-md leading-none"
            >
              &minus;47&nbsp;%
            </div>

            {/* Flavor Image */}
            <div className="relative overflow-hidden rounded-xl bg-white aspect-square border border-stone-200">
              <img
                src={activeTheme.productImage}
                alt={`Nanosupps Whey Protein ${activeTheme.name}`}
                className="w-full h-full object-contain select-none pointer-events-none p-2"
              />
            </div>

            {/* Product Meta details */}
            <div className="mt-4 flex justify-between items-end border-t border-stone-200/50 pt-4">
              <div>
                <h3 className="font-heading text-xl" style={{ color: activeTheme.colors.text }}>
                  Premium Whey Protein
                </h3>
                <p className="font-mono text-xs opacity-60">
                  450 g Packung
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs line-through opacity-50 block">42,95 €</span>
                <span className="font-heading text-2xl font-bold tabular-nums" style={{ color: activeTheme.colors.accent }}>
                  22,95 €
                </span>
                <span className="font-mono text-[10px] opacity-60 block mt-0.5 tabular-nums">
                  51,00 € / kg
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
