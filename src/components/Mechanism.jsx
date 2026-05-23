import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ShieldAlert, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Mechanism({ activeTheme }) {
  const containerRef = useRef(null);
  const [solubility, setSolubility] = useState(0);
  const [absorption, setAbsorption] = useState(0);
  const [purity, setPurity] = useState(0);

  useEffect(() => {
    // Reset values first to choreograph entrance cleanly
    setSolubility(0);
    setAbsorption(0);
    setPurity(0);

    const ctx = gsap.context(() => {
      // Stagger elements
      gsap.from('.mech-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });

      // Animate state numbers
      const obj = { s: 0, a: 0, p: 0 };
      gsap.to(obj, {
        s: 100,
        a: 98,
        p: 100,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        onUpdate: () => {
          setSolubility(Math.round(obj.s));
          setAbsorption(Math.round(obj.a));
          setPurity(Math.round(obj.p));
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTheme]);

  // SVG parameters for circular gauges
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const getStrokeDashoffset = (percent) => {
    return circumference - (percent / 100) * circumference;
  };

  return (
    <section 
      id="mechanism" 
      ref={containerRef}
      className="py-20 px-6 md:px-12 w-full transition-colors duration-500"
      style={{ backgroundColor: activeTheme.colors.bg }}
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Section Headline Pattern */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 text-left">
            <span 
              className="font-mono text-xs uppercase tracking-widest block mb-3 font-bold"
              style={{ color: activeTheme.colors.accent }}
            >
              Die Wissenschaft hinter der Cremigkeit
            </span>
            <h2 
              className="font-heading text-3xl sm:text-5xl leading-none"
              style={{ color: activeTheme.colors.text }}
            >
              Warum klumpt BrustBizeps Whey niemals?
            </h2>
            <p className="mt-4 text-lg opacity-80 leading-relaxed font-body max-w-2xl">
              Herkömmliche Proteinpulver verwenden grobe Proteinstrukturen, die Flüssigkeiten abweisen. Nanosupps nutzt die patentierte <strong className="font-bold">Cremigkeits-Sicherungs-Formel</strong>: Ein zweistufiges Ultra-Filtrationsverfahren, das die Protein-Partikel mikronisiert und eine 3-Sekunden-Solubilisierung bewirkt.
            </p>
          </div>
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-3 text-sm font-mono opacity-85">
            <Activity className="w-5 h-5 animate-pulse" style={{ color: activeTheme.colors.accent }} />
            <span>BIO-TELEMETRIE: LIVE AKTIV</span>
          </div>
        </div>

        {/* Pattern 6: Gauge cluster grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Gauge 1: Solubility */}
          <div 
            style={{ 
              borderRadius: activeTheme.overrides.borderRadiusCard,
              border: activeTheme.overrides.borderStyle,
              boxShadow: activeTheme.overrides.shadowStyle,
              backgroundColor: activeTheme.colors.card,
            }}
            className="mech-card p-6 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background track circle */}
                <circle
                  className="text-stone-200/50 stroke-current"
                  strokeWidth={stroke}
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius * 1.4}
                  cy={radius * 1.4}
                />
                {/* Foreground animated accent track */}
                <circle
                  stroke={activeTheme.colors.accent}
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset: getStrokeDashoffset(solubility), transition: 'stroke-dashoffset 0.1s ease' }}
                  strokeLinecap="round"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius * 1.4}
                  cy={radius * 1.4}
                />
              </svg>
              {/* Inner Percentage display */}
              <div className="absolute font-heading text-4xl text-stone-850 flex flex-col items-center justify-center" style={{ color: activeTheme.colors.text }}>
                <span>{solubility}%</span>
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">Gelöst</span>
              </div>
            </div>
            <h3 className="font-heading text-xl mb-2" style={{ color: activeTheme.colors.text }}>
              Löslichkeits-Formel
            </h3>
            <p className="text-sm opacity-75 font-body leading-relaxed">
              Mikronisierte Protein-Partikel binden Flüssigkeiten sofort. Keine Reste am Shaker-Rand oder staubige Pulverklumpen.
            </p>
          </div>

          {/* Gauge 2: Absorption */}
          <div 
            style={{ 
              borderRadius: activeTheme.overrides.borderRadiusCard,
              border: activeTheme.overrides.borderStyle,
              boxShadow: activeTheme.overrides.shadowStyle,
              backgroundColor: activeTheme.colors.card,
            }}
            className="mech-card p-6 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-stone-200/50 stroke-current"
                  strokeWidth={stroke}
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius * 1.4}
                  cy={radius * 1.4}
                />
                <circle
                  stroke={activeTheme.colors.primary}
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset: getStrokeDashoffset(absorption), transition: 'stroke-dashoffset 0.1s ease' }}
                  strokeLinecap="round"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius * 1.4}
                  cy={radius * 1.4}
                />
              </svg>
              <div className="absolute font-heading text-4xl text-stone-850 flex flex-col items-center justify-center" style={{ color: activeTheme.colors.text }}>
                <span>{absorption}%</span>
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">Absorption</span>
              </div>
            </div>
            <h3 className="font-heading text-xl mb-2" style={{ color: activeTheme.colors.text }}>
              Bioverfügbarkeit
            </h3>
            <p className="text-sm opacity-75 font-body leading-relaxed">
              Ultra-filtriertes Molkenprotein-Isolat zieht sofort in deine Muskelfasern. Perfekt für das anabole Zeitfenster nach dem Training.
            </p>
          </div>

          {/* Gauge 3: Digestibility */}
          <div 
            style={{ 
              borderRadius: activeTheme.overrides.borderRadiusCard,
              border: activeTheme.overrides.borderStyle,
              boxShadow: activeTheme.overrides.shadowStyle,
              backgroundColor: activeTheme.colors.card,
            }}
            className="mech-card p-6 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-stone-200/50 stroke-current"
                  strokeWidth={stroke}
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius * 1.4}
                  cy={radius * 1.4}
                />
                <circle
                  stroke={activeTheme.colors.accent}
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset: getStrokeDashoffset(purity), transition: 'stroke-dashoffset 0.1s ease' }}
                  strokeLinecap="round"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius * 1.4}
                  cy={radius * 1.4}
                />
              </svg>
              <div className="absolute font-heading text-4xl text-stone-850 flex flex-col items-center justify-center" style={{ color: activeTheme.colors.text }}>
                <span>{purity}%</span>
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">Magen-Fit</span>
              </div>
            </div>
            <h3 className="font-heading text-xl mb-2" style={{ color: activeTheme.colors.text }}>
              Magenverträglichkeit
            </h3>
            <p className="text-sm opacity-75 font-body leading-relaxed">
              Integrierte Laktase spaltet Milchzucker aktiv auf. Kein Blähbauch, keine Krämpfe, 100% Wohlbefinden.
            </p>
          </div>

        </div>

        {/* Certifications Strip */}
        <div 
          className="mt-12 flex flex-wrap justify-center gap-6 items-center border-t border-stone-200/30 pt-8"
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider opacity-75">
            <Sparkles className="w-4 h-4" style={{ color: activeTheme.colors.primary }} />
            <span>MADE IN GERMANY</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider opacity-75">
            <Sparkles className="w-4 h-4" style={{ color: activeTheme.colors.accent }} />
            <span>KÖLNER LISTE GEPRÜFT</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider opacity-75">
            <Sparkles className="w-4 h-4" style={{ color: activeTheme.colors.primary }} />
            <span>100% ASPARTAMFREI</span>
          </div>
        </div>

      </div>
    </section>
  );
}
