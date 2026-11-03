import { ACTIVITIES, type Activity, type ActivityId, type AgeGroup } from '../data/activities'
import type { Profile } from '../state'

/**
 * Regras do recomendador — todas visíveis para o usuário (botão "Por que o Move+ escolheu...").
 * Cada regra soma pontos; as 3 maiores pontuações são recomendadas.
 */

/** Regra 1 — Faixa etária: 0 = possível com muita adaptação, 1 = possível com adaptação, 2 = comum na faixa. */
const AGE_FIT: Record<AgeGroup, Record<ActivityId, number>> = {
  crianca: { futebol: 2, danca: 2, ciclismo: 2, jiujitsu: 1, hidroginastica: 1, pilates: 1, corrida: 1 },
  adolescente: { danca: 2, futebol: 2, jiujitsu: 2, ciclismo: 2, corrida: 1, hidroginastica: 1, pilates: 1 },
  adulto: { jiujitsu: 2, futebol: 2, pilates: 2, hidroginastica: 2, corrida: 2, danca: 2, ciclismo: 2 },
  idoso: { hidroginastica: 2, pilates: 2, danca: 2, ciclismo: 2, futebol: 1, corrida: 1, jiujitsu: 1 },
}

export interface Recommendation {
  activity: Activity
  score: number
  reasons: string[]
  startTips: string[]
  adaptationTips: string[]
}

export const RULES: { title: string; text: string }[] = [
  { title: '1. Faixa etária', text: 'Atividades comuns na sua faixa ganham 4 pontos; as que exigem mais adaptação ganham 1.' },
  { title: '2. Individual ou em grupo', text: 'Se você prefere treinar sozinho ou em grupo, atividades que combinam ganham 2 pontos (1 se for flexível).' },
  { title: '3. O que mais chama sua atenção', text: 'Se a atividade trabalha o seu objetivo (diversão, equilíbrio, coordenação...), ganha 3 pontos.' },
  { title: '4. Intensidade preferida', text: 'Se a atividade tem a intensidade que você escolheu, ganha 2 pontos. Se você não sabe, todas ganham 1.' },
  { title: '5. Experiência', text: 'Iniciantes ganham +1 em atividades de menor impacto. Experientes ganham +1 em atividades mais exigentes.' },
  { title: '6. Adaptações', text: 'Se você precisa de adaptações, atividades de baixo impacto ganham +2 e as de alto impacto perdem 1 ponto.' },
]

const GOAL_LABEL: Record<string, string> = {
  diversao: 'diversão',
  socializacao: 'socialização',
  coordenacao: 'coordenação',
  equilibrio: 'equilíbrio',
  condicionamento: 'condicionamento físico',
  relaxamento: 'relaxamento',
}

export function recommend(p: Profile): Recommendation[] {
  const scored = ACTIVITIES.map((a) => {
    let score = 0
    const reasons: string[] = []

    const fit = AGE_FIT[p.ageGroup][a.id]
    score += fit === 2 ? 4 : 1
    if (fit === 2) reasons.push(`É uma atividade comum para a faixa etária informada. ${a.ageNote[p.ageGroup]}`)
    else reasons.push(`Pode ser praticada na sua faixa etária com adaptações. ${a.ageNote[p.ageGroup]}`)

    if (p.social === 'sozinho') {
      if (a.social === 'ambos') {
        score += 2
        reasons.push('Pode ser praticada sozinho, como você prefere.')
      }
    } else if (p.social === 'grupo') {
      if (a.social === 'grupo') {
        score += 2
        reasons.push('É praticada em grupo, como você prefere.')
      } else if (a.social === 'ambos') {
        score += 1
        reasons.push('Pode ser feita em grupo.')
      }
    } else {
      score += 1
    }

    if (a.goals.includes(p.goal)) {
      score += 3
      reasons.push(`Trabalha o que mais chama sua atenção: ${GOAL_LABEL[p.goal]}.`)
    }

    if (p.intensity === 'nao-sei') score += 1
    else if (a.mets[p.intensity]) {
      score += 2
      reasons.push(`Tem opções de intensidade ${p.intensity}.`)
    }

    if (p.experience === 'iniciante' && a.scores.impacto <= 2) {
      score += 1
      reasons.push('Tem menor impacto, o que ajuda a começar com tranquilidade.')
    }
    if (p.experience === 'experiente' && (a.scores.resistencia >= 4 || a.scores.coordenacao >= 4)) {
      score += 1
      reasons.push('Oferece desafio para quem já tem experiência.')
    }

    if (p.adaptNeed === 'sim') {
      if (a.scores.impacto <= 2) {
        score += 2
        reasons.push('Tem baixo impacto e costuma ser bem adaptável.')
      } else if (a.scores.impacto >= 4) score -= 1
    }

    const startTips =
      p.experience === 'iniciante'
        ? ['Comece com 10 a 15 minutos, 2 vezes por semana.', 'Aumente o tempo aos poucos, no seu ritmo.', 'Prefira aulas ou companhia que orientem os primeiros passos.']
        : p.experience === 'intermediario'
          ? ['Mantenha uma rotina de 2 a 3 vezes por semana.', 'Varie o ritmo e experimente novos desafios com calma.', 'Observe como seu corpo responde e descanse quando precisar.']
          : ['Defina um objetivo claro e acompanhe sua evolução.', 'Alterne dias mais fortes e mais leves.', 'Mantenha aquecimento, alongamento e descanso.']

    return { activity: a, score, reasons, startTips, adaptationTips: a.adaptations }
  })

  return scored.sort((x, y) => y.score - x.score).slice(0, 3)
}
