import functionalImage from '../assets/images/discipline_functional_zone_1794087240813.jpg';
import weightsImage from '../assets/images/discipline_musculacion_weights_1794087240805.jpg';
import rumbaImage from '../assets/images/discipline_rumba_dance_1794087239794.jpg';
import heroImage from '../assets/images/hero_gym_pereira_1794087239057.jpg';

export interface GymClass {
  id: string;
  name: string;
  discipline: 'rumba' | 'funcional' | 'musculacion' | 'cycling';
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
  time: string;
  duration: string;
  instructor: string;
  intensity: 'Media' | 'Alta' | 'Muy Alta';
  totalSpots: number;
  takenSpots: number;
  highlight?: boolean;
}

export interface DisciplineZone {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  calories: string;
  targetAudience: string;
  features: string[];
}

export const GYM_CONFIG = {
  name: 'FUEGO FIT Club',
  city: 'Pereira, Colombia',
  address: 'Cra 13 # 12-45, Sector Circunvalar - Pinares',
  phoneDisplay: '+57 311 789 4520',
  whatsappNumber: '573117894520',
  instagram: '@fuegofitpereira',
  googleRating: 4.9,
  reviewsCount: 348,
  activeMembers: 1850,
  defaultWhatsAppMessage: 'Hola Fuego Fit, quiero agendar mi clase de cortesía gratis y conocer los horarios en Pereira.',
};

export const GYM_IMAGES = {
  functional: functionalImage,
  weights: weightsImage,
  rumba: rumbaImage,
  hero: heroImage,
};

export const DISCIPLINE_ZONES: DisciplineZone[] = [
  {
    id: 'rumba',
    title: 'Rumba Neón & Dance Fitness',
    subtitle: 'El corazón y ritmo de FUEGO FIT',
    description: 'Nuestra clase insignia en Pereira. Coreografías explosivas de salsa caleña, reggaetón, bachata y champeta en un estudio con acústica profesional e iluminación Neón reactiva.',
    image: GYM_IMAGES.rumba,
    calories: '550 - 750 kcal / sesión',
    targetAudience: 'Todos los niveles: quema de grasa, diversión, estrés cero y comunidad.',
    features: [
      'Estudio climatizado con piso amortiguado de madera',
      'Luces Neón UV y DJ set en vivo los viernes',
      'Instructores certificados en danza y ritmos latinos',
      'Clases matutinas y nocturnas todos los días',
    ],
  },
  {
    id: 'musculacion',
    title: 'Musculación & Sala de Fuerza',
    subtitle: 'Biomecánica y sobrecarga progresiva',
    description: 'Zona de pesas libres y máquinas de última generación diseñadas para hipertrofia y fuerza. Jaulas de potencia, mancuernas de hasta 50 kg y bancos de competición.',
    image: GYM_IMAGES.weights,
    calories: '350 - 500 kcal / sesión',
    targetAudience: 'Ganancia de masa muscular, tonificación y salud postural.',
    features: [
      'Barras olímpicas y discos bumpers de uretano',
      'Racks de sentadilla Eleiko y máquinas de poleas cruzadas',
      'Área especializada en tren inferior y glúteos',
      'Entrenadores de planta para corrección técnica',
    ],
  },
  {
    id: 'funcional',
    title: 'Entrenamiento Funcional & Turf',
    subtitle: 'Rendimiento atlético y circuitos HIIT',
    description: 'Pista de grama sintética (turf) para trineo, cuerdas de batalla, kettlebells rusas, cajones pliométricos y balones medicinales para elevar tu condición física integral.',
    image: GYM_IMAGES.functional,
    calories: '500 - 700 kcal / sesión',
    targetAudience: 'Aceleración metabólica, agilidad, potencia y resistencia.',
    features: [
      'Pista de turf de 25 metros con empuje de trineo',
      'Kettlebells calibradas de 4 kg hasta 32 kg',
      'Monitoreo de frecuencia cardíaca opcional',
      'WODs diarios que varían constantemente',
    ],
  },
  {
    id: 'cycling',
    title: 'Indoor Power Cycling',
    subtitle: 'Cardio inmersivo de alta potencia',
    description: 'Bicicletas magnéticas de precisión con volante de inercia silencioso. Ritmos envolventes, subidas virtuales de montaña y sprints de alta cadencia para tonificar piernas.',
    image: GYM_IMAGES.hero,
    calories: '600 - 800 kcal / sesión',
    targetAudience: 'Capacidad pulmonar, quema calórica extrema y piernas de acero.',
    features: [
      'Bicicletas con potenciómetro y resistencia magnética',
      'Pantalla gigante de recorrido interactivo',
      'Pedales mixtos para zapatillas SPD o calzado deportivo',
      'Música motivacional con sonido estéreo envolvente',
    ],
  },
];

