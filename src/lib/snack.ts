export type Snack = { id: string; name: string; price: number; color: string }

export const SNACKS: Snack[] = [
  { id: 'gulao', name: 'Gulão (80g)', price: 5.5, color: '#FFD87E' },
  { id: 'cheetos', name: 'Cheetos (80g)', price: 9.5, color: '#FFB5C8' },
  { id: 'doritos', name: 'Doritos (~75g–80g)', price: 10.5, color: '#B8C8FF' },
]

export const PERIODS = [
  { id: 'sem', label: '1 semana', days: 7 },
  { id: 'mes', label: '1 mês', days: 30 },
  { id: 'sem6', label: '6 meses', days: 180 },
  { id: 'ano', label: '1 ano', days: 365 },
  { id: 'ano5', label: '5 anos', days: 1825 },
] as const

export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

/** Gasto evitado: preço × pacotes por dia × dias. */
export function spent(price: number, perDay: number, days: number) {
  return price * perDay * days
}

/**
 * Poupança: um aporte no fim de cada mês (30 dias), rendendo `monthlyRate` (ex.: 0.0063).
 * Menos de 1 mês: sem aporte completo, vale o valor guardado.
 */
export function saved(price: number, perDay: number, days: number, monthlyRate: number) {
  const monthly = price * perDay * 30
  const n = Math.floor(days / 30)
  if (n < 1) return spent(price, perDay, days)
  const factor = monthlyRate === 0 ? n : ((1 + monthlyRate) ** n - 1) / monthlyRate
  return monthly * factor + spent(price, perDay, days - n * 30)
}
