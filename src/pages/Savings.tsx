import { useState } from 'react'
import { ArrowRight, Coins } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '../components/ui'
import { PERIODS, SNACKS, brl, saved, spent } from '../lib/snack'
import { useApp } from '../state'

const PHRASES = [
  'Pequenos gastos. Grandes valores.',
  'Quanto esse hábito representa no seu orçamento?',
  'O que parece pouco no dia a dia pode representar muito ao longo do tempo.',
]

export default function Savings() {
  const { go } = useApp()
  const [sel, setSel] = useState<string>('gulao')
  const [prices, setPrices] = useState<Record<string, number>>(() => Object.fromEntries(SNACKS.map((s) => [s.id, s.price])))
  const [daysWeek, setDaysWeek] = useState(7)
  const [rate, setRate] = useState(0.63)

  const perDay = daysWeek / 7
  const r = Math.max(0, rate) / 100
  const list = sel === 'todos' ? SNACKS : SNACKS.filter((s) => s.id === sel)
  const tabs = [...SNACKS.map((s) => ({ id: s.id, label: s.name })), { id: 'todos', label: 'Comparar os 3' }]
  const inp = 'mt-1 w-full rounded-xl border-2 border-tinta/30 bg-white px-3 py-2 text-lg font-semibold'

  const chart = PERIODS.map((p) => ({
    prazo: p.label,
    ...Object.fromEntries(list.map((s) => [s.name, Math.round(spent(prices[s.id], perDay, p.days) * 100) / 100])),
  }))

  return (
    <div className="page-in">
      <PageHeader title="Quanto custa esse hábito?" subtitle="Pequenos gastos. Grandes valores." icon={<Coins />} />

      <p className="mb-5 max-w-3xl text-lg font-semibold">
        Você já parou para pensar quanto gasta com seus snacks favoritos? Pequenos gastos frequentes podem representar valores
        surpreendentes no final do mês e do ano. Descubra quanto esse consumo representa no seu orçamento!
      </p>

      <div role="tablist" aria-label="Salgadinho" className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={sel === t.id} onClick={() => setSel(t.id)} className={`btn ${sel === t.id ? '' : '!bg-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <section className="card mb-5 p-5" aria-labelledby="ajustes">
        <h2 id="ajustes" className="mb-3 text-xl font-extrabold">Ajuste ao seu hábito</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {list.map((s) => (
            <label key={s.id} className="text-sm font-bold">
              Preço do pacote — {s.name} (R$)
              <input
                type="number"
                min={0}
                step={0.1}
                value={prices[s.id]}
                onChange={(e) => setPrices({ ...prices, [s.id]: Math.max(0, Number(e.target.value)) })}
                className={inp}
              />
            </label>
          ))}
          <label className="text-sm font-bold">
            Dias por semana
            <select value={daysWeek} onChange={(e) => setDaysWeek(Number(e.target.value))} className={inp}>
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>
                  {d} {d === 1 ? 'dia' : 'dias'}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* Números em destaque */}
      <div className="grid gap-5 lg:grid-cols-3">
        {list.map((s) => (
          <section key={s.id} className={`card p-5 ${list.length === 1 ? 'lg:col-span-3' : ''}`} style={{ borderLeft: `10px solid ${s.color}` }}>
            <h2 className="text-xl font-extrabold">{s.name}</h2>
            <p className="mb-3 text-sm font-semibold text-tinta-suave">{brl(prices[s.id])} por pacote · {daysWeek} {daysWeek === 1 ? 'dia' : 'dias'} por semana</p>
            <div className={`grid gap-3 ${list.length === 1 ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-2'}`}>
              {PERIODS.map((p) => (
                <div key={p.id} className="rounded-2xl p-3" style={{ background: s.color + '55' }}>
                  <p className="text-xs font-bold uppercase text-tinta-suave">Gasto em {p.label}</p>
                  <p className="text-2xl font-extrabold leading-tight">{brl(spent(prices[s.id], perDay, p.days))}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Gráfico comparativo */}
      <section className="card mt-5 p-5" aria-labelledby="grafico">
        <h2 id="grafico" className="text-xl font-extrabold">Valor acumulado ao longo do tempo</h2>
        <p className="mb-3 text-sm font-semibold text-tinta-suave">O que parece pouco no dia a dia pode representar muito ao longo do tempo.</p>
        <div className="h-72 w-full" role="img" aria-label="Gráfico de barras com o gasto acumulado por prazo">
          <ResponsiveContainer>
            <BarChart data={chart} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="prazo" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)} mil` : String(v))} width={56} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => brl(Number(v))} />
              <Legend />
              {list.map((s) => (
                <Bar key={s.id} dataKey={s.name} fill={s.color} stroke="#2b2d42" strokeWidth={2} radius={[8, 8, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {PHRASES.map((p) => (
          <p key={p} className="card p-4 text-center font-extrabold">{p}</p>
        ))}
      </div>

      {/* Cálculo de poupança original, agora como complemento */}
      <details className="card mt-5 p-5">
        <summary className="cursor-pointer text-lg font-extrabold">E se esse valor fosse guardado todo mês?</summary>
        <label className="mt-3 block max-w-xs text-sm font-bold">
          Poupança (% ao mês)
          <input type="number" min={0} max={10} step={0.01} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inp} />
        </label>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-tinta-suave">
                <th className="py-1 pr-2">Prazo</th>
                {list.map((s) => (
                  <th key={s.id} className="py-1 pr-2">{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((p) => (
                <tr key={p.id} className="border-t border-tinta/10">
                  <th scope="row" className="py-2 pr-2 font-bold">{p.label}</th>
                  {list.map((s) => (
                    <td key={s.id} className="py-2 pr-2 font-extrabold">{brl(saved(prices[s.id], perDay, p.days, r))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-4 text-xs font-semibold text-tinta-suave">
        Valores ilustrativos: mês de 30 dias, ano de 365. Poupança com aporte no fim de cada mês, sem descontar inflação nem impostos.
        Preços de referência; confira o valor real no mercado.
      </p>

      {/* Transição para o Tio Eddy */}
      <section className="mt-8 rounded-3xl border-2 border-tinta p-6 text-center sm:p-10" style={{ background: '#0b0b0b', color: '#fff' }}>
        <h2 className="text-3xl font-extrabold" style={{ color: '#FFC400' }}>E se você conhecesse outra opção?</h2>
        <p className="mx-auto mt-2 max-w-xl font-semibold text-neutral-300">
          Além de observar seus hábitos de consumo, vale conhecer outras propostas de snacks. Descubra o Tio Eddy e seus sabores.
        </p>
        <button
          onClick={() => {
            go('tioeddy')
            window.scrollTo(0, 0)
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-extrabold"
          style={{ background: '#FFC400', color: '#0b0b0b' }}
        >
          Conheça o Tio Eddy <ArrowRight />
        </button>
      </section>
    </div>
  )
}