export const SCHEDULE_CLASSES: GymClass[] = [
  // Lunes
  {
    id: 'cls-1',
    name: 'Rumba Fitness Amanecer',
    discipline: 'rumba',
    day: 'Lunes',
    time: '6:30 AM',
    duration: '55 min',
    instructor: 'Valentina Restrepo',
    intensity: 'Alta',
    totalSpots: 35,
    takenSpots: 28,
  },
  {
    id: 'cls-2',
    name: 'Funcional HIIT Met-Burn',
    discipline: 'funcional',
    day: 'Lunes',
    time: '7:30 AM',
    duration: '50 min',
    instructor: 'Mateo Cárdenas',
    intensity: 'Muy Alta',
    totalSpots: 20,
    takenSpots: 16,
  },
  {
    id: 'cls-3',
    name: 'Musculación: Técnica de Sentadilla & Peso Muerto',
    discipline: 'musculacion',
    day: 'Lunes',
    time: '6:00 PM',
    duration: '60 min',
    instructor: 'Esteban Loaiza',
    intensity: 'Alta',
    totalSpots: 15,
    takenSpots: 11,
  },
  {
    id: 'cls-4',
    name: 'Rumba Sensación Tropical',
    discipline: 'rumba',
    day: 'Lunes',
    time: '7:00 PM',
    duration: '60 min',
    instructor: 'Camilo Salsa',
    intensity: 'Muy Alta',
    totalSpots: 40,
    takenSpots: 37,
    highlight: true,
  },

  // Martes
  {
    id: 'cls-5',
    name: 'Indoor Cycling Sprints',
    discipline: 'cycling',
    day: 'Martes',
    time: '6:30 AM',
    duration: '45 min',
    instructor: 'Diana Marín',
    intensity: 'Muy Alta',
    totalSpots: 25,
    takenSpots: 20,
  },
  {
    id: 'cls-6',
    name: 'Funcional Core & Glúteo',
    discipline: 'funcional',
    day: 'Martes',
    time: '6:00 PM',
    duration: '50 min',
    instructor: 'Valentina Restrepo',
    intensity: 'Alta',
    totalSpots: 20,
    takenSpots: 18,
  },
  {
    id: 'cls-7',
    name: 'Rumba Urbana & Reggaetón',
    discipline: 'rumba',
    day: 'Martes',
    time: '7:15 PM',
    duration: '60 min',
    instructor: 'Camilo Salsa',
    intensity: 'Alta',
    totalSpots: 40,
    takenSpots: 35,
    highlight: true,
  },

  // Miércoles
  {
    id: 'cls-8',
    name: 'Rumba Cardio Latino',
    discipline: 'rumba',
    day: 'Miércoles',
    time: '7:00 AM',
    duration: '55 min',
    instructor: 'Valentina Restrepo',
    intensity: 'Media',
    totalSpots: 35,
    takenSpots: 22,
  },
  {
    id: 'cls-9',
    name: 'Cross Turf & Trineo',
    discipline: 'funcional',
    day: 'Miércoles',
    time: '6:30 PM',
    duration: '50 min',
    instructor: 'Mateo Cárdenas',
    intensity: 'Muy Alta',
    totalSpots: 20,
    takenSpots: 17,
  },
  {
    id: 'cls-10',
    name: 'Rumba Neón Night',
    discipline: 'rumba',
    day: 'Miércoles',
    time: '7:30 PM',
    duration: '60 min',
    instructor: 'Valentina Restrepo',
    intensity: 'Muy Alta',
    totalSpots: 40,
    takenSpots: 38,
    highlight: true,
  },

  // Jueves
  {
    id: 'cls-11',
    name: 'Indoor Cycling Intervalos',
    discipline: 'cycling',
    day: 'Jueves',
    time: '6:30 AM',
    duration: '50 min',
    instructor: 'Diana Marín',
    intensity: 'Alta',
    totalSpots: 25,
    takenSpots: 19,
  },
  {
    id: 'cls-12',
    name: 'Musculación: Hipertrofia Tren Superior',
    discipline: 'musculacion',
    day: 'Jueves',
    time: '6:00 PM',
    duration: '60 min',
    instructor: 'Esteban Loaiza',
    intensity: 'Alta',
    totalSpots: 15,
    takenSpots: 13,
  },
  {
    id: 'cls-13',
    name: 'Rumba Salsa Caleña & Champeta',
    discipline: 'rumba',
    day: 'Jueves',
    time: '7:15 PM',
    duration: '60 min',
    instructor: 'Camilo Salsa',
    intensity: 'Muy Alta',
    totalSpots: 40,
    takenSpots: 39,
  },

  // Viernes
  {
    id: 'cls-14',
    name: 'Funcional Warrior WOD',
    discipline: 'funcional',
    day: 'Viernes',
    time: '7:00 AM',
    duration: '50 min',
    instructor: 'Mateo Cárdenas',
    intensity: 'Muy Alta',
    totalSpots: 20,
    takenSpots: 14,
  },
  {
    id: 'cls-15',
    name: 'RUMBA NEÓN FEST CON DJ',
    discipline: 'rumba',
    day: 'Viernes',
    time: '6:30 PM',
    duration: '75 min',
    instructor: 'Valentina & Camilo (Dúo)',
    intensity: 'Muy Alta',
    totalSpots: 50,
    takenSpots: 44,
    highlight: true,
  },

  // Sábado
  {
    id: 'cls-16',
    name: 'Super Rumba Weekend Pereira',
    discipline: 'rumba',
    day: 'Sábado',
    time: '9:00 AM',
    duration: '60 min',
    instructor: 'Valentina Restrepo',
    intensity: 'Alta',
    totalSpots: 45,
    takenSpots: 36,
    highlight: true,
  },
  {
    id: 'cls-17',
    name: 'Bootcamp Funcional Grupal',
    discipline: 'funcional',
    day: 'Sábado',
    time: '10:30 AM',
    duration: '60 min',
    instructor: 'Mateo Cárdenas',
    intensity: 'Muy Alta',
    totalSpots: 25,
    takenSpots: 21,
  },
];

