import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

export default function RiskReversal({ activeTheme }) {
  const handleCTA = () => {
    const el = document.getElementById('selector');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="py-16 px-6 md:px-12 w-full transition-colors duration-500 relative overflow-hidden"
      style={{ backgroundColor: activeTheme.colors.bg }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Large SVG Guarantee Shield Badge */}
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-white border mb-6 shadow-md" style={{ borderColor: activeTheme.colors.text }}>
          <Award className="w-12 h-12" style={{ color: activeTheme.colors.accent }} />
        </div>

        {/* Guarantee Copy */}
        <h2 
          className="font-heading text-3xl sm:text-5xl leading-tight mb-4"
          style={{ color: activeTheme.colors.text }}
        >
          100% RISIKOFREI TESTEN
        </h2>
        
        <p 
          className="text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto opacity-90 mb-8"
          style={{ color: activeTheme.colors.text }}
        >
          Wir garantieren dir: <strong className="font-bold">Kein künstlicher Geschmack, kein Klumpen, keine Magenbeschwerden.</strong> Wenn du mit der Cremigkeit oder Verträglichkeit unseres Premiumpulvers unzufrieden bist, kontaktiere uns innerhalb von 30 Tagen und erhalte dein Geld sofort zurück.
        </p>

        <button
          onClick={handleCTA}
          style={{
            borderColor: activeTheme.colors.text,
            borderRadius: activeTheme.overrides.borderRadiusButton,
            backgroundColor: activeTheme.colors.card,
            boxShadow: activeTheme.overrides.shadowStyle,
            border: activeTheme.overrides.borderStyle,
            color: activeTheme.colors.text,
          }}
          className="btn-hover-lift px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 mx-auto"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500 fill-current" />
          <span>GARANTIE AKTIVIERT — JETZT PROBIEREN</span>
        </button>

      </div>
    </section>
  );
}
