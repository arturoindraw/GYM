import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// In-memory bookings store with sample bookings
const bookingsDatabase: Array<{
  id: string;
  code: string;
  className: string;
  day: string;
  time: string;
  instructor: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  status: string;
  createdAt: string;
}> = [
  {
    id: 'b-1',
    code: 'FUEGO-9081',
    className: 'Rumba Neón Fest',
    day: 'Viernes',
    time: '6:30 PM',
    instructor: 'Valentina Restrepo',
    userName: 'Carlos Mejia',
    userPhone: '+57 312 456 7890',
    userEmail: 'carlos@example.com',
    status: 'confirmado',
    createdAt: new Date().toISOString(),
  },
];

// Tracking events log (Meta Pixel & GA4)
const trackingEventsLog: Array<{
  id: string;
  platform: 'meta' | 'google' | 'both';
  eventName: string;
  params: Record<string, unknown>;
  timestamp: string;
}> = [];

// Fitness coach prompt context
const FITNESS_COACH_SYSTEM_INSTRUCTION = `
Eres "FUEGO COACH", el asesor y entrenador personal virtual de FUEGO FIT Club en Pereira, Colombia (Ubicación: Av. Circunvalar con Calle 12, Pereira, Risaralda).
Tu misión es guiar de manera cálida, motivadora, enérgica y profesional a los usuarios para:
1. Recomendar la mejor ruta y rutina de entrenamiento personalizada según sus metas (pérdida de grasa, tonificación, aumento de masa muscular/hipertrofia, resistencia, diversión, alivio de estrés).
2. Conectar sus metas con las disciplinas y zonas de FUEGO FIT Club Pereira:
   - "Rumba Neón / Rumba Fitness": Quema de 500-750 kcal por sesión, ritmo latino (salsa, reggaetón, champeta, merengue), coordinación, liberación de dopamina y comunidad. Dirigido por Valentina Restrepo y Camilo Salsa.
   - "Funcional & HIIT": Circuitos con kettlebells, turf con trineo, cajones pliométricos, cuerdas de batalla. Ideal para acelerar el metabolismo y agilidad.
   - "Musculación & Hypertrophy": Zona de pesas libres, racks de sentadilla Rogue/Eleiko, mancuernas hasta 50kg, máquinas biomecánicas para ganar fuerza y definición muscular.
   - "Indoor Cycling / Power Bike": Sesiones de cardio de alta intensidad con música en vivo e iluminación inmersiva.
3. Responder con precisión sobre horarios, precios (Plan Mensual $110.000 COP, Trimestral $280.000 COP, Anual VIP $890.000 COP) y cómo agendar su primera clase de cortesía gratis mediante WhatsApp (+57 311 789 4520) o en el botón de reserva.
4. Tono: Cercano, enérgico, colombiano y motivador ("¡Vamos con toda!", "¡Bienvenido a la familia Fuego Fit!"). Incluye consejos prácticos de series, repeticiones y nutrición básica (hidratación, proteína).
5. Mantén las respuestas claras, concisas y bien formateadas con viñetas o pasos cuando expliques una rutina.
`;

