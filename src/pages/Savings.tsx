import { useState } from 'react'
import { PiggyBank } from 'lucide-react'
import { PageHeader } from '../components/ui'
import { PERIODS, SNACKS, brl, saved, spent } from '../lib/snack'

export default function Savings() {
  const [sel, setSel] = useState<string>('gulao')
  const [prices, setPrices] = useState<Record<string, number>>(() => Object.fromEntries(SNACKS.map((s) => [s.id, s.price])))
  const [daysWeek, setDaysWeek] = useState(7)
  const [rate, setRate] = useState(0.63)

  const perDay = daysWeek / 7
  const r = Math.max(0, rate) / 100
  const list = sel === 'todos' ? SNACKS : SNACKS.filter((s) => s.id === sel)
  const tabs = [...SNACKS.map((s) => ({ id: s.id, label: s.name })), { id: 'todos', label: 'Comparar os 3' }]
  const inp = 'mt-1 w-full rounded-xl border-2 border-tinta/30 bg-white px-3 py-2 text-lg font-semibold'

  return (
    <div className="page-in">
      <PageHeader
        title="Quanto você economiza"
        subtitle="Veja o que sobra no bolso ao parar de comer salgadinho todos os dias."
        icon={<PiggyBank />}
      />

      <div role="tablist" aria-label="Salgadinho" className="flex flex-wrap gap-2 mb-5">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={sel === t.id}
            onClick={() => setSel(t.id)}
            className={`btn ${sel === t.id ? '' : '!bg-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="card p-5 mb-5" aria-labelledby="ajustes">
        <h2 id="ajustes" className="text-xl font-extrabold mb-3">Ajustes (opcional)</h2>
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
                <option key={d} value={d}>{d} {d === 1 ? 'dia' : 'dias'}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-bold">
            Poupança (% ao mês)
            <input type="number" min={0} max={10} step={0.01} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inp} />
          </label>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {list.map((s) => (
          <section key={s.id} className={`card p-5 ${list.length === 1 ? 'lg:col-span-3' : ''}`} style={{ borderLeft: `10px solid ${s.color}` }}>
            <h2 className="text-xl font-extrabold">{s.name}</h2>
            <p className="text-sm font-semibold text-tinta-suave mb-3">{brl(prices[s.id])} por pacote</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-tinta-suave">
                    <th className="py-1 pr-2">Prazo</th>
                    <th className="py-1 pr-2">Economia (gasto evitado)</th>
                    <th className="py-1">Poupança (~{rate.toLocaleString('pt-BR')}% a.m.)</th>
                  </tr>
                </thead>
                <tbody>
                  {PERIODS.map((p) => (
                    <tr key={p.id} className="border-t border-tinta/10">
                      <th scope="row" className="py-2 pr-2 font-bold">{p.label}</th>
                      <td className="py-2 pr-2 font-extrabold">{brl(spent(prices[s.id], perDay, p.days))}</td>
                      <td className="py-2 font-extrabold">{brl(saved(prices[s.id], perDay, p.days, r))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-4 text-xs font-semibold text-tinta-suave">
        Valores ilustrativos: mês de 30 dias, ano de 365, aporte no fim de cada mês, sem descontar inflação nem impostos.
        Preços de referência; confira o valor real no mercado.
      </p>
    </div>
  )
}
