import React from 'react';
import logo from '../assets/logo_bg.png';

export default function Footer({ activeTheme }) {
  return (
    <footer
      style={{
        backgroundColor: activeTheme.colors.text,
        color: activeTheme.colors.bg,
      }}
      className="pt-16 pb-10 px-6 md:px-12 w-full transition-colors duration-500 overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 text-center">

        {/* Logo */}
        <img
          src={logo}
          alt="BrustBizeps"
          className="h-7 md:h-8 w-auto select-none invert brightness-0"
          style={{ filter: 'invert(1) brightness(2)' }}
        />

        {/* Legal — nur Impressum und Datenschutz */}
        <nav className="flex items-center gap-8 text-sm font-body opacity-80">
          <a href="#" className="hover:opacity-100 hover:underline underline-offset-4 transition-opacity">Impressum</a>
          <a href="#" className="hover:opacity-100 hover:underline underline-offset-4 transition-opacity">Datenschutz</a>
        </nav>

        <div className="text-xs font-mono opacity-40">
          &copy; {new Date().getFullYear()} BrustBizeps
        </div>

      </div>
    </footer>
  );
}
