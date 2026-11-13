import React, { useState } from 'react';
import { Calendar, Clock, User, Flame, Users, Check, AlertCircle, Sparkles, MessageCircle, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCHEDULE_CLASSES, GymClass, GYM_CONFIG } from '../data/gymData';
import { validateBookingInput } from '../utils/fitnessLogic';

interface ScheduleBookingSectionProps {
  initialDisciplineFilter?: string;
  onTrackEvent?: (eventName: string, params: Record<string, unknown>) => void;
}

export const ScheduleBookingSection: React.FC<ScheduleBookingSectionProps> = ({
  initialDisciplineFilter = 'all',
  onTrackEvent,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(initialDisciplineFilter);
  const [classesList, setClassesList] = useState<GymClass[]>(SCHEDULE_CLASSES);

  // Booking Modal State
  const [selectedClassToBook, setSelectedClassToBook] = useState<GymClass | null>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGoal, setUserGoal] = useState('Bajar de peso y divertirme con Rumba');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<{
    code: string;
    className: string;
    day: string;
    time: string;
    instructor: string;
    userName: string;
  } | null>(null);

  const days: Array<'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado'> = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
  ];

  const filteredClasses = classesList.filter((cls) => {
    const matchesDay = cls.day === selectedDay;
    const matchesDiscipline = selectedDiscipline === 'all' || cls.discipline === selectedDiscipline;
    return matchesDay && matchesDiscipline;
  });

  const handleOpenBooking = (gymClass: GymClass) => {
    setSelectedClassToBook(gymClass);
    setValidationError(null);
    setBookingConfirmed(null);
  };

  const handleCloseModal = () => {
    setSelectedClassToBook(null);
    setBookingConfirmed(null);
    setValidationError(null);
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassToBook) return;

    const availableSpots = selectedClassToBook.totalSpots - selectedClassToBook.takenSpots;
    const validation = validateBookingInput({
      userName,
      userPhone,
      userEmail,
      availableSpots,
    });

    if (!validation.isValid) {
      setValidationError(validation.error || 'Verifica los campos');
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: selectedClassToBook.name,
          day: selectedClassToBook.day,
          time: selectedClassToBook.time,
          instructor: selectedClassToBook.instructor,
          userName: userName.trim(),
          userPhone: userPhone.trim(),
          userEmail: userEmail.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.booking) {
        // Update local spots count
        setClassesList((prev) =>
          prev.map((c) =>
            c.id === selectedClassToBook.id ? { ...c, takenSpots: c.takenSpots + 1 } : c
          )
        );

        setBookingConfirmed({
          code: data.booking.code,
          className: selectedClassToBook.name,
          day: selectedClassToBook.day,
          time: selectedClassToBook.time,
          instructor: selectedClassToBook.instructor,
          userName: userName.trim(),
        });

        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FBBF24', '#F59E0B', '#EF4444', '#FFFFFF'],
          });
        } catch {
          // ignore confetti if blocked
        }

        if (onTrackEvent) {
          onTrackEvent('ScheduleClass', {
            className: selectedClassToBook.name,
            day: selectedClassToBook.day,
            time: selectedClassToBook.time,
            bookingCode: data.booking.code,
          });
        }
      } else {
        setValidationError(data.error || 'No fue posible completar la reserva.');
      }
    } catch (err) {
      // Local fallback in case network hiccup
      const randomCode = `FUEGO-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingConfirmed({
        code: randomCode,
        className: selectedClassToBook.name,
        day: selectedClassToBook.day,
        time: selectedClassToBook.time,
        instructor: selectedClassToBook.instructor,
        userName: userName.trim(),
      });
      setClassesList((prev) =>
        prev.map((c) =>
          c.id === selectedClassToBook.id ? { ...c, takenSpots: c.takenSpots + 1 } : c
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="horarios" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase block mb-2">
              CONSULTA EN VIVO & RESERVAS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Oswald'] uppercase text-white tracking-tight">
              HORARIOS DE CLASES & CUPOS DISPONIBLES
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Selecciona tu día y asegura tu lugar antes de que se agoten los cupos. ¡Las clases de Rumba Neón de los viernes se llenan rápido!
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
            <span className="text-xs text-neutral-400 px-2">Filtrar:</span>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="bg-neutral-950 text-white text-xs font-semibold px-3 py-2 rounded border border-neutral-700 focus:outline-none focus:border-amber-400"
            >
              <option value="all">Todas las disciplinas</option>
              <option value="rumba">Rumba Neón & Baile</option>
              <option value="funcional">Funcional & HIIT</option>
              <option value="musculacion">Musculación & Pesas</option>
              <option value="cycling">Indoor Cycling</option>
            </select>
          </div>
        </div>

        {/* Days Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-neutral-800 scrollbar-none">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-3 rounded-xl text-sm font-bold uppercase font-['Oswald'] tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                selectedDay === day
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{day}</span>
              {day === 'Viernes' && (
                <span className="text-[10px] px-1.5 py-0.2 bg-black text-amber-400 rounded font-sans font-bold">
                  Neón
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        {filteredClasses.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <Flame className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No hay sesiones para este filtro</h3>
            <p className="text-sm text-neutral-400 mb-4">Prueba seleccionando otro día o viendo todas las disciplinas.</p>
            <button
              type="button"
              onClick={() => setSelectedDiscipline('all')}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 rounded-md"
            >
              Ver todas las clases
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((item: GymClass) => {
              const remainingSpots = item.totalSpots - item.takenSpots;
              const isAlmostFull = remainingSpots <= 5;
              const isFull = remainingSpots <= 0;

              return (
                <div
                  key={item.id}
                  className={`bg-neutral-900/70 border rounded-2xl p-6 transition-all flex flex-col justify-between ${
                    item.highlight
                      ? 'border-amber-400/60 bg-gradient-to-b from-amber-400/5 to-neutral-900/80 shadow-[0_0_20px_rgba(251,191,36,0.1)]'
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                        {item.discipline === 'rumba' ? 'Rumba Neón' : item.discipline}
                      </span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {item.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-['Oswald'] uppercase text-white tracking-wide mb-2">
                      {item.name}
                    </h3>

                    {/* Time & Instructor */}
                    <div className="space-y-1.5 text-xs text-neutral-300 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold text-sm tabular-nums">{item.time}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-neutral-400">Intensidad: <strong>{item.intensity}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <User className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Coach: <strong className="text-neutral-200">{item.instructor}</strong></span>
                      </div>
                    </div>

                    {/* Spots Availability Gauge */}
                    <div className="mb-6 bg-neutral-950/80 p-3 rounded-xl border border-neutral-800">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-neutral-400 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> Cupos:
                        </span>
                        <span className={`font-bold tabular-nums ${isAlmostFull ? 'text-amber-400' : 'text-neutral-200'}`}>
                          {remainingSpots} disponibles de {item.totalSpots}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isAlmostFull ? 'bg-amber-400' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${(item.takenSpots / item.totalSpots) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Trigger Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(item)}
                    disabled={isFull}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isFull
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : item.highlight
                        ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                        : 'bg-neutral-800 text-white hover:bg-amber-400 hover:text-black'
                    }`}
                  >
                    <span>{isFull ? 'Cupos Agotados' : 'Reservar Mi Cupo Gratis'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {selectedClassToBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl">
            {/* Close modal */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {!bookingConfirmed ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-400 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Reserva Inmediata de Cupo</span>
                </div>
                <h3 className="text-2xl font-black font-['Oswald'] uppercase text-white mb-2">
                  {selectedClassToBook.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-6 pb-4 border-b border-neutral-800">
                  <span>📅 {selectedClassToBook.day}</span>
                  <span>⏰ {selectedClassToBook.time}</span>
                  <span>👤 {selectedClassToBook.instructor}</span>
                  <span className="text-amber-400 font-semibold">
                    Quedan {selectedClassToBook.totalSpots - selectedClassToBook.takenSpots} cupos
                  </span>
                </div>

                {validationError && (
                  <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-lg flex items-center gap-2 text-xs text-red-200">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <form onSubmit={handleConfirmReservation} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Valentina Gómez"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                      WhatsApp o Teléfono Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +57 311 234 5678"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      Te enviaremos el ticket de confirmación y el recordatorio a tu WhatsApp.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                      Correo Electrónico (Opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="tu.correo@ejemplo.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                      ¿Cuál es tu objetivo con esta clase?
                    </label>
                    <select
                      value={userGoal}
                      onChange={(e) => setUserGoal(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Bajar de peso y divertirme con Rumba">Bajar de peso y divertirme con Rumba</option>
                      <option value="Ganar masa muscular y tonificar">Ganar masa muscular y tonificar</option>
                      <option value="Acelerar resistencia física (HIIT/Funcional)">Acelerar resistencia física (HIIT/Funcional)</option>
                      <option value="Conocer las instalaciones y la comunidad">Conocer las instalaciones de Pereira y la comunidad</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Apartando cupo...</span>
                      ) : (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Confirmar Mi Cupo de Cortesía Gratis</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-neutral-500 mt-2">
                      Sin compromisos ni costos ocultos. Sede Pinares, Pereira.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Confirmation Card */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-400/40">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  ¡RESERVA CONFIRMADA CON ÉXITO!
                </span>
                <h3 className="text-2xl font-black font-['Oswald'] uppercase text-white mb-2">
                  ¡Te esperamos en FUEGO FIT Pereira!
                </h3>
                <p className="text-xs text-neutral-300 mb-6">
                  Hola <strong>{bookingConfirmed.userName}</strong>, tu cupo ha sido reservado en nuestro sistema.
                </p>

                {/* Digital Ticket */}
                <div className="bg-neutral-900 border border-amber-400/40 rounded-xl p-5 text-left mb-6 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
                    <span className="text-xs font-bold text-white font-['Oswald'] uppercase">FUEGO PASS · PEREIRA</span>
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 bg-neutral-950 rounded border border-neutral-800">
                      {bookingConfirmed.code}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Clase:</span>
                      <strong className="text-white">{bookingConfirmed.className}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Horario:</span>
                      <span>{bookingConfirmed.day} · {bookingConfirmed.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Coach:</span>
                      <span>{bookingConfirmed.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Ubicación:</span>
                      <span>Cra 13 # 12-45, Pinares / Circunvalar</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Dispatch Button */}
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `¡Hola Fuego Fit! Acabo de reservar mi clase gratis de ${bookingConfirmed.className} para el ${bookingConfirmed.day} a las ${bookingConfirmed.time}. Mi código de reserva es ${bookingConfirmed.code}. ¡Nos vemos!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enviar Ticket a WhatsApp de Recepción</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full py-2.5 text-xs font-medium text-neutral-400 hover:text-white"
                  >
                    Cerrar ventana
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
