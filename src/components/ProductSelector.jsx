import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

// Mengenrabatt: bestellfreundliche Staffelung. Pro-Stück-Preis sinkt mit Menge.
const TIER_PRICES = {
  1: 22.95,
  2: 21.95,
  3: 19.95,
};
const COMPARE_PRICE = 42.95;
const FREE_SHIPPING_THRESHOLD = 50.0;

const getUnitPrice = (qty) => {
  if (qty >= 3) return TIER_PRICES[3];
  if (qty === 2) return TIER_PRICES[2];
  return TIER_PRICES[1];
};

const eu = (n) => n.toFixed(2).replace('.', ',');

export default function ProductSelector({ activeTheme, onSelectFlavor, themesList }) {
  const [qty, setQty] = useState(1);

  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));
  const increaseQty = () => setQty((prev) => (prev < 10 ? prev + 1 : 10));

  const shop = 'brustbizeps.myshopify.com';
  const selectedVariantId = activeTheme.shopifyId;

  const buildCheckoutUrl = (variantId, quantity) =>
    `https://${shop}/cart/${variantId}:${quantity}`;

  const handleCheckout = () => {
    window.location.href = buildCheckoutUrl(selectedVariantId, qty);
  };

  const unitPrice = getUnitPrice(qty);
  const total = unitPrice * qty;
  const compareTotal = COMPARE_PRICE * qty;
  const freeShippingDelta = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const freeShippingPct = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const servingPrice = unitPrice / 15; // 450 g, ~30 g pro Shake ≈ 15 Shakes

  return (
    <section
      id="selector"
      className="py-20 px-6 md:px-12 w-full transition-colors duration-500"
      style={{ backgroundColor: activeTheme.colors.bg }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-16">
          <span
            className="font-mono text-xs uppercase tracking-widest font-bold block mb-3"
            style={{ color: activeTheme.colors.accent }}
          >
            Dein Shake in 10 Sekunden
          </span>
          <h2
            className="font-heading text-3xl sm:text-5xl leading-tight"
            style={{ color: activeTheme.colors.text }}
          >
            Geschmack wählen, Menge wählen, fertig.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Flavor Image Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              style={{
                borderRadius: activeTheme.overrides.borderRadiusCard,
                border: activeTheme.overrides.borderStyle,
                boxShadow: activeTheme.overrides.shadowStyle,
                backgroundColor: activeTheme.colors.card,
              }}
              className="p-4 max-w-md w-full relative overflow-hidden transition-all duration-500"
            >
              <div className="aspect-square w-full bg-white rounded-xl overflow-hidden border border-stone-200">
                <img
                  src={activeTheme.productImage}
                  alt={`Nanosupps Whey Protein ${activeTheme.name}`}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Flavor Pills, Stepper, Checkout Button */}
          <div className="lg:col-span-6 flex flex-col items-start text-left w-full">

            {/* Title & Flavor tag */}
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-heading text-3xl md:text-4xl" style={{ color: activeTheme.colors.text }}>
                Premium Whey Protein
              </h3>
              <div
                style={{
                  borderRadius: activeTheme.overrides.borderRadiusButton,
                  backgroundColor: activeTheme.colors.primary,
                }}
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              >
                {activeTheme.emoji} {activeTheme.name}
              </div>
            </div>

            {/* Produkt-USP (bleibt konstant über alle Flavors) */}
            <p
              className="mb-6 text-sm md:text-base leading-relaxed opacity-80"
              style={{ color: activeTheme.colors.text }}
            >
              27&nbsp;g Eiweiß pro Portion. Cremig löslich. Bestellt von 8.400+ Athleten.
            </p>

            {/* Flavor selector matrix */}
            <div className="w-full mb-6">
              <label className="font-mono text-xs uppercase tracking-widest opacity-60 block mb-3">
                1. Geschmack
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {Object.keys(themesList).map((flavorKey) => {
                  const fl = themesList[flavorKey];
                  const isActive = fl.name === activeTheme.name;
                  return (
                    <button
                      key={flavorKey}
                      onClick={() => onSelectFlavor(flavorKey)}
                      style={{
                        borderRadius: activeTheme.overrides.borderRadiusButton,
                        border: isActive ? `2px solid ${activeTheme.colors.text}` : `1px solid rgba(0,0,0,0.15)`,
                        backgroundColor: isActive ? activeTheme.colors.card : 'transparent',
                        color: activeTheme.colors.text,
                      }}
                      className="px-4 py-3 flex items-center justify-between text-sm font-semibold transition-all duration-300 hover:bg-stone-50"
                    >
                      <span className="flex items-center gap-2">
                        <span>{fl.emoji}</span>
                        <span>{fl.name}</span>
                      </span>
                      {isActive && (
                        <span
                          style={{ backgroundColor: activeTheme.colors.accent }}
                          className="w-2.5 h-2.5 rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Menge + Preis — eine Zeile, kein Wrap auch auf Mobile */}
            <div className="w-full flex items-center justify-between gap-4 border-t border-b border-stone-200/50 py-5 mb-3">

              <div className="flex flex-col gap-2 min-w-0">
                <label className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                  2. Menge
                </label>
                <div
                  style={{
                    borderRadius: activeTheme.overrides.borderRadiusButton,
                    border: activeTheme.overrides.borderStyle,
                  }}
                  className="flex items-center bg-white overflow-hidden w-28"
                >
                  <button
                    onClick={decreaseQty}
                    aria-label="Menge verringern"
                    className="px-2.5 py-2 hover:bg-stone-100 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 text-stone-600" />
                  </button>
                  <span className="font-mono font-bold text-center flex-1 tabular-nums text-sm">{qty}</span>
                  <button
                    onClick={increaseQty}
                    aria-label="Menge erhöhen"
                    className="px-2.5 py-2 hover:bg-stone-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-stone-600" />
                  </button>
                </div>
              </div>

              {/* Pricing — kompakt, einzeilig */}
              <div className="text-right">
                <span className="font-mono text-[11px] line-through opacity-50 block tabular-nums leading-none mb-1">
                  {eu(compareTotal)} €
                </span>
                <span className="font-heading text-3xl font-bold block tabular-nums leading-none" style={{ color: activeTheme.colors.accent }}>
                  {eu(total)} €
                </span>
                <span className="font-mono text-[10px] opacity-60 block mt-1 tabular-nums">
                  {eu(servingPrice)} € pro Shake
                </span>
              </div>

            </div>

            {/* Mengenrabatt-Hinweis als dünne Zeile */}
            <div className="w-full font-mono text-[10px] opacity-70 mb-4 leading-snug">
              {qty >= 3
                ? <span style={{ color: activeTheme.colors.accent }}>Bestpreis aktiv: 19,95&nbsp;€ pro Stück</span>
                : qty === 2
                  ? <span>Spar-Tipp: ab 3&times; nur 19,95&nbsp;€ pro Stück</span>
                  : <span>Ab 2&times; nur 21,95&nbsp;€ pro Stück</span>}
            </div>

            {/* Gratis-Versand Fortschritt */}
            <div className="w-full mb-6">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider opacity-75 mb-1.5">
                <span>
                  {freeShippingDelta > 0
                    ? <>Noch <span className="font-bold tabular-nums">{eu(freeShippingDelta)} €</span> bis Gratis-Versand</>
                    : <span className="font-bold" style={{ color: activeTheme.colors.accent }}>Gratis-Versand freigeschaltet</span>}
                </span>
                <span className="tabular-nums opacity-70">{Math.round(freeShippingPct)}&nbsp;%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${freeShippingPct}%`,
                    backgroundColor: activeTheme.colors.accent,
                  }}
                />
              </div>
            </div>

            {/* Buy / Checkout action CTA */}
            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: activeTheme.colors.accent,
                color: activeTheme.overrides.ctaTextColor ?? activeTheme.colors.bg,
                borderRadius: activeTheme.overrides.borderRadiusButton,
                boxShadow: activeTheme.overrides.shadowStyle,
                border: activeTheme.overrides.borderStyle,
              }}
              className="btn-hover-lift w-full py-4 font-heading text-base sm:text-lg tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 mb-6"
            >
              <ShoppingCart className="w-5 h-5 fill-current" />
              <span>Jetzt bestellen</span>
            </button>

            {/* Trust Badges — Versand zuerst, das ist die häufigste Kaufbarriere */}
            <div className="w-full grid grid-cols-3 gap-3 border-t border-stone-200/30 pt-6">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck className="w-5 h-5" style={{ color: activeTheme.colors.accent }} />
                <span className="text-[10px] font-mono leading-tight uppercase opacity-80">Versand in 24 h</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <RefreshCw className="w-5 h-5" style={{ color: activeTheme.colors.primary }} />
                <span className="text-[10px] font-mono leading-tight uppercase opacity-80">14 Tage Rückgabe</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <ShieldCheck className="w-5 h-5" style={{ color: activeTheme.colors.primary }} />
                <span className="text-[10px] font-mono leading-tight uppercase opacity-80">SSL-Verschlüsselt</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