// AI Coach Endpoint
app.post('/api/gemini/coach', async (req, res) => {
  const { message, history, userProfile } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  // If Gemini API is available, use gemini-3.8-flash
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const profileContext = userProfile
        ? `\nPerfil del usuario: Nivel: ${userProfile.level || 'Intermedio'}, Meta: ${userProfile.goal || 'General'}, Días disponibles: ${userProfile.daysPerWeek || 3} días/sem.`
        : '';

      const fullPrompt = `${profileContext}\n\nPregunta o mensaje del usuario: "${message}"`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: FITNESS_COACH_SYSTEM_INSTRUCTION,
        },
      });

      return res.json({
        reply: response.text || '¡Hola! Estoy listo para armar tu plan. Cuéntame cuál es tu meta principal hoy.',
        source: 'gemini-3.8-flash',
      });
    } catch (err: unknown) {
      console.error('Error invoking Gemini API:', err);
      // Fallback seamlessly to rule-based domain engine
    }
  }

  // High-fidelity fallback coach engine tailored to FUEGO FIT Pereira
  const msgLower = message.toLowerCase();
  let fallbackReply = '';

  if (msgLower.includes('rumba') || msgLower.includes('baile') || msgLower.includes('cardio')) {
    fallbackReply = `¡La Rumba en FUEGO FIT es legendaria! 🔥\n\nNuestras sesiones combinan reggaetón, salsa caleña, merengue y bachata con entrenamiento aeróbico de alta quema calórica (500 a 700 kcal por hora).\n\n📅 **Horarios estrella:**\n• Lunes a Jueves: 7:00 PM y 8:00 AM\n• Viernes Neón Fest: 6:30 PM (luces láser y DJ en vivo)\n• Sábados: 9:30 AM\n\n💡 **Ruta recomendada:** Si buscas bajar porcentaje de grasa y divertirte, te sugiero combinar 3 días de Rumba con 2 días de Musculación o Funcional para tonificar. ¿Quieres que reservemos tu primera clase gratis?`;
  } else if (msgLower.includes('rutina') || msgLower.includes('musculo') || msgLower.includes('fuerza') || msgLower.includes('hipertrofia')) {
    fallbackReply = `¡Excelente objetivo! Para aumentar masa muscular en FUEGO FIT te sugerimos la división **Push-Pull-Legs (Empuje, Tracción, Pierna)**:\n\n• **Día 1 (Empuje):** Press banca plano 4x8-10, Press militar con mancuernas 3x10, Fondos paralelas 3x12, Extensiones tríceps en polea 3x12.\n• **Día 2 (Tracción):** Jalón al pecho 4x10, Remo con barra 4x8, Remo unilateral mancuerna 3x10, Curl bíceps con barra Z 3x12.\n• **Día 3 (Pierna & Core):** Sentadilla libre 4x8, Prensa 45° 3x12, Peso muerto rumano 4x10, Elevación de talones 4x15, Planchas 3x45s.\n• **Día 4:** Descanso activo o 45 min de Rumba para flexibilidad y salud cardiovascular.\n\nEn nuestra sede de Pereira contamos con instructores en sala para supervisar tu técnica.`;
  } else if (msgLower.includes('precio') || msgLower.includes('tarifa') || msgLower.includes('costo') || msgLower.includes('plan') || msgLower.includes('cuanto')) {
    fallbackReply = `Nuestros planes en Pereira están diseñados para darte acceso total a todas las zonas:\n\n1. **Plan Fuego Mensual:** $110.000 COP (Sin cláusula, acceso ilimitado a máquinas, funcional y clases de rumba).\n2. **Plan Trimestral Pro:** $280.000 COP ($93.300/mes) - Incluye valoración antropométrica y plan inicial.\n3. **Plan Anual VIP Elite:** $890.000 COP (El más popular, ahorras 33%, incluye kit Fuego Fit, 2 pases de cortesía mensuales y parqueadero gratis).\n\n¡Puedes probar hoy mismo agendando tu clase de cortesía 100% gratis por WhatsApp!`;
  } else if (msgLower.includes('horario') || msgLower.includes('abren') || msgLower.includes('donde') || msgLower.includes('ubicacion')) {
    fallbackReply = `📍 **Ubicación:** Cra 13 # 12-45, Sector Circunvalar / Pinares, Pereira, Risaralda. (Contamos con parqueadero privado para carros y motos).\n\n⏰ **Horarios de Atención:**\n• Lunes a Viernes: 5:00 AM – 10:00 PM\n• Sábados: 6:00 AM – 6:00 PM\n• Domingos y Festivos: 7:00 AM – 2:00 PM\n\nLas clases de Rumba y Funcional inician desde las 6:00 AM y en la tarde desde las 5:00 PM.`;
  } else {
    fallbackReply = `¡Hola! Soy Fuego Coach, tu asesor en FUEGO FIT Club Pereira. 🏋️‍♂️🔥\n\nEstoy aquí para guiarte en tu viaje fitness. Puedo ayudarte con:\n1. Diseñar una **rutina personalizada** según tu nivel (Principiante, Intermedio, Avanzado).\n2. Combinar **Rumba Neón** con pesas o funcional para resultados rápidos.\n3. Información de **horarios, cupos y reservas**.\n4. Planes y cómo agendar tu **primera clase de cortesía gratis**.\n\n¿Cuál es tu principal objetivo en este momento?`;
  }

  return res.json({
    reply: fallbackReply,
    source: 'fuego-fit-assistant',
  });
});

// Bookings API
app.get('/api/bookings', (_req, res) => {
  res.json({ bookings: bookingsDatabase });
});

app.post('/api/bookings', (req, res) => {
  const { className, day, time, instructor, userName, userPhone, userEmail } = req.body;

  if (!className || !userName || !userPhone) {
    return res.status(400).json({ error: 'Nombre, teléfono y clase son obligatorios' });
  }

  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const code = `FUEGO-${randomDigits}`;

  const newBooking = {
    id: `b-${Date.now()}`,
    code,
    className,
    day: day || 'Hoy',
    time: time || 'Próxima sesión',
    instructor: instructor || 'Staff Fuego Fit',
    userName,
    userPhone,
    userEmail: userEmail || '',
    status: 'confirmado',
    createdAt: new Date().toISOString(),
  };

  bookingsDatabase.unshift(newBooking);

  // Auto record tracking event
  trackingEventsLog.unshift({
    id: `evt-${Date.now()}`,
    platform: 'both',
    eventName: 'ScheduleClass',
    params: {
      className,
      bookingCode: code,
      userName,
    },
    timestamp: new Date().toISOString(),
  });

  return res.status(201).json({
    success: true,
    message: '¡Cupo reservado con éxito!',
    booking: newBooking,
  });
});

// Tracking Pixel & GA4 Event Dispatcher / Inspector
app.post('/api/analytics/track', (req, res) => {
  const { platform = 'both', eventName, params = {} } = req.body;
  const event = {
    id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    platform,
    eventName: eventName || 'PageView',
    params,
    timestamp: new Date().toISOString(),
  };

  trackingEventsLog.unshift(event);
  if (trackingEventsLog.length > 50) trackingEventsLog.pop();

  res.json({ success: true, event });
});

app.get('/api/analytics/events', (_req, res) => {
  res.json({ events: trackingEventsLog });
});

// Setup Vite in Dev or Static in Production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
