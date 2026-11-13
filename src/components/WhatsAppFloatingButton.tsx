import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymData';

interface WhatsAppFloatingButtonProps {
  onTrackEvent?: (eventName: string, params: Record<string, unknown>) => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ onTrackEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissedTeaser, setHasDismissedTeaser] = useState(false);

  const quickMessages = [
    { label: '🔥 Agendar clase gratis', text: '¡Hola Fuego Fit! Quiero agendar mi primera clase gratis en Pereira.' },
    { label: '💃 Horarios Rumba Neón', text: 'Hola, ¿a qué hora son las clases de Rumba Neón esta semana?' },
    { label: '💳 Precios y Promociones', text: 'Hola, deseo cotizar las membresías mensual y anual de Fuego Fit.' },
    { label: '📍 Ubicación y Parqueadero', text: 'Hola, ¿dónde están ubicados exactamente y si tienen parqueadero?' },
  ];

  const handleOpenWhatsApp = (customText?: string) => {
    const message = customText || GYM_CONFIG.defaultWhatsAppMessage;
    if (onTrackEvent) {
      onTrackEvent('Contact', { type: 'whatsapp_floating', message });
    }
    const url = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Teaser Bubble (Colombia local high-conversion) */}
      {!hasDismissedTeaser && !isOpen && (
        <div className="mb-2 p-3 bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl max-w-[270px] sm:max-w-xs flex items-start gap-2.5 text-left">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4 fill-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">¿Tienes dudas en Pereira?</p>
            <p className="text-[11px] text-neutral-300 mt-0.5">
              Escríbenos por WhatsApp y agenda tu clase de cortesía 100% gratis hoy.
            </p>
            <button
              type="button"
              onClick={() => handleOpenWhatsApp()}
              className="mt-2 text-[11px] font-bold text-amber-400 hover:text-amber-300 underline block"
            >
              Chatear ahora →
            </button>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHasDismissedTeaser(true);
            }}
            className="text-neutral-500 hover:text-white p-0.5"
            aria-label="Cerrar mensaje emergente"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Expanded Quick Selector Popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-4 animate-fade-in text-left">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <strong className="text-xs text-white block">Recepción FUEGO FIT</strong>
                <span className="text-[10px] text-neutral-400">Pereira · Respuesta en &lt; 5 min</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white text-sm"
              aria-label="Cerrar selector"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-neutral-300 mb-3">
            Elige una opción rápida para iniciar conversación directa en WhatsApp:
          </p>

          <div className="space-y-1.5 mb-3">
            {quickMessages.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleOpenWhatsApp(item.text)}
                className="w-full text-left p-2 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs text-neutral-200 hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <Send className="w-3 h-3 text-neutral-500" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleOpenWhatsApp()}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Abrir WhatsApp Libre</span>
          </button>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-[0_4px_25px_rgba(16,185,129,0.4)] transition-transform hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Abrir WhatsApp de FUEGO FIT Club"
      >
        <MessageCircle className="w-7 h-7 fill-black" />
      </button>
    </div>
  );
};
