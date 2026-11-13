/**
 * Pure fitness and gym booking domain logic
 */

export type FitnessGoal = 'fat_loss' | 'hypertrophy' | 'functional_stamina' | 'stress_relief_dance';
export type FitnessLevel = 'principiante' | 'intermedio' | 'avanzado';

export interface RoutinePlan {
  title: string;
  splitName: string;
  recommendedClasses: string[];
  weeklyDays: number;
  calorieTargetWeekly: number;
  summary: string;
  daysSchedule: Array<{
    dayNumber: number;
    dayName: string;
    focus: string;
    discipline: string;
    durationMins: number;
  }>;
}

export function calculateRoutineRecommendation(
  goal: FitnessGoal,
  level: FitnessLevel,
  daysPerWeek: number
): RoutinePlan {
  const safeDays = Math.max(2, Math.min(6, daysPerWeek));

  if (goal === 'fat_loss' || goal === 'stress_relief_dance') {
    return {
      title: 'Plan Rumba Burn & Tonificación',
      splitName: 'Cardio Dance Dinámico + Fuerza Funcional',
      recommendedClasses: ['Rumba Neón Fest', 'Entrenamiento Funcional HIIT', 'Core & Glúteos'],
      weeklyDays: safeDays,
      calorieTargetWeekly: safeDays * 550,
      summary: 'Combinación de baile de alta energía con circuitos de resistencia metabólica para acelerar el déficit calórico y elevar endorfinas.',
      daysSchedule: Array.from({ length: safeDays }, (_, i) => {
        const isDance = i % 2 === 0;
        return {
          dayNumber: i + 1,
          dayName: `Día ${i + 1}`,
          focus: isDance ? 'Cardio & Quema Calórica Rumbera' : 'Circuito Metabólico con Mancuernas',
          discipline: isDance ? 'Rumba Neón Fest' : 'Funcional HIIT',
          durationMins: isDance ? 60 : 45,
        };
      }),
    };
  }

  if (goal === 'hypertrophy') {
    return {
      title: 'Plan Fuego Fuerza & Hipertrofia',
      splitName: 'Push - Pull - Legs (Empuje, Tracción, Pierna)',
      recommendedClasses: ['Musculación Sala de Pesas', 'Power Core', 'Rumba Recuperación Activa'],
      weeklyDays: safeDays,
      calorieTargetWeekly: safeDays * 420,
      summary: 'Sobrecarga progresiva en peso libre y máquinas biomecánicas con una sesión de rumba para descongestión y movilidad.',
      daysSchedule: Array.from({ length: safeDays }, (_, i) => {
        const splits = ['Empuje (Pecho, Hombro, Tríceps)', 'Tracción (Espalda, Bíceps)', 'Pierna Completa & Core', 'Rumba Recuperación & Movilidad'];
        const split = splits[i % splits.length];
        return {
          dayNumber: i + 1,
          dayName: `Día ${i + 1}`,
          focus: split,
          discipline: split.includes('Rumba') ? 'Rumba Neón' : 'Musculación Pesas',
          durationMins: 60,
        };
      }),
    };
  }

  // functional_stamina
  return {
    title: 'Plan Rendimiento & Agilidad Total',
    splitName: 'Híbrido Atlético (Turf + Kettlebells + Baile)',
    recommendedClasses: ['Funcional Cross Training', 'Rumba Beat', 'Indoor Cycling'],
    weeklyDays: safeDays,
    calorieTargetWeekly: safeDays * 500,
    summary: 'Aumento de VO2 max, agilidad y fuerza isométrica con los mejores entrenadores del Eje Cafetero.',
    daysSchedule: Array.from({ length: safeDays }, (_, i) => ({
      dayNumber: i + 1,
      dayName: `Día ${i + 1}`,
      focus: i % 2 === 0 ? 'Fuerza Funcional & Trineo' : 'Rumba o Cycling de Alta Cadencia',
      discipline: i % 2 === 0 ? 'Funcional Turf' : 'Rumba Neón',
      durationMins: 50,
    })),
  };
}

export function validateBookingInput(data: {
  userName: string;
  userPhone: string;
  userEmail?: string;
  availableSpots: number;
}): { isValid: boolean; error?: string } {
  if (!data.userName || data.userName.trim().length < 3) {
    return { isValid: false, error: 'Por favor ingresa tu nombre completo (mínimo 3 caracteres).' };
  }

  const cleanPhone = data.userPhone.replace(/[\s\-\(\)\+]/g, '');
  if (!cleanPhone || cleanPhone.length < 7 || !/^\d+$/.test(cleanPhone)) {
    return { isValid: false, error: 'Por favor ingresa un número de teléfono o WhatsApp válido.' };
  }

  if (data.availableSpots <= 0) {
    return { isValid: false, error: 'Esta clase no tiene cupos disponibles en este momento.' };
  }

  if (data.userEmail && data.userEmail.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.userEmail.trim())) {
      return { isValid: false, error: 'El correo electrónico no tiene un formato válido.' };
    }
  }

  return { isValid: true };
}

export function formatCurrencyCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateSavingsPercentage(monthlyRate: number, planPrice: number, months: number): number {
  if (months <= 1 || monthlyRate <= 0) return 0;
  const fullPrice = monthlyRate * months;
  const savings = Math.max(0, fullPrice - planPrice);
  return Math.round((savings / fullPrice) * 100);
}
