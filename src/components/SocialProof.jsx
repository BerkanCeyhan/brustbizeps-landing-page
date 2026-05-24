import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export default function SocialProof({ activeTheme }) {

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Crossfitterin",
      flavorUsed: "Eis Cream Sandwich 🍦",
      rating: 5,
      quote: "Ich vertrage es selbst auf leeren Magen. Und der Geschmack ist wirklich gut, mein Shake schmeckt nach geschmolzenem Eis statt nach Chemie."
    },
    {
      name: "Markus T.",
      role: "Powerlifter",
      flavorUsed: "Cereal Milk 🥛",
      rating: 5,
      quote: "Ich trinke zwei Shakes täglich. 3 Sekunden Schütteln und es ist cremig aufgelöst, keine Klumpen am Shakerboden. Cereal Milk schmeckt wie süße Frühstücksmilch."
    },
    {
      name: "Vanessa K.",
      role: "Fitness-Coach & Ernährungsberaterin",
      flavorUsed: "Glazed Cinnamon Roll 🌀",
      rating: 5,
      quote: "Zimt schmeckt in den meisten Proteinpulvern künstlich. Glazed Cinnamon Roll schmeckt wie eine frische Zimtschnecke. Geht super in Porridge, Magerquark oder klassisch als Shake."
    }
  ];

  return (
    <section
      id="testimonials"
      className="py-20 px-6 md:px-12 w-full transition-colors duration-500"
      style={{ backgroundColor: activeTheme.colors.card }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="font-mono text-xs uppercase tracking-widest font-bold block mb-3"
            style={{ color: activeTheme.colors.accent }}
          >
            Über 8.400 Bewertungen
          </span>
          <h2
            className="font-heading text-4xl sm:text-6xl leading-tight"
            style={{ color: activeTheme.colors.text }}
          >
            4,9 von 5 Sternen. Hier ist, warum.
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              style={{
                borderRadius: activeTheme.overrides.borderRadiusCard,
                border: activeTheme.overrides.borderStyle,
                boxShadow: activeTheme.overrides.shadowStyle,
                backgroundColor: activeTheme.colors.bg,
              }}
              className="testimonial-card p-6 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Review Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-stone-200/40 pb-3">
                  <span className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider opacity-75">
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: activeTheme.colors.primary }} />
                    <span>Verifiziert</span>
                  </div>
                </div>

                {/* Quote */}
                <p 
                  className="text-lg italic leading-relaxed mb-6 font-body"
                  style={{ color: activeTheme.colors.text }}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* User Identity Footer */}
              <div className="flex justify-between items-end border-t border-stone-200/20 pt-4">
                <div>
                  <h4 className="font-heading text-xl leading-none" style={{ color: activeTheme.colors.text }}>
                    {t.name}
                  </h4>
                  <p className="text-xs opacity-60 mt-1 font-body">
                    {t.role}
                  </p>
                </div>
                <div 
                  style={{ 
                    borderRadius: activeTheme.overrides.borderRadiusButton,
                    border: `1px solid ${activeTheme.colors.text}` 
                  }}
                  className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider"
                >
                  {t.flavorUsed}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Link to all reviews */}
        <div className="mt-10 text-center">
          <a
            href="https://brustbizeps.de/products/nanosupps-whey-protein#reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity duration-200"
            style={{ color: activeTheme.colors.text }}
          >
            Alle 8.400+ Bewertungen ansehen &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
