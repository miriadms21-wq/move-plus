export type ActivityId =
  | 'jiujitsu'
  | 'futebol'
  | 'pilates'
  | 'hidroginastica'
  | 'corrida'
  | 'danca'
  | 'ciclismo'

export type Intensity = 'leve' | 'moderada' | 'vigorosa'

export const INTENSITIES: Intensity[] = ['leve', 'moderada', 'vigorosa']

export const INTENSITY_LABEL: Record<Intensity, string> = {
  leve: 'Leve',
  moderada: 'Moderada',
  vigorosa: 'Vigorosa',
}

/** Uma linha do 2024 Adult Compendium of Physical Activities. */
export interface MetEntry {
  code: string
  met: number
  /** Descrição em português da linha do Compêndio usada. */
  label: string
  /** Descrição original (inglês) para conferência. */
  original: string
}

export type AgeGroup = 'crianca' | 'adolescente' | 'adulto' | 'idoso'

export interface Activity {
  id: ActivityId
  name: string
  emoji: string
  color: string
  tagline: string
  description: string
  howItWorks: string
  benefits: string[]
  cautions: string[]
  adaptations: string[]
  ageNote: Record<AgeGroup, string>
  curiosity: string
  muscles: string[]
  /** 1 a 5 — escala didática do Move+ (não é medida científica). */
  scores: { impacto: number; coordenacao: number; socializacao: number; equilibrio: number; resistencia: number }
  accessibility: string
  social: 'individual' | 'grupo' | 'ambos'
  goals: Array<'diversao' | 'socializacao' | 'coordenacao' | 'equilibrio' | 'condicionamento' | 'relaxamento'>
  /** Intensidades com MET no Compêndio de adultos. Ausente = sem valor correspondente. */
  mets: Partial<Record<Intensity, MetEntry>>
}

