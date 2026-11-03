import { useState } from 'react'
import { Apple, Bed, Dumbbell, Zap } from 'lucide-react'
import { EXPLAINERS } from '../data/content'
import { MoviSays, NavButtons, Notice, PageHeader } from '../components/ui'
import { useApp } from '../state'

export default function Energy() {
  const { go } = useApp()
  const [food, setFood] = useState('')
  const [kcal, setKcal] = useState<number | null>(null)

  const cards = [
    { icon: <Zap />, t: 'O que é quilocaloria?', d: EXPLAINERS.kcal, c: '#FFD87E' },
    { icon: <Apple />, t: 'De onde vem a energia?', d: EXPLAINERS.body, c: '#A9E8D4' },
    { icon: <Bed />, t: 'Energia em repouso', d: EXPLAINERS.rest, c: '#B8C8FF' },
    { icon: <Dumbbell />, t: 'Energia na atividade física', d: EXPLAINERS.activity, c: '#FFB5C8' },
  ]

  return (
    <div className="page-in">
      <PageHeader title="Energia e alimentação" subtitle="Entender a energia do corpo, sem contar calorias nem fazer contas de 'compensação'." />

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <article key={c.t} className="card p-5" style={{ borderLeft: `10px solid ${c.c}` }}>
            <h2 className="flex items-center gap-2 text-xl font-extrabold">{c.icon} {c.t}</h2>
            <p className="mt-1 font-semibold text-tinta-suave">{c.d}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="card p-5" aria-labelledby="painel-alimento">
          <h2 id="painel-alimento" className="text-xl font-extrabold flex items-center gap-2"><Apple /> Painel 1: energia de um alimento</h2>
          <p className="text-sm font-semibold text-tinta-suave mb-3">Digite um alimento e a energia que está no rótulo (ou numa tabela nutricional).</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-bold">
              Alimento ou refeição
              <input
                value={food}
                onChange={(e) => setFood(e.target.value.slice(0, 40))}
                placeholder="ex.: banana"
                className="mt-1 w-full rounded-xl border-2 border-tinta/30 bg-white px-3 py-2 text-lg font-semibold"
              />
            </label>
            <label className="text-sm font-bold">
              Energia (kcal)
              <input
                type="number"
                min={0}
                max={5000}
                value={kcal ?? ''}
                onChange={(e) => setKcal(e.target.value === '' ? null : Math.max(0, Number(e.target.value)))}
                placeholder="ex.: 90"
                className="mt-1 w-full rounded-xl border-2 border-tinta/30 bg-white px-3 py-2 text-lg font-semibold"
              />
            </label>
          </div>
          {kcal !== null ? (
            <div className="mt-4 rounded-3xl bg-menta border-2 border-tinta p-4 pop" key={`${food}${kcal}`}>
              <p className="font-extrabold text-xl">{food.trim() || 'Seu alimento'}</p>
              <p className="font-semibold">
                Contém <b>{kcal.toLocaleString('pt-BR')} kcal</b> de energia, o mesmo que <b>{(kcal * 4.184).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kJ</b> (1 kcal = 4,184 kJ).
              </p>
              <p className="mt-2 text-sm font-semibold text-tinta-suave">
                Isso é só a energia disponível no alimento. Ele também traz nutrientes, como vitaminas e minerais, que o corpo precisa. Energia não é "boa" nem "ruim".
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm font-semibold text-tinta-suave">Preencha as kcal para ver a conversão em quilojoules.</p>
          )}
        </section>

        <section className="card p-5" aria-labelledby="painel-atividade">
          <h2 id="painel-atividade" className="text-xl font-extrabold flex items-center gap-2"><Dumbbell /> Painel 2: gasto das atividades</h2>
          <p className="font-semibold text-tinta-suave mt-1">
            A energia usada em atividades é um assunto separado. Você pode explorar na Calculadora e no Laboratório, sempre como estimativa educativa.
          </p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <button className="btn btn-ghost" onClick={() => go('calculadora')}>Calculadora</button>
            <button className="btn btn-ghost" onClick={() => go('laboratorio')}>Laboratório</button>
          </div>
          <div className="mt-4 rounded-2xl bg-amarelo/50 border-2 border-amarelo p-4 font-semibold">
            <b>Por que não juntamos os dois painéis?</b> {EXPLAINERS.notAll}
          </div>
        </section>
      </div>

      <div className="mt-6"><Notice>O Move+ não transforma alimentos em minutos de exercício, não cria metas para "eliminar" calorias e não sugere restrições alimentares. Dúvidas sobre alimentação? Converse com um nutricionista.</Notice></div>
      <div className="mt-6 max-w-xl"><MoviSays>Comer e se movimentar são formas de cuidar do corpo, não de fazer contas de compensação!</MoviSays></div>
      <NavButtons back="recomendacoes" next="laboratorio" nextLabel="Laboratório do movimento" />
    </div>
  )
}
