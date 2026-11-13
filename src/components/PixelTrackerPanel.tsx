import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, CheckCircle2, ChevronUp, ChevronDown, Sliders } from 'lucide-react';

export interface TrackingEventItem {
  id: string;
  eventName: string;
  platform: 'meta' | 'google' | 'both';
  params: Record<string, unknown>;
  timestamp: string;
}

interface PixelTrackerPanelProps {
  events: TrackingEventItem[];
}

export const PixelTrackerPanel: React.FC<PixelTrackerPanelProps> = ({ events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pixelId, setPixelId] = useState('891234567890123'); // Demo Pereira Gym Meta Pixel
  const [gaId, setGaId] = useState('G-FUEGOFITPEI');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveIds = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <aside aria-label="Meta Pixel & Google Analytics Retargeting Monitor" className="hidden md:block fixed bottom-6 left-6 z-30">
      {/* Minimized Pill */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-neutral-950/90 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 rounded-full text-[11px] text-neutral-300 shadow-xl backdrop-blur-md transition-all"
          title="Ver estado de Pixel de Meta e Instagram Ads"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="font-semibold text-white">Pixel & GA4 Demo</span>
          <span className="text-amber-400 font-mono">({events.length})</span>
          <ChevronUp className="w-3.5 h-3.5 text-neutral-500" />
        </button>
      ) : (
        /* Expanded Drawer */
        <div className="w-80 sm:w-96 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-4 text-xs animate-fade-in backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <div>
                <strong className="text-white block font-['Oswald'] uppercase text-sm">
                  RETARGETING & PIXEL SUITE
                </strong>
                <span className="text-[10px] text-neutral-400">Monitor visual · Meta Pixel + GA4</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
              aria-label="Cerrar panel de pixel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-300 mb-3 leading-relaxed">
            Panel ilustrativo: los eventos se muestran solo en esta página y no se envían a Meta ni a Google.
          </p>

          {/* Config fields */}
          <form onSubmit={handleSaveIds} className="space-y-2 mb-4 bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-850">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-neutral-400 font-mono">Meta Pixel ID:</span>
              <input
                type="text"
                value={pixelId}
                onChange={(e) => setPixelId(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 px-2 py-1 rounded text-[11px] font-mono text-amber-400 w-36 text-right focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-neutral-400 font-mono">GA4 Measurement:</span>
              <input
                type="text"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 px-2 py-1 rounded text-[11px] font-mono text-cyan-400 w-36 text-right focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-1 text-[10px] font-bold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded transition-colors"
            >
              {savedNotice ? '✓ IDs de demo actualizados' : 'Actualizar solo esta demo'}
            </button>
          </form>

          {/* Live Dispatched Events Log */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                Eventos de demostración:
              </span>
              <span className="text-[10px] text-amber-400 font-mono">Sin envío externo</span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5 scrollbar-none pr-1">
              {events.slice(0, 6).map((evt) => (
                <div
                  key={evt.id}
                  className="bg-neutral-900/80 p-2 rounded-lg border border-neutral-800 flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white font-mono block">{evt.eventName}</strong>
                      <span className="text-[10px] text-neutral-400">{evt.timestamp}</span>
                    </div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-950 text-amber-400 font-mono uppercase">
                    {evt.platform}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
