import React, { useState } from 'react';
import { Sparkles, Menu, X, Flame } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymData';

interface NavbarProps {
  onOpenBooking: (className?: string) => void;
  onOpenCoach: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenCoach }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Display Font, single element) */}
        <a
          href="#"
          className="flex items-center gap-2 text-2xl font-black tracking-wider text-white font-['Oswald'] uppercase whitespace-nowrap shrink-0 group"
        >
          <span className="p-1.5 bg-amber-400 text-black rounded-sm group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-current" />
          </span>
          <span>FUEGO<span className="text-amber-400">FIT</span></span>
          <span className="text-xs tracking-normal text-neutral-400 font-sans font-normal ml-1 hidden sm:inline">Pereira</span>
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a
            href="#disciplinas"
            onClick={(e) => { e.preventDefault(); handleNavClick('#disciplinas'); }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Disciplinas & Zonas
          </a>
          <a
            href="#horarios"
            onClick={(e) => { e.preventDefault(); handleNavClick('#horarios'); }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Horarios & Cupos
          </a>
          <a
            href="#planes"
            onClick={(e) => { e.preventDefault(); handleNavClick('#planes'); }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Planes & Tarifas
          </a>
          <a
            href="#comunidad"
            onClick={(e) => { e.preventDefault(); handleNavClick('#comunidad'); }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Comunidad & Fotos
          </a>
          <a
            href="#ubicacion"
            onClick={(e) => { e.preventDefault(); handleNavClick('#ubicacion'); }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Ubicación Pereira
          </a>
        </nav>

        {/* Zone 3: Primary Action & AI Coach trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCoach}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-700 hover:border-amber-400/60 hover:text-white rounded-md transition-colors whitespace-nowrap shrink-0"
            title="Asistente de Rutinas con Inteligencia Artificial"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Fuego Coach IA</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-md transition-colors shadow-[0_0_20px_rgba(251,191,36,0.25)] whitespace-nowrap shrink-0"
          >
            Agenda Tu Clase Gratis
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#disciplinas"
            onClick={(e) => { e.preventDefault(); handleNavClick('#disciplinas'); }}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
          >
            Disciplinas & Zonas
          </a>
          <a
            href="#horarios"
            onClick={(e) => { e.preventDefault(); handleNavClick('#horarios'); }}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
          >
            Horarios & Cupos en Vivo
          </a>
          <a
            href="#planes"
            onClick={(e) => { e.preventDefault(); handleNavClick('#planes'); }}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
          >
            Planes & Tarifas
          </a>
          <a
            href="#comunidad"
            onClick={(e) => { e.preventDefault(); handleNavClick('#comunidad'); }}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
          >
            Comunidad & Reseñas
          </a>
          <a
            href="#ubicacion"
            onClick={(e) => { e.preventDefault(); handleNavClick('#ubicacion'); }}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
          >
            Ubicación en Pereira
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onOpenCoach(); }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consultar Fuego Coach IA</span>
            </button>
            <a
              href={`https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(GYM_CONFIG.defaultWhatsAppMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 rounded-md"
            >
              WhatsApp Directo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
