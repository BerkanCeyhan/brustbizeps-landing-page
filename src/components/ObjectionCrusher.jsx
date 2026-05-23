import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ObjectionCrusher({ activeTheme }) {
  const [openIdx, setOpenIdx] = useState(null);

  const handleToggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  const faqs = [
    {
      q: "Schmeckt BrustBizeps Whey künstlich oder sandig?",
      a: activeTheme.marketingClaims.objection1 + " Wir verzichten komplett auf sandige Trägerstoffe und verwenden ausschließlich ultra-feine, hochwertige Aromen."
    },
    {
      q: "Klumpt das Pulver beim Mischen im Shaker?",
      a: activeTheme.marketingClaims.objection2 + " Egal ob in eiskaltem Wasser, Mandelmilch oder Kuhmilch: Nach minimalem Schütteln hast du eine perfekt cremige Konsistenz."
    },
    {
      q: "Ist das Proteinpulver gut verträglich?",
      a: activeTheme.marketingClaims.objection3 + " Durch das Hinzufügen spezieller laktase-spaltender Enzyme ist das Whey extrem magenschonend und verursacht keinen Blähbauch."
    },
    {
      q: "Wie viel Protein liefert eine Portion?",
      a: "Jede Portion liefert dir satte 24g reines, biologisch hochwertiges Molkenprotein bei weniger als 1,5g Kohlenhydraten und Fetten. Ideal für Muskelaufbau und Diäten."
    },
    {
      q: "Wie funktioniert die 30-Tage-Garantie?",
      a: "Wir sind so überzeugt von unserer Cremigkeit, dass wir dir ein 100% risikofreies Testen ermöglichen. Sollte es dir nicht schmecken, schicke uns einfach die angefangene Packung zurück und wir erstatten den vollen Kaufpreis."
    }
  ];

  return (
    <section 
      id="faq" 
      className="py-20 px-6 md:px-12 w-full transition-colors duration-500"
      style={{ backgroundColor: activeTheme.colors.card }}
    >
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span 
            className="font-mono text-xs uppercase tracking-widest font-bold block mb-3"
            style={{ color: activeTheme.colors.accent }}
          >
            Häufig gestellte Fragen
          </span>
          <h2 
            className="font-heading text-3xl sm:text-5xl leading-tight"
            style={{ color: activeTheme.colors.text }}
          >
            Alle Zweifel beseitigt.
          </h2>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                style={{
                  borderRadius: activeTheme.overrides.borderRadiusButton,
                  border: activeTheme.overrides.borderStyle,
                  backgroundColor: activeTheme.colors.bg,
                }}
                className="overflow-hidden transition-all duration-300"
              >
                
                {/* Trigger Button */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-heading text-lg md:text-xl tracking-wide select-none"
                  style={{ color: activeTheme.colors.text }}
                >
                  <span>{faq.q}</span>
                  <span 
                    style={{ backgroundColor: `${activeTheme.colors.primary}20` }}
                    className="p-1.5 rounded-full transition-transform duration-300"
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" style={{ color: activeTheme.colors.accent }} />
                    ) : (
                      <Plus className="w-4 h-4" style={{ color: activeTheme.colors.accent }} />
                    )}
                  </span>
                </button>

                {/* Collapsible Content */}
                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p 
                    className="px-5 pb-5 pt-1 text-sm md:text-base leading-relaxed opacity-85 font-body"
                    style={{ color: activeTheme.colors.text }}
                  >
                    {faq.a}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
