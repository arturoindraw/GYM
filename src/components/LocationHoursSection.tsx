import React from 'react';
import { MapPin, Clock, Phone, Navigation, Car, Shield, MessageCircle, ExternalLink } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymData';

export const LocationHoursSection: React.FC = () => {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Cra+13+%23+12-45+Pereira+Risaralda+Colombia';
  const wazeUrl = 'https://waze.com/ul?q=Cra+13+12-45+Pereira';

  return (
    <section id="ubicacion" className="py-20 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase block mb-2">
            SEDE PINARES · CIRCUNVALAR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Oswald'] uppercase text-white tracking-tight mb-4">
            DÓNDE ENCONTRARNOS & HORARIOS
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Estamos ubicados en el sector más estratégico, seguro y accesible de Pereira, con parqueadero privado y fácil llegada desde cualquier punto de la ciudad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Hours & Quick Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-7">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-['Oswald'] uppercase text-white">
                    Dirección Principal
                  </h3>
                  <p className="text-sm font-semibold text-neutral-200 mt-1">
                    {GYM_CONFIG.address}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Sector Circunvalar / Pinares · Pereira, Risaralda
                  </p>
                </div>
              </div>

              <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 space-y-1 mb-5">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Puntos de referencia cercanos:</span>
                </div>
                <p>• A 2 minutos del Parque La Rebeca y Av. Juan B. Gutiérrez</p>
                <p>• A 4 minutos del Centro Comercial Parque Arboleda</p>
                <p>• Fácil acceso por la Av. Circunvalar y Calle 14</p>
              </div>

              {/* Parking benefit */}
              <div className="flex items-center gap-2.5 text-xs text-neutral-300 pb-2">
                <Car className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Parqueadero privado cubierto y vigilado para socios (gratis).</span>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-['Oswald'] uppercase text-white">
                    Horarios de Entrenamiento
                  </h3>
                  <p className="text-xs text-neutral-400">Abierto los 7 días de la semana</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-400 font-medium">Lunes a Viernes</span>
                  <span className="text-white font-bold font-mono">5:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <span className="text-neutral-400 font-medium">Sábados</span>
                  <span className="text-white font-bold font-mono">6:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-neutral-400 font-medium">Domingos y Festivos</span>
                  <span className="text-white font-bold font-mono">7:00 AM – 2:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 hover:border-amber-400 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors text-center"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Cómo Llegar (Maps)</span>
              </a>

              <a
                href={`tel:${GYM_CONFIG.whatsappNumber}`}
                className="p-3.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 hover:border-amber-400 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors text-center"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Llamar a Sede</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Interactive Pereira Map Mockup */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Map Top Bar */}
            <div className="p-4 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-semibold text-white">Sede Activa en Vivo · Pereira, Risaralda</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Ampliar mapa</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Interactive Visual Map Representation */}
            <div className="relative h-96 sm:h-[460px] bg-neutral-900 overflow-hidden flex items-center justify-center">
              {/* Map Canvas Background Grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(#52525b 1px, transparent 1px), radial-gradient(#52525b 1px, #18181b 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              />

              {/* Stylized Pereira Roads & Avenidas */}
              <svg className="absolute inset-0 w-full h-full stroke-neutral-800" strokeWidth="6" fill="none">
                {/* Av. Circunvalar */}
                <path d="M-50,180 Q250,220 500,160 T900,240" stroke="#3f3f46" strokeWidth="8" />
                <path d="M-50,180 Q250,220 500,160 T900,240" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6" />
                {/* Av. Juan B. Gutiérrez */}
                <path d="M200,-50 Q280,200 360,500" stroke="#3f3f46" strokeWidth="7" />
                {/* Calle 14 / Pinares */}
                <path d="M100,320 L750,280" stroke="#27272a" strokeWidth="5" />
              </svg>

              {/* Landmark Pins */}
              <div className="absolute top-16 left-12 bg-neutral-950/90 border border-neutral-700 rounded-lg px-2.5 py-1 text-[11px] text-neutral-300 shadow">
                Parque La Rebeca
              </div>
              <div className="absolute bottom-16 right-16 bg-neutral-950/90 border border-neutral-700 rounded-lg px-2.5 py-1 text-[11px] text-neutral-300 shadow">
                C.C. Parque Arboleda
              </div>
              <div className="absolute top-12 right-24 bg-neutral-950/90 border border-neutral-700 rounded-lg px-2.5 py-1 text-[11px] text-neutral-300 shadow">
                Zona Pinares Médica
              </div>

              {/* Main FUEGO FIT Pulsing Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-amber-400/30 rounded-full animate-ping pointer-events-none" />
                  <div className="w-14 h-14 bg-amber-400 text-black rounded-2xl flex items-center justify-center shadow-[0_0_35px_rgba(251,191,36,0.6)] border-2 border-white">
                    <MapPin className="w-8 h-8 fill-black" />
                  </div>
                </div>

                <div className="mt-3 bg-neutral-950/95 border-2 border-amber-400 rounded-xl px-4 py-2 text-center shadow-2xl backdrop-blur-md">
                  <strong className="block text-sm font-['Oswald'] uppercase text-white">
                    FUEGO FIT CLUB PEREIRA
                  </strong>
                  <span className="text-[11px] text-amber-400 font-semibold">
                    Cra 13 # 12-45 · Pinares
                  </span>
                </div>
              </div>

              {/* Floating Action inside Map */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-neutral-950/90 backdrop-blur-md p-3 rounded-xl border border-neutral-800 text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Zona segura residencial de Pereira</span>
                </div>
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-amber-400 text-black font-bold rounded-lg text-[11px] uppercase tracking-wider"
                >
                  Abrir en Waze
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
