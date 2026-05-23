import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check, X, ShieldAlert, BadgeCheck } from 'lucide-react';

export default function ComparisonMatrix({ activeTheme }) {
  const tableRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.matrix-row', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 80%',
        }
      });
    }, tableRef);
    return () => ctx.revert();
  }, [activeTheme]);

  const rows = [
    {
      feature: "Geschmackserlebnis",
      bad: "Künstlich, extrem süß oder sandig wie Kreide.",
      good: "Sensationeller, echter Cheat-Meal-Flavor wie frisch vom Eisdiele/Diner."
    },
    {
      feature: "Löslichkeit",
      bad: "Zähe Klumpen am Shakerboden, die man kauen muss.",
      good: "100% rückstandslos gelöst nach nur 3-mal Schütteln – selbst in eiskaltem Wasser."
    },
    {
      feature: "Magenverträglichkeit",
      bad: "Laktosebombe, Blähbauch, Magenkrämpfe und Unwohlsein.",
      good: "Extrem bekömmlich durch Laktase & zusätzliche Enzyme für magenfreundliche Absorption."
    },
    {
      feature: "Bioverfügbarkeit",
      bad: "Minderwertige Proteinquellen mit viel Zucker und Füllstoffen.",
      good: "Ultra-filtriertes Molkenprotein-Isolat & Konzentrat für sofortige Muskelversorgung."
    }
  ];

  return (
    <section 
      id="comparison" 
      ref={tableRef}
      className="py-20 px-6 md:px-12 w-full transition-colors duration-500"
      style={{ backgroundColor: activeTheme.colors.card }}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span 
            style={{ color: activeTheme.colors.accent }}
            className="font-mono text-xs uppercase tracking-widest font-bold block mb-3"
          >
            Direkter Vergleich
          </span>
          <h2 
            style={{ color: activeTheme.colors.text }}
            className="font-heading text-3xl sm:text-5xl leading-tight"
          >
            Warum andere Proteine enttäuschen — und Nanosupps gewinnt.
          </h2>
        </div>

        {/* Matrix Grid Container */}
        <div 
          style={{ 
            borderRadius: activeTheme.overrides.borderRadiusCard,
            border: activeTheme.overrides.borderStyle,
            boxShadow: activeTheme.overrides.shadowStyle,
            backgroundColor: activeTheme.colors.bg,
          }}
          className="overflow-hidden p-6 md:p-8"
        >
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4 mb-6 font-heading text-lg md:text-xl tracking-wider">
            <div className="opacity-0 md:opacity-100 hidden md:block">Eigenschaft</div>
            <div className="flex items-center gap-2 text-stone-500 md:justify-center">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <span>Günstiges Standard Whey</span>
            </div>
            <div className="flex items-center gap-2 md:justify-center" style={{ color: activeTheme.colors.accent }}>
              <BadgeCheck className="w-5 h-5 fill-current" />
              <span>Nanosupps Premium Whey</span>
            </div>
          </div>

          {/* Feature Rows */}
          <div className="flex flex-col gap-6">
            {rows.map((row, idx) => (
              <div 
                key={idx}
                className="matrix-row grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 border-b border-stone-200/50 pb-6 last:border-0 last:pb-0"
              >
                {/* Feature Name */}
                <div 
                  className="font-heading text-lg md:text-xl flex items-center md:border-r border-stone-200/30 pr-4"
                  style={{ color: activeTheme.colors.text }}
                >
                  {row.feature}
                </div>

                {/* Bad Option */}
                <div className="flex items-start gap-2 bg-stone-100/50 md:bg-transparent p-3 md:p-0 rounded-lg text-sm md:text-base leading-relaxed opacity-75">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{row.bad}</span>
                </div>

                <div 
                  style={{ 
                    backgroundColor: `${activeTheme.colors.primary}12`,
                    borderRadius: activeTheme.overrides.borderRadiusButton,
                    borderLeftColor: activeTheme.colors.accent
                  }}
                  className="flex items-start gap-2 p-3 md:p-2.5 text-sm md:text-base leading-relaxed font-semibold border-l-4"
                >
                  <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: activeTheme.colors.accent }} />
                  <span style={{ color: activeTheme.colors.text }}>{row.good}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
