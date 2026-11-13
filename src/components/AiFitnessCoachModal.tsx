import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Flame, Bot, User, ArrowRight, Calendar, MessageCircle, RefreshCw } from 'lucide-react';
import { calculateRoutineRecommendation, FitnessGoal, FitnessLevel, RoutinePlan } from '../utils/fitnessLogic';
import { GYM_CONFIG } from '../data/gymData';

interface Message {
  id: string;
  sender: 'coach' | 'user';
  text: string;
  plan?: RoutinePlan;
  timestamp: string;
}

interface AiFitnessCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingForClass: (className: string) => void;
}

export const AiFitnessCoachModal: React.FC<AiFitnessCoachModalProps> = ({
  isOpen,
  onClose,
  onOpenBookingForClass,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-0',
      sender: 'coach',
      text: '¡Hola! Soy Fuego Coach, tu asesor y entrenador virtual en FUEGO FIT Pereira. 🔥 ¿Cuál es tu objetivo físico actual o qué disciplina te llama más la atención (Rumba, pesas, funcional)?',
      timestamp: 'Ahora',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState<FitnessGoal>('fat_loss');
  const [level, setLevel] = useState<FitnessLevel>('intermedio');
  const [days, setDays] = useState<number>(4);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userProfile: {
            goal,
            level,
            daysPerWeek: days,
          },
        }),
      });

      const data = await res.json();
      const replyText = data.reply || '¡Excelente! Vamos a ajustar tu plan en sala.';

      const coachMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'coach',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, coachMsg]);
    } catch (err) {
      const fallbackMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'coach',
        text: '¡Genial! En Fuego Fit Pereira tenemos la combinación perfecta de Rumba Neón y Musculación para alcanzar tu meta. Puedes agendar tu clase de prueba gratuita para que nuestros entrenadores evalúen tu técnica en persona.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInstantPlan = () => {
    const plan = calculateRoutineRecommendation(goal, level, days);
    const planMessage: Message = {
      id: `plan-${Date.now()}`,
      sender: 'coach',
      text: `He estructurado tu ${plan.title} adaptado para ${days} días a la semana en FUEGO FIT Pereira:`,
      plan,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, planMessage]);
  };

  const quickPrompts = [
    'Quiero quemar grasa bailando Rumba',
    'Rutina para hipertrofia y ganar masa',
    '¿Cómo funciona la clase gratis?',
    'Horarios de Rumba Neón Viernes',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-2xl h-[90vh] sm:h-[650px] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.4)]">
              <Sparkles className="w-5 h-5 fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-['Oswald'] uppercase text-white tracking-wide">
                  FUEGO COACH IA
                </h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase">
                  En Línea
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Asesor de rutinas y mejores rutas de entrenamiento en Pereira
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Cerrar asistente"
          >
            ✕
          </button>
        </div>

        {/* Quick Goal Config Bar */}
        <div className="bg-neutral-950 px-4 py-2.5 border-b border-neutral-850 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <span>Objetivo:</span>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as FitnessGoal)}
              className="bg-neutral-900 text-amber-400 font-semibold px-2 py-1 rounded border border-neutral-800 focus:outline-none"
            >
              <option value="fat_loss">Quemar grasa con Rumba</option>
              <option value="hypertrophy">Hipertrofia & Fuerza</option>
              <option value="functional_stamina">Resistencia & Funcional</option>
              <option value="stress_relief_dance">Diversión & Anti-estrés</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400">
            <span>Días:</span>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="bg-neutral-900 text-white font-semibold px-2 py-1 rounded border border-neutral-800 focus:outline-none"
            >
              <option value={3}>3 días/sem</option>
              <option value={4}>4 días/sem</option>
              <option value={5}>5 días/sem</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerateInstantPlan}
            className="px-3 py-1 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 font-bold rounded border border-amber-400/30 transition-colors"
          >
            Generar Mi Ruta
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-neutral-800 text-white'
                    : 'bg-amber-400 text-black'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-neutral-800 text-white rounded-tr-none'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Structured Routine Card */}
                {msg.plan && (
                  <div className="mt-4 pt-3 border-t border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400 font-['Oswald'] uppercase text-sm">
                        {msg.plan.splitName}
                      </span>
                      <span className="text-neutral-400 tabular-nums">
                        Meta: ~{msg.plan.calorieTargetWeekly} kcal/sem
                      </span>
                    </div>

                    <div className="space-y-2">
                      {msg.plan.daysSchedule.map((d) => (
                        <div
                          key={d.dayNumber}
                          className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <strong className="text-white block">{d.dayName}: {d.focus}</strong>
                            <span className="text-neutral-400 text-[11px]">Disciplina: {d.discipline}</span>
                          </div>
                          <span className="text-amber-400 font-mono text-[11px] font-bold shrink-0 ml-2">
                            {d.durationMins} min
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenBookingForClass(msg.plan?.recommendedClasses[0] || 'Rumba Neón');
                        }}
                        className="px-3 py-1.5 bg-amber-400 text-black font-bold rounded-lg text-xs uppercase"
                      >
                        Reservar Clase de esta Ruta
                      </button>
                      <a
                        href={`https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                          `Hola Fuego Fit, Fuego Coach IA me armó la ruta: ${msg.plan.title} (${msg.plan.splitName}). Quiero coordinar mi clase de prueba gratis.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Enviar a WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}

                <span className="block text-[10px] text-neutral-500 mt-1.5 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-black flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-tl-none p-3 text-xs text-neutral-400 flex items-center gap-2">
                <span>Fuego Coach está calculando la mejor rutina para ti...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-900 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 text-[11px] whitespace-nowrap shrink-0 border border-neutral-800 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregúntale a Fuego Coach sobre rutinas, horarios o metas..."
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="p-3 bg-amber-400 hover:bg-amber-300 disabled:bg-neutral-800 disabled:text-neutral-600 text-black rounded-xl font-bold transition-colors shrink-0"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
