import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Info } from 'lucide-react'
import {
  ACTIVITIES,
  AGE_LABEL,
  INTENSITIES,
  INTENSITY_LABEL,
  getActivity,
  type ActivityId,
  type Intensity,
} from '../data/activities'
import { AgeWeight, Modal, MoviSays, NavButtons, Notice, PageHeader, Thermometer } from '../components/ui'
import { estimate, kcalAdult } from '../lib/calc'
import { useApp } from '../state'

const fmt = (n: number) => n.toLocaleString('pt-BR', { maximumFractionDigits: 0 })

export default function Calculator() {
  const { ageGroup, weight, award } = useApp()
  const [id, setId] = useState<ActivityId>('corrida')
  const [inten, setInten] = useState<Intensity>('moderada')
  const [minutes, setMinutes] = useState(30)
  const [explain, setExplain] = useState(false)

  const act = getActivity(id)
  const pickActivity = (n: ActivityId) => {
    setId(n)
    const a = getActivity(n)
    if (!a.mets[inten]) setInten(INTENSITIES.find((i) => a.mets[i]) ?? 'leve')
  }

  const res = ageGroup ? estimate({ activity: id, intensity: inten, minutes, weightKg: weight, ageGroup }) : null
  const isYouth = ageGroup === 'crianca' || ageGroup === 'adolescente'
  const entry = act.mets[inten]
  const calcDone = res?.kind === 'ok' || (isYouth && !!entry)

  useEffect(() => {
    if (calcDone) award('calc', 30, 'Cálculo feito')
  }, [calcDone, award])

  const chartData =
    res && res.kind === 'ok' && weight
      ? INTENSITIES.filter((i) => act.mets[i]).map((i) => ({
          name: INTENSITY_LABEL[i],
          kcal: Math.round(kcalAdult(act.mets[i]!.met, weight, minutes)),
          atual: i === inten,
        }))
      : []

  return (
    <div className="page-in">
      <PageHeader title="Calculadora Move+" subtitle="Escolha a atividade, o tempo e a intensidade. O resultado muda na hora." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5 space-y-5">
          <div>
            <h2 className="font-extrabold text-lg mb-2">1. Atividade</h2>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Atividade">
              {ACTIVITIES.map((a) => (
                <button
                  key={a.id}
                  role="radio"
                  aria-checked={id === a.id}
                  onClick={() => pickActivity(a.id)}
                  className={`rounded-full border-2 border-tinta px-3 py-1.5 font-bold transition-all ${id === a.id ? 'shadow-[0_3px_0_#2b2d42] -translate-y-0.5 pop' : 'bg-white'}`}
                  style={id === a.id ? { background: a.color } : undefined}
                >
                  {a.emoji} {a.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-extrabold text-lg mb-2">2. Intensidade</h2>
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Intensidade">
                {INTENSITIES.map((i) => (
                  <button
                    key={i}
                    role="radio"
                    aria-checked={inten === i}
                    disabled={!act.mets[i]}
                    onClick={() => setInten(i)}
                    className={`rounded-full border-2 border-tinta px-4 py-1.5 font-bold disabled:opacity-40 disabled:line-through ${inten === i ? 'bg-amarelo shadow-[0_3px_0_#2b2d42] pop' : 'bg-white'}`}
                  >
                    {INTENSITY_LABEL[i]}
                  </button>
                ))}
              </div>
              <Thermometer value={act.mets[inten] ? inten : null} />
            </div>
            {entry && <p className="mt-2 text-sm font-semibold text-tinta-suave">Referência: {entry.label}.</p>}
          </div>

          <div>
            <h2 className="font-extrabold text-lg mb-2">3. Tempo de prática: {minutes} min</h2>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={180}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="flex-1 accent-tinta h-3"
                aria-label="Tempo em minutos (controle deslizante)"
              />
              <input
                type="number"
                min={1}
                max={300}
                value={minutes}
                onChange={(e) => setMinutes(Math.max(1, Math.min(300, Number(e.target.value) || 1)))}
                className="w-24 rounded-xl border-2 border-tinta/30 bg-white px-3 py-2 text-lg font-semibold"
                aria-label="Tempo em minutos (campo numérico)"
              />
            </div>
          </div>

          <div>
            <h2 className="font-extrabold text-lg mb-2">4. Dados para o cálculo</h2>
            <AgeWeight />
          </div>
        </div>

        <div className="card p-5" aria-live="polite">
          <h2 className="font-extrabold text-lg mb-3">Resultado</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl p-3 border-2 border-tinta" style={{ background: act.color }}>
              <div className="text-3xl">{act.emoji}</div>
              <div className="font-extrabold text-sm">{act.name}</div>
            </div>
            <div className="rounded-2xl p-3 border-2 border-tinta bg-creme">
              <div className="text-3xl font-extrabold">{minutes}</div>
              <div className="font-bold text-sm">minutos</div>
            </div>
            <div className="rounded-2xl p-3 border-2 border-tinta bg-creme">
              <div className="text-base sm:text-xl font-extrabold mt-1">{INTENSITY_LABEL[inten]}</div>
              <div className="font-bold text-sm">intensidade</div>
            </div>
          </div>

          <div className="mt-4">
            {!ageGroup && <Notice>Informe sua idade para o Move+ escolher o método de cálculo mais adequado.</Notice>}

            {res?.kind === 'sem-met' && (
              <Notice>
                O Compêndio não tem um valor de {INTENSITY_LABEL[inten].toLowerCase()} para {act.name}, então o Move+ não inventa um número. Escolha outra intensidade.
              </Notice>
            )}
            {res?.kind === 'sem-peso' && <Notice>Informe seu peso (entre 20 e 250 kg) para estimar a energia. O peso é opcional e não é guardado.</Notice>}

            {res?.kind === 'ok' && (
              <div className="pop" key={`${id}${inten}${minutes}${weight}`}>
                <div className="rounded-3xl bg-menta border-2 border-tinta p-4 text-center">
                  <div className="text-5xl sm:text-6xl font-extrabold font-display">≈ {fmt(res.kcal)} kcal</div>
                  <div className="font-bold">estimativa de energia gasta na atividade</div>
                </div>
                <div className="mt-4 h-56" role="img" aria-label="Gráfico de barras com a estimativa de energia por intensidade">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontWeight: 700 }} />
                      <YAxis unit=" kcal" width={82} tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(v) => [`${v} kcal`, 'Estimativa']} />
                      <Bar dataKey="kcal" radius={[10, 10, 0, 0]} animationDuration={600}>
                        {chartData.map((d) => (
                          <Cell key={d.name} fill={d.atual ? '#FFD87E' : '#B8C8FF'} stroke="#2b2d42" strokeWidth={2} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm font-semibold text-tinta-suave">Barra amarela = a intensidade escolhida, por {minutes} min.</p>
                <p className="mt-2 text-sm font-semibold">
                  Cálculo: MET {res.entry.met.toLocaleString('pt-BR')} × 3,5 × {weight} kg ÷ 200 × {minutes} min.
                  <span className="text-tinta-suave"> Fonte: Compêndio 2024, código {res.entry.code}.</span>
                </p>
              </div>
            )}

            {isYouth && (
              <div className="space-y-3 pop">
                <Notice>
                  Como a idade informada é de {AGE_LABEL[ageGroup!].toLowerCase()}, o Move+ <b>não</b> estima calorias. A fórmula acima foi criada para adultos, e não há base
                  segura para dar um número individual a crianças e adolescentes.
                </Notice>
                <div className="rounded-2xl border-2 border-tinta bg-creme p-4 font-semibold">
                  <p>
                    <b>O que mostramos no lugar:</b> {act.name} por {minutes} min, em intensidade {INTENSITY_LABEL[inten].toLowerCase()}.
                  </p>
                  <p className="mt-1">Benefícios: {act.benefits.join(', ')}.</p>
                  <p className="mt-1">Cuidados: {act.cautions[0]}</p>
                  <p className="mt-2 text-sm text-tinta-suave">
                    Para crianças e adolescentes, a OMS recomenda, em média, cerca de 60 minutos por dia de atividade física de intensidade moderada a vigorosa, somando
                    brincadeiras, esportes e deslocamentos.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button className="btn btn-menta" onClick={() => setExplain(true)}>
              <Info size={18} /> Entenda esse cálculo
            </button>
            <span className="text-sm font-bold text-tinta-suave">Resultado aproximado, não é uma medição exata.</span>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-xl">
        <MoviSays mood="wow">Dica: troque a intensidade e veja a barra mudar. Quanto mais intensa, maior tende a ser a energia gasta no mesmo tempo!</MoviSays>
      </div>
      <NavButtons back="biblioteca" next="recomendacoes" nextLabel="Ver recomendações" />

      {explain && (
        <Modal title="Entenda esse cálculo" onClose={() => setExplain(false)}>
          <p className="font-semibold">
            Para adultos, o Move+ usa a fórmula do Compêndio de Atividades Físicas e do Colégio Americano de Medicina do Esporte:
          </p>
          <p className="my-3 rounded-2xl bg-amarelo/50 border-2 border-amarelo p-3 text-center font-extrabold text-lg">
            kcal = (MET × 3,5 × peso em kg ÷ 200) × tempo em minutos
          </p>
          <ul className="space-y-2 font-semibold">
            <li><b>MET</b>: quantas vezes o gasto de energia da atividade é maior do que em repouso. 1 MET é o gasto em repouso. Cada atividade e intensidade tem seu valor no Compêndio.</li>
            <li><b>3,5</b>: o oxigênio (em mL por kg por minuto) que o corpo usa em repouso. É o que "traduz" 1 MET em oxigênio.</li>
            <li><b>Peso</b>: quanto maior o peso, mais energia o corpo precisa para se mover.</li>
            <li><b>200</b>: número que converte oxigênio usado em quilocalorias (cerca de 5 kcal para cada litro de oxigênio).</li>
            <li><b>Tempo</b>: quanto mais tempo, mais energia. A relação é direta: o dobro do tempo dá o dobro de energia.</li>
          </ul>
          {res?.kind === 'ok' && weight ? (
            <p className="mt-3 rounded-2xl bg-menta/60 p-3 font-semibold">
              <b>Seu exemplo:</b> ({res.entry.met} × 3,5 × {weight} ÷ 200) × {minutes} = <b>{fmt(res.kcal)} kcal</b>.
            </p>
          ) : (
            <p className="mt-3 rounded-2xl bg-menta/60 p-3 font-semibold">
              <b>Exemplo:</b> corrida a MET 6,5, pessoa de 60 kg, 30 min: (6,5 × 3,5 × 60 ÷ 200) × 30 = <b>205 kcal</b>.
            </p>
          )}
          <p className="mt-3 text-sm font-semibold text-tinta-suave">
            É uma aproximação: a energia real depende de condicionamento, composição corporal, técnica, clima e outros fatores. Para crianças e adolescentes a fórmula não é usada.
          </p>
        </Modal>
      )}
    </div>
  )
}
