import { useState } from 'react'
import { AGE_LABEL, ACTIVITIES, INTENSITIES, INTENSITY_LABEL, type Activity, type AgeGroup } from '../data/activities'
import { Modal, MoviSays, NavButtons, PageHeader } from '../components/ui'
import { useApp } from '../state'

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <h3 className="font-extrabold text-lg">{title}</h3>
      <ul className="mt-1 list-disc pl-5 font-semibold text-tinta-suave space-y-0.5">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  )
}

function Sheet({ a }: { a: Activity }) {
  const { go } = useApp()
  return (
    <div>
      <p className="font-semibold">{a.description}</p>
      <div className="mt-3 rounded-2xl p-4 font-semibold" style={{ background: `${a.color}66` }}>
        <b>Como é praticada: </b>
        {a.howItWorks}
      </div>
      <Section title="Principais benefícios" items={a.benefits} />
      <div className="mt-4">
        <h3 className="font-extrabold text-lg">Intensidades possíveis</h3>
        <div className="mt-1 flex flex-wrap gap-2">
          {INTENSITIES.map((i) => (
            <span
              key={i}
              className={`rounded-full border-2 border-tinta px-3 py-1 font-bold text-sm ${a.mets[i] ? 'bg-menta' : 'bg-white opacity-50 line-through'}`}
              title={a.mets[i] ? a.mets[i]!.label : 'Sem valor correspondente no Compêndio'}
            >
              {INTENSITY_LABEL[i]}
            </span>
          ))}
        </div>
        <p className="text-sm text-tinta-suave font-semibold mt-1">Riscado = o Compêndio não tem um valor correspondente para essa intensidade.</p>
      </div>
      <Section title="Cuidados importantes" items={a.cautions} />
      <Section title="Possibilidades de adaptação" items={a.adaptations} />
      <div className="mt-4">
        <h3 className="font-extrabold text-lg">Faixas etárias</h3>
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          {(Object.keys(a.ageNote) as AgeGroup[]).map((g) => (
            <div key={g} className="rounded-xl border-2 border-tinta/20 p-3">
              <b>{AGE_LABEL[g]}: </b>
              <span className="font-semibold text-tinta-suave">{a.ageNote[g]}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-tinta-suave font-semibold mt-1">Não é uma regra: cada pessoa é única, e a prática deve respeitar suas condições individuais.</p>
      </div>
      <div className="mt-4 rounded-2xl bg-amarelo/50 border-2 border-amarelo p-4 font-bold">💡 Curiosidade: {a.curiosity}</div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="btn" onClick={() => go('calculadora')}>Calcular energia</button>
        <button className="btn btn-ghost" onClick={() => go('laboratorio')}>Comparar com outra</button>
      </div>
    </div>
  )
}

export default function Library() {
  const [open, setOpen] = useState<Activity | null>(null)
  const { award } = useApp()
  const openSheet = (a: Activity) => {
    setOpen(a)
    award(`ficha-${a.id}`, 10, `Ficha de ${a.name}`)
  }
  return (
    <div className="page-in">
      <PageHeader title="Biblioteca de atividades" subtitle="Toque em um cartão para abrir a ficha educativa." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACTIVITIES.map((a) => (
          <button
            key={a.id}
            onClick={() => openSheet(a)}
            className="card text-left p-5 transition-transform hover:-translate-y-1 hover:rotate-[-0.5deg] focus-visible:-translate-y-1"
            style={{ borderTop: `10px solid ${a.color}` }}
            aria-label={`Abrir ficha de ${a.name}`}
          >
            <span className="grid place-items-center size-16 rounded-2xl border-2 border-tinta text-4xl" style={{ background: a.color }}>
              {a.emoji}
            </span>
            <h2 className="mt-3 text-2xl font-extrabold">{a.name}</h2>
            <p className="font-semibold text-tinta-suave">{a.tagline}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {a.benefits.slice(0, 2).map((b) => (
                <span key={b} className="text-xs font-bold bg-creme rounded-full px-2 py-1 border border-tinta/20">
                  {b}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8 max-w-xl">
        <MoviSays>Não existe "a melhor" atividade para todo mundo. O melhor movimento é aquele que combina com você!</MoviSays>
      </div>
      <NavButtons back="home" next="calculadora" nextLabel="Ir para a calculadora" />
      {open && (
        <Modal title={`${open.emoji} ${open.name}`} onClose={() => setOpen(null)}>
          <Sheet a={open} />
        </Modal>
      )}
    </div>
  )
}
