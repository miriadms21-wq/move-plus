import { getActivity, type ActivityId, type AgeGroup, type Intensity, type MetEntry } from '../data/activities'

/**
 * Fórmula (ACSM / Compêndio de Atividades Físicas), válida para ADULTOS:
 * kcal = (MET × 3,5 × peso em kg ÷ 200) × minutos
 */
export function kcalAdult(met: number, weightKg: number, minutes: number): number {
  return ((met * 3.5 * weightKg) / 200) * minutes
}

export type CalcResult =
  | { kind: 'ok'; kcal: number; entry: MetEntry }
  | { kind: 'sem-peso' }
  | { kind: 'sem-met' }
  | { kind: 'jovem' }

export function estimate(opts: {
  activity: ActivityId
  intensity: Intensity
  minutes: number
  weightKg: number | null
  ageGroup: AgeGroup
}): CalcResult {
  // Crianças e adolescentes: não se aplica a fórmula de adultos.
  if (opts.ageGroup === 'crianca' || opts.ageGroup === 'adolescente') return { kind: 'jovem' }
  const entry = getActivity(opts.activity).mets[opts.intensity]
  if (!entry) return { kind: 'sem-met' }
  if (!opts.weightKg || opts.weightKg < 20 || opts.weightKg > 250) return { kind: 'sem-peso' }
  return { kind: 'ok', kcal: kcalAdult(entry.met, opts.weightKg, opts.minutes), entry }
}