export const MEMBERSHIP_PLANS = [
  {
    id: 'plan-mensual',
    name: 'Plan Mensual Libre',
    badge: 'Flexibilidad Total',
    price: 110000,
    period: 'por mes',
    featured: false,
    description: 'Perfecto si buscas entrenar sin cláusulas ni ataduras en el mejor gym de Pereira.',
    benefits: [
      'Acceso total a sala de pesas y musculación',
      'Todas las clases grupales de Rumba y Baile',
      'Zona funcional y pista de turf libre',
      'Lockers, duchas calientes y vestieres VIP',
      'Sin contrato ni penalidad de cancelación',
    ],
    whatsappText: 'Hola Fuego Fit, me interesa inscribirme en el Plan Mensual Libre ($110.000 COP).',
  },
  {
    id: 'plan-trimestral',
    name: 'Plan Trimestral Pro',
    badge: 'Ahorra 15%',
    price: 280000,
    period: 'por 3 meses',
    monthlyEquivalent: '$93.300 / mes',
    featured: true,
    description: 'El plazo ideal para notar cambios visibles en definición, pérdida de grasa y resistencia.',
    benefits: [
      'Todo lo incluido en el Plan Mensual',
      '1 Valoración antropométrica con bioimpedancia',
      'Acceso prioritario a clases de Rumba Neón Fest',
      'Plan de entrenamiento inicial con asesor de planta',
      'Congelación de plan hasta por 10 días',
    ],
    whatsappText: 'Hola Fuego Fit, quiero aprovechar la promo del Plan Trimestral Pro ($280.000 COP).',
  },
  {
    id: 'plan-anual-vip',
    name: 'Plan Anual VIP Élite',
    badge: 'Ahorra 33% · Más Elegido',
    price: 890000,
    period: 'por 1 año',
    monthlyEquivalent: '$74.100 / mes',
    featured: false,
    description: 'La membresía definitiva para transformar tu estilo de vida con beneficios exclusivos todo el año.',
    benefits: [
      'Acceso ilimitado los 365 días del año',
      'Kit Fuego Fit de bienvenida (toalla + termo deportivo)',
      '2 Pases de cortesía para amigos cada mes',
      '4 Valoraciones corporales trimestrales con nutricionista',
      'Parqueadero privado reservado y seguro',
      'Congelación de membresía hasta por 30 días',
    ],
    whatsappText: 'Hola Fuego Fit, deseo información para adquirir el Plan Anual VIP Élite ($890.000 COP).',
  },
];

