import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
  ACTIVITIES,
  INTENSITIES,
  INTENSITY_LABEL,
  getActivity,
  type ActivityId,
  type Intensity,
} from '../data/activities'
import { CURIOSITIES } from '../data/content'
import { AgeWeight, MoviSays, NavButtons, Notice, PageHeader } from '../components/ui'
import { kcalAdult } from '../lib/calc'
import { useApp } from '../state'

const SCORE_LABELS = [
  ['impacto', 'Impacto nas articulações'],
  ['coordenacao', 'Coordenação'],
  ['socializacao', 'Socialização'],
  ['equilibrio', 'Equilíbrio'],
  ['resistencia', 'Resistência'],
] as const

function Select({ label, value, onChange }: { label: string; value: ActivityId; onChange: (v: ActivityId) => void }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ActivityId)}
        className="mt-1 w-full rounded-xl border-2 border-tinta bg-white px-3 py-2 text-lg font-bold"
      >
        {ACTIVITIES.map((a) => (
          <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>
        ))}
      </select>
    </label>
  )
}

export default function Lab() {
  const { ageGroup, weight } = useApp()
  const [a1, setA1] = useState<ActivityId>('danca')
  const [a2, setA2] = useState<ActivityId>('futebol')
  const [inten, setInten] = useState<Intensity>('moderada')
  const [minutes, setMinutes] = useState(30)
  const [expId, setExpId] = useState<ActivityId>('ciclismo')
  const [tip, setTip] = useState(0)

  const A = getActivity(a1)
  const B = getActivity(a2)
  const adult = ageGroup === 'adulto' || ageGroup === 'idoso'
  const canCalc = adult && !!weight && weight >= 20 && weight <= 250

  const compareData = SCORE_LABELS.map(([k, l]) => ({ name: l, [A.name]: A.scores[k], [B.name]: B.scores[k] }))

  const energyOf = (a: typeof A) => {
    const e = a.mets[inten]
    return e && canCalc ? Math.round(kcalAdult(e.met, weight!, minutes)) : null
  }
  const energyBars = [A, B].map((a) => ({ name: a.name, kcal: energyOf(a) })).filter((d) => d.kcal !== null)

  const X = getActivity(expId)
  const lineData = Array.from({ length: 24 }, (_, i) => {
    const m = (i + 1) * 5
    const row: Record<string, number> = { min: m }
    INTENSITIES.forEach((it) => {
      const e = X.mets[it]
      if (e && canCalc) row[INTENSITY_LABEL[it]] = Math.round(kcalAdult(e.met, weight!, m))
    })
    return row
  })
  const expEntry = X.mets[inten]
  const colors: Record<string, string> = { Leve: '#2fbf9b', Moderada: '#e0a800', Vigorosa: '#e0577e' }

  return (
    <div className="page-in">
      <PageHeader title="Laboratório do movimento" subtitle="Compare, experimente e descubra." />

      <section className="card p-5" aria-labelledby="comparador">
        <h2 id="comparador" className="text-2xl font-extrabold mb-3">🔬 Comparador de atividades</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Atividade A" value={a1} onChange={setA1} />
          <Select label="Atividade B" value={a2} onChange={setA2} />
        </div>

        <div className="mt-4 h-72" role="img" aria-label="Gráfico de barras comparando as duas atividades em cinco características">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compareData} margin={{ left: -20, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} interval={0} />
              <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey={A.name} fill={A.color} stroke="#2b2d42" strokeWidth={2} radius={[8, 8, 0, 0]} />
              <Bar dataKey={B.name} fill={B.id === A.id ? '#FFD87E' : B.color === A.color ? '#FFD87E' : B.color} stroke="#2b2d42" strokeWidth={2} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm font-semibold text-tinta-suave">Notas de 1 a 5 são uma escala didática do Move+ (não é medida científica) e servem para comparar de forma visual.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[A, B].map((a, idx) => (
            <div key={a.id + idx} className="rounded-2xl border-2 border-tinta p-4" style={{ background: `${a.color}55` }}>
              <h3 className="text-xl font-extrabold">{a.emoji} {a.name}</h3>
              <p className="font-semibold text-sm mt-1"><b>Benefícios:</b> {a.benefits.join(', ')}</p>
              <p className="font-semibold text-sm mt-1"><b>Músculos:</b> {a.muscles.join(', ')}</p>
              <p className="font-semibold text-sm mt-1"><b>Acessibilidade:</b> {a.accessibility}</p>
              <p className="font-semibold text-sm mt-1">
                <b>Intensidades:</b> {INTENSITIES.filter((i) => a.mets[i]).map((i) => INTENSITY_LABEL[i]).join(', ')}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-creme border-2 border-tinta/15 p-4">
          <h3 className="font-extrabold">Estimativa de energia (quando possível)</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Intensidade da comparação">
            {INTENSITIES.map((i) => (
              <button key={i} role="radio" aria-checked={inten === i} onClick={() => setInten(i)} className={`rounded-full border-2 border-tinta px-3 py-1 font-bold ${inten === i ? 'bg-amarelo pop' : 'bg-white'}`}>
                {INTENSITY_LABEL[i]}
              </button>
            ))}
            <label className="ml-auto text-sm font-bold">
              Tempo: {minutes} min
              <input type="range" min={5} max={120} step={5} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="ml-2 accent-tinta align-middle" aria-label="Tempo em minutos" />
            </label>
          </div>
          <div className="mt-3"><AgeWeight /></div>
          {!canCalc && <div className="mt-3"><Notice>Para ver estimativas, informe idade de adulto ou idoso (18+) e o peso. Para crianças e adolescentes, o Move+ compara só as características, sem calorias.</Notice></div>}
          {canCalc && energyBars.length < 2 && (
            <p className="mt-3 text-sm font-bold">
              {[A, B].filter((a) => !a.mets[inten]).map((a) => a.name).join(' e ')}: sem valor de {INTENSITY_LABEL[inten].toLowerCase()} no Compêndio.
            </p>
          )}
          {canCalc && energyBars.length > 0 && (
            <div className="mt-3 h-44" role="img" aria-label="Estimativa de energia das duas atividades">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyBars} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" unit=" kcal" />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontWeight: 700 }} />
                  <Tooltip formatter={(v) => [`${v} kcal`, 'Estimativa']} />
                  <Bar dataKey="kcal" fill="#A9E8D4" stroke="#2b2d42" strokeWidth={2} radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </section>

      <section className="card p-5 mt-6" aria-labelledby="experimento">
        <h2 id="experimento" className="text-2xl font-extrabold mb-1">⏱️ Experimento com o tempo</h2>
        <p className="font-semibold text-tinta-suave mb-3">Arraste o tempo e veja como a energia estimada cresce. Mude a atividade para ver outras linhas.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Atividade" value={expId} onChange={setExpId} />
          <label className="block text-sm font-bold">
            Tempo: {minutes} min
            <input type="range" min={5} max={120} step={5} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="mt-3 w-full accent-tinta" aria-label="Tempo do experimento" />
          </label>
        </div>
        {canCalc ? (
          <>
            <div className="mt-4 h-72" role="img" aria-label="Gráfico de linhas: energia estimada por tempo em cada intensidade">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ left: -10, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="min" unit=" min" />
                  <YAxis unit=" kcal" width={70} />
                  <Tooltip />
                  <Legend />
                  {INTENSITIES.filter((i) => X.mets[i]).map((i) => (
                    <Line key={i} type="monotone" dataKey={INTENSITY_LABEL[i]} stroke={colors[INTENSITY_LABEL[i]]} strokeWidth={3} dot={false} />
                  ))}
                  {expEntry && (
                    <ReferenceDot x={minutes} y={Math.round(kcalAdult(expEntry.met, weight!, minutes))} r={8} fill="#FFD87E" stroke="#2b2d42" strokeWidth={3} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            {expEntry ? (
              <p className="font-extrabold text-lg">
                {X.name}, {INTENSITY_LABEL[inten].toLowerCase()}, {minutes} min ≈ {Math.round(kcalAdult(expEntry.met, weight!, minutes))} kcal
              </p>
            ) : (
              <p className="font-bold">Sem valor de {INTENSITY_LABEL[inten].toLowerCase()} para {X.name}, escolha outra intensidade no comparador.</p>
            )}
          </>
        ) : (
          <div className="mt-3"><Notice>Informe idade de adulto/idoso e peso (no comparador acima) para liberar o gráfico.</Notice></div>
        )}
        <p className="mt-2 text-sm font-semibold text-tinta-suave">
          A intensidade, a duração e as características de cada pessoa (peso, condicionamento, técnica) influenciam o resultado. É sempre uma estimativa.
        </p>
      </section>

      <section className="mt-6" aria-labelledby="curiosidades">
        <h2 id="curiosidades" className="text-2xl font-extrabold mb-3">✨ Curiosidades</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CURIOSITIES.map((c, i) => (
            <button
              key={c.text}
              onClick={() => setTip(i)}
              className={`card text-left p-4 font-bold transition-transform hover:-translate-y-1 ${tip === i ? 'pop ring-4 ring-tinta/30' : ''}`}
              style={{ background: c.color }}
            >
              <span className="text-3xl block">{c.emoji}</span>
              {c.text}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-6 max-w-xl"><MoviSays mood="wow">Você sabia? {CURIOSITIES[tip].text}</MoviSays></div>
      <NavButtons back="energia" next="quiz" nextLabel="Ir para o quiz" />
    </div>
  )
}
