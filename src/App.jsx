import React, { useState } from 'react';
import { FLAVOR_THEMES } from './themes';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSelector from './components/ProductSelector';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';

export default function App() {
  const [flavorKey, setFlavorKey] = useState('ice_cream_sandwich');
  const activeTheme = FLAVOR_THEMES[flavorKey];

  // Dynamically map CSS Variables onto the application container
  const appVariablesStyle = {
    '--font-heading': activeTheme.fonts.heading,
    '--font-body': activeTheme.fonts.body,
    '--font-mono': activeTheme.fonts.mono,
    '--color-bg': activeTheme.colors.bg,
    '--color-primary': activeTheme.colors.primary,
    '--color-accent': activeTheme.colors.accent,
    '--color-text': activeTheme.colors.text,
    '--color-card': activeTheme.colors.card,
    '--border-radius-card': activeTheme.overrides.borderRadiusCard,
    '--border-radius-button': activeTheme.overrides.borderRadiusButton,
    '--box-shadow-card': activeTheme.overrides.shadowStyle,
    '--border-style-card': activeTheme.overrides.borderStyle,
  };

  const handleSelectFlavor = (newKey) => {
    if (FLAVOR_THEMES[newKey]) {
      setFlavorKey(newKey);
    }
  };

  return (
    <div 
      style={appVariablesStyle} 
      className="min-h-screen flex flex-col font-body transition-colors duration-500 overflow-x-hidden w-full"
    >
      {/* Floating Island Persistent Navigation */}
      <Navbar activeTheme={activeTheme} />

      <Hero
        activeTheme={activeTheme}
        onSelectFlavor={handleSelectFlavor}
        themesList={FLAVOR_THEMES}
      />

      <ProductSelector
        activeTheme={activeTheme}
        onSelectFlavor={handleSelectFlavor}
        themesList={FLAVOR_THEMES}
      />

      <SocialProof activeTheme={activeTheme} />

      {/* Premium dark brand closure */}
      <Footer activeTheme={activeTheme} />
    </div>
  );
}
