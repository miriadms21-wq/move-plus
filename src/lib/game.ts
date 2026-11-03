import type { Goal } from '../state'

export interface Badge {
  id: string
  emoji: string
  name: string
  how: string
}

/** Cada conquista é calculada a partir das ações já realizadas (chaves de XP). */
export const BADGES: (Badge & { has: (keys: string[]) => boolean })[] = [
  { id: 'perfil', emoji: '🧬', name: 'Perfil criado', how: 'Monte seu perfil Move+', has: (k) => k.includes('perfil') },
  { id: 'explorador', emoji: '📚', name: 'Explorador', how: 'Abra 3 fichas de atividades', has: (k) => k.filter((x) => x.startsWith('ficha-')).length >= 3 },
  { id: 'cientista', emoji: '🧮', name: 'Cientista', how: 'Faça um cálculo na calculadora', has: (k) => k.includes('calc') },
  { id: 'duelista', emoji: '⚔️', name: 'Duelista', how: 'Compare duas atividades no laboratório', has: (k) => k.includes('duelo') },
  { id: 'curioso', emoji: '🔬', name: 'Curioso', how: 'Visite as Fontes e metodologia', has: (k) => k.includes('fontes') },
  { id: 'mestre', emoji: '🧠', name: 'Mestre do Quiz', how: 'Acerte 9 ou mais no quiz', has: (k) => k.includes('quiz-mestre') },
  {
    id: 'lenda',
    emoji: '👑',
    name: 'Lenda Move+',
    how: 'Desbloqueie todas as outras conquistas',
    has: (k) => ['perfil', 'ficha-3', 'calc', 'duelo', 'fontes', 'quiz-mestre'].every((x) => (x === 'ficha-3' ? k.filter((y) => y.startsWith('ficha-')).length >= 3 : k.includes(x))),
  },
]

const LEVELS = [
  { at: 0, name: 'Novato' },
  { at: 40, name: 'Aprendiz' },
  { at: 90, name: 'Atleta' },
  { at: 150, name: 'Craque' },
  { at: 220, name: 'Campeão' },
  { at: 300, name: 'Lenda' },
]

export function levelOf(xp: number) {
  let idx = 0
  LEVELS.forEach((l, i) => {
    if (xp >= l.at) idx = i
  })
  const next = LEVELS[idx + 1]
  return {
    n: idx + 1,
    name: LEVELS[idx].name,
    next: next?.at ?? null,
    base: LEVELS[idx].at,
    pct: next ? Math.round(((xp - LEVELS[idx].at) / (next.at - LEVELS[idx].at)) * 100) : 100,
  }
}

export const ARCHETYPE: Record<Goal, { name: string; emoji: string; power: string }> = {
  diversao: { name: 'Rei da Resenha', emoji: '🎉', power: 'Transforma qualquer treino em festa' },
  socializacao: { name: 'Líder do Rolê', emoji: '🤝', power: 'Junta a galera e todo mundo se mexe' },
  coordenacao: { name: 'Ninja da Coordenação', emoji: '🎯', power: 'Corpo e mente no mesmo ritmo' },
  equilibrio: { name: 'Mestre Zen do Equilíbrio', emoji: '⚖️', power: 'Firme como uma árvore' },
  condicionamento: { name: 'Máquina de Energia', emoji: '💪', power: 'Resistência que não acaba' },
  relaxamento: { name: 'Monge Chill', emoji: '🌸', power: 'Calma e foco em modo turbo' },
}