export const GOOGLE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Mariana Giraldo Duque',
    timeAgo: 'Hace 3 días',
    rating: 5,
    text: '¡Las clases de Rumba con Valentina son de otro planeta! En Pereira no hay ningún gimnasio con esta energía y sonido. Las luces neón y la música hacen que la hora pase volando. He bajado 4 kilos en un mes y no falto ni un viernes.',
    verified: true,
    tag: 'Rumba Neón Fest',
  },
  {
    id: 'rev-2',
    author: 'Felipe Osorio S.',
    timeAgo: 'Hace 1 semana',
    rating: 5,
    text: 'La zona de musculación tiene máquinas excelentes, nada desajustado y mancuernas de peso real para entrenar pesado. Los entrenadores no se quedan en el celular como en otros gyms, siempre están pendientes de tu postura.',
    verified: true,
    tag: 'Musculación Pesas',
  },
  {
    id: 'rev-3',
    author: 'Camila Henao Rivera',
    timeAgo: 'Hace 2 semanas',
    rating: 5,
    text: 'Ubicación 10/10 en Pinares con parqueadero amplio. El ambiente es súper acogedor, limpio y las duchas impecables. Agendar los cupos desde la web o el WhatsApp es facilísimo.',
    verified: true,
    tag: 'Instalaciones & Servicio',
  },
  {
    id: 'rev-4',
    author: 'Sebastián Betancur',
    timeAgo: 'Hace 3 semanas',
    rating: 5,
    text: 'El funcional en la pista de turf con trineo te revienta en el mejor sentido. Es el mejor cardio para quienes nos aburre la caminadora. Recomendadísimo para la gente de Pereira.',
    verified: true,
    tag: 'Entrenamiento Funcional',
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: GYM_IMAGES.rumba,
    likes: '1.240',
    comments: '88',
    caption: '¡VIERNES DE RUMBA NEÓN EN PEREIRA! 🔥 Así se vivió el lleno total con nuestra familia Fuego Fit. ¡La salsa y el reggaetón se sudan con el corazón! Etiqueta a tu partner de baile 🕺💃 #FuegoFitPereira #RumbaFitness #PereiraFitness',
    type: 'Reel',
    date: 'Ayer',
  },
  {
    id: 'ig-2',
    image: GYM_IMAGES.functional,
    likes: '890',
    comments: '42',
    caption: 'La disciplina vence al talento cuando el talento no se esfuerza. Pista de turf activa con el WOD de resistencia atlética de hoy. ¿Ya entrenaste hoy? #CardioIntenso #EntrenamientoFuncional #GymPereira',
    type: 'Foto',
    date: 'Hace 2 días',
  },
  {
    id: 'ig-3',
    image: GYM_IMAGES.weights,
    likes: '1.450',
    comments: '112',
    caption: 'Zona de hierro lista. Racks calibrados, ambiente oscuro con la mejor energía para romper tus marcas de sentadilla y press banca. ¡Acceso ilimitado desde las 5:00 AM! #FuerzaPura #Hypertrophy #NoExcuses',
    type: 'Foto',
    date: 'Hace 4 días',
  },
  {
    id: 'ig-4',
    image: GYM_IMAGES.hero,
    likes: '2.100',
    comments: '165',
    caption: 'Tu segundo hogar en Pereira. Más de 1.200 m² diseñados con tecnología, ventilación de aire puro y la mejor comunidad fitness del Eje Cafetero. Escríbenos y agenda tu clase de cortesía gratis. #FuegoClub #PereiraRisaralda',
    type: 'Video',
    date: 'Hace 6 días',
  },
];
