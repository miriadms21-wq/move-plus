import { useMemo, useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { AGE_LABEL } from '../data/activities'
import { Modal, MoviSays, NavButtons, Notice, PageHeader } from '../components/ui'
import { RULES, recommend } from '../lib/recommend'
import { useApp } from '../state'

export default function Recommendations() {
  const { profile, go } = useApp()
  const [why, setWhy] = useState(false)
  const recs = useMemo(() => (profile ? recommend(profile) : []), [profile])

  if (!profile) {
    return (
      <div className="page-in max-w-xl mx-auto text-center">
        <PageHeader title="Recomendações" />
        <MoviSays mood="wow">Para recomendar atividades, preciso conhecer um pouquinho de você.</MoviSays>
        <button className="btn mt-6" onClick={() => go('perfil')}>Montar meu perfil</button>
      </div>
    )
  }

  return (
    <div className="page-in">
      <PageHeader title="Suas recomendações" subtitle={`Perfil: ${AGE_LABEL[profile.ageGroup]}, ${profile.age} anos. Troque o perfil e veja as sugestões mudarem.`} />
      <div className="grid gap-5 lg:grid-cols-3">
        {recs.map((r, i) => (
          <article key={r.activity.id} className="card p-5 flex flex-col" style={{ borderTop: `10px solid ${r.activity.color}` }}>
            <div className="flex items-center justify-between">
              <span className="text-5xl">{r.activity.emoji}</span>
              <span className="rounded-full bg-amarelo border-2 border-tinta px-3 py-1 font-extrabold">#{i + 1}</span>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold">{r.activity.name}</h2>
            <p className="font-semibold text-tinta-suave">{r.activity.tagline}</p>

            <h3 className="mt-3 font-extrabold">Por que combina com você</h3>
            <ul className="list-disc pl-5 font-semibold text-sm space-y-1">
              {r.reasons.slice(0, 4).map((x) => <li key={x}>{x}</li>)}
            </ul>
            <h3 className="mt-3 font-extrabold">Benefícios</h3>
            <p className="font-semibold text-sm">{r.activity.benefits.join(' · ')}</p>
            <h3 className="mt-3 font-extrabold">Como começar aos poucos</h3>
            <ul className="list-disc pl-5 font-semibold text-sm space-y-1">
              {r.startTips.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <h3 className="mt-3 font-extrabold">Adaptações possíveis</h3>
            <p className="font-semibold text-sm">{r.adaptationTips.join(' · ')}</p>
            {profile.adaptations.length > 0 && (
              <p className="mt-2 text-xs font-bold text-tinta-suave">Você indicou: {profile.adaptations.join('; ')}.</p>
            )}
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button className="btn btn-menta" onClick={() => setWhy(true)}>
          <HelpCircle size={18} /> Por que o Move+ escolheu essas atividades?
        </button>
        <button className="btn btn-ghost" onClick={() => go('perfil')}>Mudar meu perfil</button>
      </div>
      <div className="mt-4"><Notice>Sugestões educativas, não são prescrição. Em caso de dúvida sobre saúde, converse com um profissional de Educação Física ou de saúde.</Notice></div>

      <NavButtons back="calculadora" next="energia" nextLabel="Energia e alimentação" />

      {why && (
        <Modal title="Por que essas atividades?" onClose={() => setWhy(false)}>
          <p className="font-semibold">O Move+ não adivinha: ele usa regras simples que somam pontos. As 3 atividades com mais pontos são mostradas.</p>
          <ol className="mt-3 space-y-2">
            {RULES.map((r) => (
              <li key={r.title} className="rounded-xl bg-creme border-2 border-tinta/15 p-3">
                <b>{r.title}</b>
                <p className="font-semibold text-tinta-suave">{r.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm font-semibold text-tinta-suave">
            Nenhuma atividade é exclusiva de uma idade. As regras só ajudam a sugerir por onde começar.
          </p>
        </Modal>
      )}
    </div>
  )
}