export const ACTIVITIES: Activity[] = [
  {
    id: 'jiujitsu',
    name: 'Jiu-jitsu',
    emoji: '🥋',
    color: '#B8C8FF',
    tagline: 'Técnica, respeito e consciência do corpo.',
    description:
      'Arte marcial de combate corpo a corpo que valoriza técnica, alavancas e controle do corpo. Treina-se com regras claras e muito respeito pelo parceiro.',
    howItWorks:
      'As aulas começam com aquecimento, seguem com técnicas de posição, quedas e finalizações treinadas com o parceiro, e terminam com alongamento. O ritmo é combinado com o professor.',
    benefits: ['Coordenação motora', 'Disciplina e respeito', 'Consciência corporal', 'Força e flexibilidade'],
    cautions: [
      'Treinar sempre com professor qualificado.',
      'Respeitar o limite do parceiro e do próprio corpo.',
      'Fazer aquecimento antes e alongamento depois.',
    ],
    adaptations: ['Treino sem competição e com ritmo mais lento', 'Foco em técnica em vez de força', 'Turmas separadas por idade e experiência'],
    ageNote: {
      crianca: 'Existem turmas infantis com foco lúdico e técnica básica.',
      adolescente: 'Pode ser praticado em turmas da idade, com orientação do professor.',
      adulto: 'Pode ser praticado em vários níveis, do iniciante ao avançado.',
      idoso: 'Pode ser feito de forma adaptada, com ritmo leve e acompanhamento.',
    },
    curiosity: 'No jiu-jitsu, usar a técnica certa vale mais do que usar muita força!',
    muscles: ['Core (abdômen e lombar)', 'Pernas', 'Braços e costas'],
    scores: { impacto: 3, coordenacao: 5, socializacao: 3, equilibrio: 4, resistencia: 4 },
    accessibility: 'Exige contato com o parceiro; pode ser adaptado em ritmo e intensidade.',
    social: 'grupo',
    goals: ['coordenacao', 'equilibrio', 'condicionamento'],
    mets: {
      leve: {
        code: '15425',
        met: 5.3,
        label: 'Artes marciais, ritmo mais lento, praticantes iniciantes',
        original: 'Martial arts, various types, slower pace, novice performers, practice',
      },
      moderada: {
        code: '15430',
        met: 10.3,
        label: 'Artes marciais (inclui jiu-jitsu), ritmo moderado',
        original: 'Martial arts, various types, moderate pace (includes judo, jujitsu, karate...)',
      },
    },
  },
  {
    id: 'futebol',
    name: 'Futebol',
    emoji: '⚽',
    color: '#A9E8D4',
    tagline: 'Equipe, agilidade e muita diversão.',
    description:
      'Esporte coletivo em que duas equipes disputam a bola. Pode ser jogado na rua, na escola, em quadra ou em campo, de forma recreativa ou competitiva.',
    howItWorks:
      'Alterna caminhadas, corridas curtas, arrancadas, passes e chutes. O esforço muda o tempo todo, o que treina agilidade e resistência.',
    benefits: ['Trabalho em equipe', 'Agilidade', 'Resistência', 'Socialização'],
    cautions: ['Usar calçado adequado.', 'Hidratar-se durante o jogo.', 'Aquecer antes para evitar lesões nas pernas.'],
    adaptations: ['Futebol caminhado (mais lento)', 'Campo e tempo de jogo reduzidos', 'Regras sem contato'],
    ageNote: {
      crianca: 'Em versão recreativa, com jogos curtos e foco na brincadeira.',
      adolescente: 'Muito praticado na escola e em times, de forma recreativa ou competitiva.',
      adulto: 'Pode ser casual ou competitivo, conforme o preparo.',
      idoso: 'Existe o futebol caminhado, com ritmo reduzido e menos impacto.',
    },
    curiosity: 'Em uma partida, os jogadores alternam muitas vezes entre andar, trotar e correr!',
    muscles: ['Pernas', 'Glúteos', 'Core'],
    scores: { impacto: 4, coordenacao: 4, socializacao: 5, equilibrio: 3, resistencia: 4 },
    accessibility: 'Precisa de espaço e de outras pessoas; regras podem ser adaptadas.',
    social: 'grupo',
    goals: ['diversao', 'socializacao', 'condicionamento', 'coordenacao'],
    mets: {
      leve: { code: '15615', met: 3.5, label: 'Futebol caminhado', original: 'Walking football/soccer' },
      moderada: { code: '15610', met: 7.0, label: 'Futebol casual (recreativo)', original: 'Soccer, casual, general' },
      vigorosa: { code: '15605', met: 9.5, label: 'Futebol competitivo', original: 'Soccer, competitive' },
    },
  },
  {
    id: 'pilates',
    name: 'Pilates',
    emoji: '🧘',
    color: '#FFB5C8',
    tagline: 'Postura, equilíbrio e controle.',
    description:
      'Método de exercícios de movimentos controlados, com respiração e atenção à postura. Pode ser feito no solo (mat) ou com aparelhos.',
    howItWorks:
      'Cada exercício é feito devagar e com concentração, ativando o centro do corpo (o "core"). Pode ser feito em aulas em grupo ou individuais.',
    benefits: ['Postura', 'Equilíbrio', 'Mobilidade', 'Fortalecimento muscular'],
    cautions: ['Seguir orientação de um instrutor.', 'Respeitar o próprio limite de movimento.', 'Respirar sem prender o ar.'],
    adaptations: ['Exercícios sentado ou com apoio', 'Uso de aparelhos que ajudam o movimento', 'Séries mais curtas'],
    ageNote: {
      crianca: 'Pode ser adaptado em formato lúdico, com orientação.',
      adolescente: 'Pode ajudar na postura e na consciência corporal.',
      adulto: 'Opção para trabalhar força, postura e flexibilidade.',
      idoso: 'Costuma ser adaptado com foco em equilíbrio e mobilidade.',
    },
    curiosity: 'O Pilates leva o nome do seu criador, Joseph Pilates, que chamava o método de "Contrologia".',
    muscles: ['Core (abdômen e lombar)', 'Glúteos', 'Músculos da postura'],
    scores: { impacto: 1, coordenacao: 3, socializacao: 2, equilibrio: 5, resistencia: 2 },
    accessibility: 'Baixo impacto; muito adaptável a diferentes necessidades.',
    social: 'ambos',
    goals: ['equilibrio', 'relaxamento', 'coordenacao'],
    mets: {
      leve: {
        code: '02103',
        met: 1.8,
        label: 'Pilates tradicional no solo (mat)',
        original: 'Pilates, traditional, mat',
      },
      moderada: { code: '02105', met: 2.8, label: 'Pilates (geral)', original: 'Pilates, general' },
    },
  },
  {
    id: 'hidroginastica',
    name: 'Hidroginástica',
    emoji: '🏊',
    color: '#A9E8D4',
    tagline: 'Movimento na água, com menos impacto.',
    description:
      'Exercícios feitos dentro da piscina, com a água na altura do peito. A água ajuda a sustentar o corpo e oferece resistência aos movimentos.',
    howItWorks:
      'As aulas combinam movimentos de braços e pernas ao ritmo da música, com ou sem materiais como halteres de espuma.',
    benefits: ['Condicionamento', 'Coordenação', 'Menor impacto nas articulações', 'Resistência muscular'],
    cautions: ['Hidratar-se mesmo dentro da água.', 'Cuidado com piso escorregadio.', 'Seguir as orientações do professor.'],
    adaptations: ['Aulas em água mais rasa', 'Ritmo mais lento', 'Materiais flutuantes de apoio'],
    ageNote: {
      crianca: 'Existem aulas de atividades aquáticas infantis, com foco lúdico.',
      adolescente: 'Pode ser uma opção de atividade aquática em grupo.',
      adulto: 'Boa opção para quem busca atividade com menos impacto.',
      idoso: 'É muito procurada por idosos por causa do baixo impacto nas articulações.',
    },
    curiosity: 'A água oferece resistência em todas as direções, então cada movimento exige um pouco mais do corpo!',
    muscles: ['Pernas', 'Braços', 'Core'],
    scores: { impacto: 1, coordenacao: 3, socializacao: 4, equilibrio: 3, resistencia: 4 },
    accessibility: 'Baixo impacto articular; exige acesso a uma piscina.',
    social: 'grupo',
    goals: ['condicionamento', 'socializacao', 'relaxamento'],
    mets: {
      moderada: {
        code: '02120',
        met: 5.3,
        label: 'Hidroginástica / exercícios na água',
        original: 'Water aerobics, water calisthenics, water exercise',
      },
    },
  },
  {
    id: 'corrida',
    name: 'Corrida',
    emoji: '🏃',
    color: '#FFD87E',
    tagline: 'Resistência no seu próprio ritmo.',
    description:
      'Deslocamento a pé em velocidade maior do que a caminhada. Pode ser feita na rua, em parques, em pista ou na esteira, do trote leve à corrida forte.',
    howItWorks:
      'Começa-se alternando trote e caminhada e vai-se aumentando o tempo de corrida aos poucos. O ritmo é ajustado à conversa: se não dá para falar, está forte demais.',
    benefits: ['Resistência cardiovascular', 'Condicionamento físico', 'Intensidade ajustável', 'Pratica-se quase em qualquer lugar'],
    cautions: ['Usar tênis adequado.', 'Aumentar o tempo e a velocidade aos poucos.', 'Evitar horários de calor intenso e hidratar-se.'],
    adaptations: ['Alternar corrida e caminhada', 'Escolher terrenos mais macios', 'Correr em grupo ou com guia'],
    ageNote: {
      crianca: 'Aparece em brincadeiras e jogos de corrida, em formato lúdico.',
      adolescente: 'Pode ser praticada na escola, em grupos ou treinos.',
      adulto: 'Pode ser feita do nível iniciante ao avançado.',
      idoso: 'Pode ser adaptada com trote leve ou combinando com caminhada, conforme a orientação.',
    },
    curiosity: 'A corrida é um dos esportes mais antigos: já fazia parte dos primeiros Jogos Olímpicos da Grécia!',
    muscles: ['Pernas', 'Glúteos', 'Core'],
    scores: { impacto: 4, coordenacao: 2, socializacao: 2, equilibrio: 2, resistencia: 5 },
    accessibility: 'Exige impacto nas articulações; o ritmo pode ser muito ajustado.',
    social: 'ambos',
    goals: ['condicionamento', 'relaxamento'],
    mets: {
      leve: { code: '12026', met: 3.3, label: 'Trote leve (4,2 a 6 km/h)', original: 'Jogging 2.6 to 3.7 mph' },
      moderada: { code: '12028', met: 6.5, label: 'Corrida a 6,4 a 6,8 km/h', original: 'Running, 4 to 4.2 mph (13 min/mile)' },
      vigorosa: { code: '12045', met: 9.0, label: 'Corrida a 8,9 a 9,3 km/h', original: 'Running, 5.5 -5.8 mph' },
    },
  },
  {
    id: 'danca',
    name: 'Dança',
    emoji: '💃',
    color: '#FFB5C8',
    tagline: 'Ritmo, expressão e coordenação.',
    description:
      'Movimento do corpo ao som da música. Existem muitos estilos, como dança de salão, jazz, ritmos populares e danças aeróbicas.',
    howItWorks:
      'Aprende-se sequências de passos seguindo o ritmo. Pode ser feita sozinho, em pares ou em grupos, em aulas ou em casa.',
    benefits: ['Ritmo e coordenação', 'Expressão corporal', 'Resistência', 'Socialização'],
    cautions: ['Usar calçado confortável.', 'Aquecer antes de dançar.', 'Adequar o estilo ao seu nível.'],
    adaptations: ['Dança sentado ou com apoio', 'Estilos mais lentos', 'Coreografias simples'],
    ageNote: {
      crianca: 'Aulas lúdicas ajudam na coordenação e na expressão.',
      adolescente: 'Estilos variados atraem diferentes gostos.',
      adulto: 'Pode ser praticada em qualquer ritmo, para diversão ou condicionamento.',
      idoso: 'Comum em grupos de convivência, com ritmos mais suaves.',
    },
    curiosity: 'A dança também pode melhorar a coordenação e a memória de movimentos!',
    muscles: ['Pernas', 'Core', 'Braços'],
    scores: { impacto: 2, coordenacao: 5, socializacao: 5, equilibrio: 4, resistencia: 3 },
    accessibility: 'Muito adaptável; pode ser feita sentado ou em ritmo lento.',
    social: 'ambos',
    goals: ['diversao', 'socializacao', 'coordenacao', 'relaxamento', 'equilibrio'],
    mets: {
      leve: {
        code: '03040',
        met: 3.0,
        label: 'Dança de salão lenta (valsa, bolero, etc.)',
        original: 'Ballroom, slow, examples: waltz, foxtrot, slow dancing, samba tango, rumba...',
      },
      moderada: {
        code: '03030',
        met: 5.5,
        label: 'Dança de salão rápida',
        original: 'Ballroom dancing, fast (Taylor Code 125)',
      },
      vigorosa: {
        code: '03029',
        met: 7.3,
        label: 'Dança aeróbica',
        original: 'Chinese square dance, aerobic dance',
      },
    },
  },
  {
    id: 'ciclismo',
    name: 'Ciclismo',
    emoji: '🚴',
    color: '#B8C8FF',
    tagline: 'Pedalar por lazer ou por esporte.',
    description:
      'Pedalar uma bicicleta na rua, em parques, em trilhas ou em bicicleta ergométrica. Pode ser passeio tranquilo ou treino esportivo.',
    howItWorks:
      'O ritmo é controlado pelas marchas e pela velocidade. Pode-se pedalar sozinho ou em grupo, em trajetos planos ou com subidas.',
    benefits: ['Resistência', 'Coordenação', 'Fortalecimento das pernas', 'Prática recreativa'],
    cautions: ['Usar capacete.', 'Respeitar as regras de trânsito e ciclovias.', 'Revisar freios e pneus.'],
    adaptations: ['Bicicleta ergométrica', 'Bicicleta elétrica de assistência', 'Trajetos planos e curtos'],
    ageNote: {
      crianca: 'Sempre com supervisão de um adulto e em locais seguros.',
      adolescente: 'Pode ser lazer, transporte ou esporte.',
      adulto: 'Pode ser lazer, transporte ou treino esportivo.',
      idoso: 'Pode ser adaptado com bicicleta ergométrica ou elétrica, em trajetos tranquilos.',
    },
    curiosity: 'O ciclismo pode ser praticado de forma recreativa ou esportiva!',
    muscles: ['Coxas', 'Glúteos', 'Panturrilhas'],
    scores: { impacto: 1, coordenacao: 3, socializacao: 3, equilibrio: 3, resistencia: 5 },
    accessibility: 'Baixo impacto nas articulações; precisa de bicicleta e local seguro.',
    social: 'ambos',
    goals: ['condicionamento', 'diversao', 'relaxamento'],
    mets: {
      leve: {
        code: '01015',
        met: 4.3,
        label: 'Bicicleta, ritmo fácil escolhido por você',
        original: 'Bicycling, self-selected easy pace',
      },
      moderada: {
        code: '01016',
        met: 7.0,
        label: 'Bicicleta, ritmo moderado escolhido por você',
        original: 'Bicycling, self-selected moderate pace',
      },
      vigorosa: {
        code: '01017',
        met: 9.0,
        label: 'Bicicleta, ritmo vigoroso escolhido por você',
        original: 'Bicycling, self-selected vigorous pace',
      },
    },
  },
]

export const getActivity = (id: ActivityId) => ACTIVITIES.find((a) => a.id === id)!

export const AGE_LABEL: Record<AgeGroup, string> = {
  crianca: 'Criança',
  adolescente: 'Adolescente',
  adulto: 'Adulto',
  idoso: 'Idoso',
}

export function ageGroupOf(age: number): AgeGroup {
  if (age <= 11) return 'crianca'
  if (age <= 17) return 'adolescente'
  if (age <= 59) return 'adulto'
  return 'idoso'
}
