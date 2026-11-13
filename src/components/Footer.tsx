import React from 'react';
import { Flame, MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-850 pt-16 pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black font-['Oswald'] text-white uppercase tracking-wider">
              <span className="p-1.5 bg-amber-400 text-black rounded-sm">
                <Flame className="w-5 h-5 fill-current" />
              </span>
              <span>FUEGO<span className="text-amber-400">FIT</span></span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              El club fitness donde el ritmo de la Rumba Neón se fusiona con la exigencia del hierro y la fuerza en Pereira, Colombia.
            </p>
            <div className="flex items-center gap-3 text-neutral-300">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-white hover:text-amber-400 transition-colors"
                aria-label="Instagram Fuego Fit"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${GYM_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-white hover:text-amber-400 transition-colors"
                aria-label="WhatsApp Fuego Fit"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-['Oswald'] uppercase text-white tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#disciplinas" className="hover:text-amber-400 transition-colors">
                  Disciplinas & Zonas
                </a>
              </li>
              <li>
                <a href="#horarios" className="hover:text-amber-400 transition-colors">
                  Horarios & Cupos en Vivo
                </a>
              </li>
              <li>
                <a href="#planes" className="hover:text-amber-400 transition-colors">
                  Planes & Membresías
                </a>
              </li>
              <li>
                <a href="#comunidad" className="hover:text-amber-400 transition-colors">
                  Comunidad & Reseñas
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-amber-400 transition-colors">
                  Sede Pinares Pereira
                </a>
              </li>
            </ul>
          </div>

          {/* Disciplines */}
          <div>
            <h4 className="text-sm font-bold font-['Oswald'] uppercase text-white tracking-wider mb-4">
              Disciplinas
            </h4>
            <ul className="space-y-2.5">
              <li>Rumba Neón & Baile Latino</li>
              <li>Musculación & Hipertrofia</li>
              <li>Entrenamiento Funcional & Turf</li>
              <li>Indoor Power Cycling</li>
              <li>Retos de Transformación 30 Días</li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-['Oswald'] uppercase text-white tracking-wider mb-4">
              Contacto Pereira
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{GYM_CONFIG.address}, Pereira, Risaralda</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{GYM_CONFIG.phoneDisplay}</span>
            </div>
            <p className="text-[11px] text-neutral-500 pt-1">
              Horario: Lun-Vie 5:00 AM - 10:00 PM | Sáb 6:00 AM - 6:00 PM | Dom 7:00 AM - 2:00 PM
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} FUEGO FIT Club Pereira. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Términos del Servicio</span>
            <span>·</span>
            <span>Política de Privacidad</span>
            <span>·</span>
            <span>Risaralda, Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
