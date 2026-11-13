import React, { useState } from 'react';
import { Check, MessageCircle, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { MEMBERSHIP_PLANS, GYM_CONFIG } from '../data/gymData';
import { formatCurrencyCOP } from '../utils/fitnessLogic';

interface PricingSectionProps {
  onSelectPlanForBooking: (planName: string) => void;
  onTrackEvent?: (eventName: string, params: Record<string, unknown>) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlanForBooking,
  onTrackEvent,
}) => {
  const [billingCycle, setBillingCycle] = useState<'all' | 'monthly' | 'longer'>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleQuoteClick = (planName: string, whatsappText: string) => {
    if (onTrackEvent) {
      onTrackEvent('Contact', { planName, source: 'pricing_table' });
    }
    const url = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const faqs = [
    {
      q: '¿Tienen cláusulas de permanencia o cobros automáticos obligatorios?',
      a: '¡Ninguna! En FUEGO FIT puedes pagar mes a mes de forma 100% independiente. Tú decides cuándo renovar.',
    },
    {
      q: '¿El plan incluye acceso a todas las clases de Rumba y sala de pesas?',
      a: 'Sí, todas las membresías otorgan acceso ilimitado tanto a la sala de pesas (musculación), zona funcional y a todas las clases grupales de Rumba Neón.',
    },
    {
      q: '¿Qué métodos de pago reciben en la sede de Pereira?',
      a: 'Recibimos todas las tarjetas débito/crédito, transferencias Bancolombia, Nequi, Daviplata y efectivo en nuestra recepción.',
    },
    {
      q: '¿Puedo congelar mi plan si salgo de viaje o tengo una incapacidad?',
      a: 'Sí, los planes Trimestrales permiten congelación de hasta 10 días, y el Plan Anual VIP hasta por 30 días con previo aviso en recepción.',
    },
  ];

  return (
    <section id="planes" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase block mb-2">
            MEMBRESÍAS & PRECIOS TRANSPARENTES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Oswald'] uppercase text-white tracking-tight mb-4">
            PLANES SIN LETRA PEQUEÑA NI CLÁUSULAS
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Invierte en tu salud física y mental con tarifas competitivas en el sector más exclusivo y seguro de Pereira.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-neutral-950 rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                plan.featured
                  ? 'border-2 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.18)] scale-100 md:-translate-y-2'
                  : 'border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Featured Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-black text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black font-['Oswald'] uppercase text-white tracking-wide mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-neutral-400 mb-6">
                  {plan.description}
                </p>

                {/* Price Display with Tabular Figures */}
                <div className="mb-6 pb-6 border-b border-neutral-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black font-['Oswald'] text-white tabular-nums">
                      {formatCurrencyCOP(plan.price)}
                    </span>
                    <span className="text-xs text-neutral-400 uppercase font-medium">COP</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mt-1">
                    <span>{plan.period}</span>
                    {plan.monthlyEquivalent && (
                      <span className="text-amber-400 font-semibold tabular-nums">
                        Equivale a {plan.monthlyEquivalent}
                      </span>
                    )}
                  </div>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3 mb-8">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => handleQuoteClick(plan.name, plan.whatsappText)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    plan.featured
                      ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'bg-neutral-900 border border-neutral-700 text-white hover:border-amber-400 hover:text-amber-400'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Cotizar / Inscribir por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectPlanForBooking(plan.name)}
                  className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  O reserva tu clase de prueba gratis primero
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold font-['Oswald'] uppercase text-white">
              Preguntas Frecuentes sobre Tarifas y Membresías
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-neutral-800/80 pb-4 last:border-0 last:pb-0"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left flex items-center justify-between text-sm font-semibold text-neutral-200 hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-400 font-mono text-base ml-2">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === index && (
                  <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed pl-2 border-l border-amber-400/30">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
