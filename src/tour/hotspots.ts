import type { Hotspot } from './types'

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'atrium',
    label: 'Atrium',
    yaw: -20,
    pitch: 5,
    tourismTitle: 'Atrio principal (Main Atrium)',
    tourismText:
      'Este es el punto de encuentro ideal. Usa esta zona para practicar saludos en inglés con tu guía y preguntar por “directions” hacia otros lugares.',
    quiz: {
      word: 'directions',
      prompt: 'What does “directions” mean in this context?',
      choices: ['descripciones', 'indicaciones para llegar', 'decoraciones', 'decisiones'],
      answerIndex: 1,
      example: 'Excuse me, can you give me directions to the food court?',
    },
  },
  {
    id: 'balcony',
    label: 'Balcony',
    yaw: 55,
    pitch: 18,
    tourismTitle: 'Balcón con vista (Balcony View)',
    tourismText:
      'Un buen lugar para hablar de “views” y tomar fotos. En un tour real, aquí puedes practicar describiendo lo que ves usando adjetivos (beautiful, crowded, bright).',
    quiz: {
      word: 'balcony',
      prompt: 'Choose the best meaning of “balcony”.',
      choices: ['un pasillo', 'un balcón', 'una escalera', 'una tienda'],
      answerIndex: 1,
      example: 'Let’s go to the balcony to enjoy the view.',
    },
  },
  {
    id: 'food-court',
    label: 'Food',
    yaw: 120,
    pitch: -6,
    tourismTitle: 'Zona de comida (Food Court)',
    tourismText:
      'Perfecto para practicar pedidos: “I would like…”, “Can I have…?”. También puedes aprender vocabulario de menú y precios.',
    quiz: {
      word: 'menu',
      prompt: 'In a restaurant, what is a “menu”?',
      choices: ['una mesa', 'un menú / lista de comidas', 'una cuenta', 'una receta'],
      answerIndex: 1,
      example: 'Can I see the menu, please?',
    },
  },
  {
    id: 'info-desk',
    label: 'Info',
    yaw: -115,
    pitch: -2,
    tourismTitle: 'Mostrador de información (Info Desk)',
    tourismText:
      'Aquí practicas preguntas útiles para viajeros: horarios, eventos, y recomendaciones. Ideal para roleplay con tu profesor.',
    quiz: {
      word: 'schedule',
      prompt: 'What is a “schedule”?',
      choices: ['un horario', 'un boleto', 'un regalo', 'un mapa'],
      answerIndex: 0,
      example: 'What’s the schedule for the guided tour today?',
    },
  },
  {
    id: 'gift-shop',
    label: 'Gift',
    yaw: 175,
    pitch: 4,
    tourismTitle: 'Tienda de recuerdos (Gift Shop)',
    tourismText:
      'Un clásico para hablar de souvenirs y compras: tallas, colores, precios y “return policy” (política de devoluciones).',
    quiz: {
      word: 'souvenir',
      prompt: 'A “souvenir” is…',
      choices: ['un recuerdo que compras en un viaje', 'un lugar para dormir', 'una guía turística', 'una foto digital'],
      answerIndex: 0,
      example: 'I bought a souvenir for my family.',
    },
  },
]
