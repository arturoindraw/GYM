import React, { useState } from 'react';
import { Flame, CheckCircle2, Zap, ArrowRight, Music2, Dumbbell, Activity, Bike } from 'lucide-react';
import { DISCIPLINE_ZONES, DisciplineZone } from '../data/gymData';

interface DisciplinesSectionProps {
  onSelectDisciplineToBook: (disciplineId: string) => void;
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({ onSelectDisciplineToBook }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredDisciplines = activeTab === 'all'
    ? DISCIPLINE_ZONES
    : DISCIPLINE_ZONES.filter((d) => d.id === activeTab);

  const getDisciplineIcon = (id: string) => {
    switch (id) {
      case 'rumba': return <Music2 className="w-5 h-5 text-amber-400" />;
      case 'musculacion': return <Dumbbell className="w-5 h-5 text-amber-400" />;
      case 'funcional': return <Activity className="w-5 h-5 text-amber-400" />;
      case 'cycling': return <Bike className="w-5 h-5 text-amber-400" />;
      default: return <Flame className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="disciplinas" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase block mb-2">
            ZONAS & DISCIPLINAS DE ENTRENAMIENTO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Oswald'] uppercase text-white tracking-tight mb-4">
            ESPACIOS DISEÑADOS PARA CADA TIPO DE OBJETIVO
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            En FUEGO FIT no te encasillamos. Pasa del ritmo latino y la diversión de la Rumba a la exigencia biomecánica de la sala de pesas o al sudor del circuito funcional.
          </p>

          {/* Interactive Filter Tabs (Button elements conforming to Anti-Slop §1.A) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-neutral-950/80 border border-neutral-800 rounded-xl inline-flex">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Todas las Zonas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rumba')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'rumba'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Rumba Neón
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('musculacion')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'musculacion'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Musculación & Pesas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('funcional')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'funcional'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Funcional & Turf
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cycling')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'cycling'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Indoor Cycling
            </button>
          </div>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDisciplines.map((zone: DisciplineZone) => (
            <div
              key={zone.id}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-900">
                <img
                  src={zone.image}
                  alt={zone.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                {/* Overlay Top Badging */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="p-2 bg-neutral-950/80 backdrop-blur-md rounded-lg border border-neutral-800">
                    {getDisciplineIcon(zone.id)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-neutral-950/90 backdrop-blur-md px-3 py-1 rounded-md border border-neutral-800">
                    {zone.subtitle}
                  </span>
                </div>

                {/* Calorie burn metric */}
                <div className="absolute bottom-3 right-4 bg-neutral-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 text-xs">
                  <span className="text-neutral-400">Gasto: </span>
                  <span className="text-amber-400 font-bold tabular-nums">{zone.calories}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-['Oswald'] uppercase text-white tracking-wide mb-2">
                    {zone.title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {zone.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2.5 mb-6">
                    {zone.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Target audience */}
                  <div className="p-3 bg-neutral-900/70 border border-neutral-800 rounded-lg text-xs text-neutral-400 mb-6">
                    <span className="text-white font-semibold">Ideal para: </span>
                    {zone.targetAudience}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectDisciplineToBook(zone.id)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Ver horarios y reservar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/573117894520?text=${encodeURIComponent(`Hola Fuego Fit, quiero más información sobre la zona de ${zone.title} en Pereira.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-400 hover:text-white underline underline-offset-2"
                  >
                    Preguntar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
