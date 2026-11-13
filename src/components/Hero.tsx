import React from 'react';
import { MessageCircle, Calendar, Sparkles, MapPin, Star, ArrowRight } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenCoach: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenCoach }) => {
  const whatsappUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    '¡Hola Fuego Fit Pereira! Vengo de la página web y quiero agendar mi primera clase gratis de Rumba o Musculación hoy mismo.'
  )}`;

  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Promotional Season Banner */}
        <div className="mb-6 inline-flex flex-wrap items-center gap-3 bg-neutral-900/90 border border-amber-400/30 rounded-lg py-2 px-3.5 sm:px-4 text-xs">
          <span className="font-bold text-black bg-amber-400 px-2 py-0.5 rounded text-[11px] tracking-wide uppercase">
            Promo de Temporada
          </span>
          <span className="text-neutral-200">
            🔥 <strong>Rumba Neón Fest:</strong> Este Viernes 6:30 PM con DJ en vivo & Hidratación gratis.
          </span>
          <button
            type="button"
            onClick={onOpenBooking}
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 flex items-center gap-1 ml-auto"
          >
            Apartar cupo <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Conversion Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sede Pinares · Circunvalar Pereira, Risaralda</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Oswald'] uppercase tracking-tight text-white leading-none text-balance mb-5">
              EL GIMNASIO DONDE EL <span className="text-amber-400">RITMO Y LA FUERZA</span> SE FUSIONAN EN PEREIRA
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
              Vive la energía de nuestras legendarias clases de <strong>Rumba Neón</strong>, sala de pesas libre para hipertrofia y zona funcional con pista de turf. Sin cláusulas de permanencia, con entrenadores reales que te corrigen y una comunidad que te impulsa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              {/* Primary Direct WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-[0_0_25px_rgba(251,191,36,0.35)] transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Agenda tu clase gratis por WhatsApp</span>
              </a>

              {/* Secondary Instant Schedule Action */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider text-neutral-100 bg-neutral-900 border border-neutral-700 hover:border-amber-400 hover:text-amber-400 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar Cupo en Línea</span>
              </button>
            </div>

            {/* AI Assistant Quick Pitch */}
            <div className="p-3.5 bg-neutral-900/60 border border-neutral-800 rounded-lg flex items-center justify-between gap-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-400/10 text-amber-400 rounded-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">¿No sabes por dónde arrancar tu entrenamiento?</span>
                  <span className="text-neutral-400">Fuego Coach IA te arma una rutina y ruta según tu meta en 30 segundos.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenCoach}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-semibold rounded shrink-0 transition-colors"
              >
                Probar Asistente
              </button>
            </div>
          </div>

          {/* Right Column: Hero High Quality Facility Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/hero_gym_pereira_1794087239057.jpg"
                alt="Instalaciones de alto rendimiento de FUEGO FIT Club Pereira con zona de máquinas y estudio de rumba"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Bottom Scrim Information */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-1">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-white font-bold text-xs ml-1.5">4.9 / 5.0</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      <strong>+340 opiniones</strong> en Google Maps · La sede más moderna de Pereira
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-amber-400 font-semibold block">1.200 m²</span>
                    <span className="text-[11px] text-neutral-400">Totalmente equipados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-KPI Row Strip below Hero */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-850">
            <span className="block text-2xl sm:text-3xl font-black font-['Oswald'] text-amber-400 tabular-nums">
              +1.850
            </span>
            <span className="text-xs text-neutral-400 font-medium">Socios activos en Pereira</span>
          </div>
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-850">
            <span className="block text-2xl sm:text-3xl font-black font-['Oswald'] text-amber-400 tabular-nums">
              550+ kcal
            </span>
            <span className="text-xs text-neutral-400 font-medium">Quema media por sesión de Rumba</span>
          </div>
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-850">
            <span className="block text-2xl sm:text-3xl font-black font-['Oswald'] text-amber-400 tabular-nums">
              5:00 AM
            </span>
            <span className="text-xs text-neutral-400 font-medium">Apertura de Lunes a Viernes</span>
          </div>
          <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-850">
            <span className="block text-2xl sm:text-3xl font-black font-['Oswald'] text-amber-400 tabular-nums">
              100% GRATIS
            </span>
            <span className="text-xs text-neutral-400 font-medium">Tu primera clase de prueba</span>
          </div>
        </div>
      </div>
    </section>
  );
};
