import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { AGE_LABEL, ageGroupOf } from '../data/activities'
import { MoviSays, PageHeader } from '../components/ui'
import { ARCHETYPE } from '../lib/game'
import { recommend } from '../lib/recommend'
import { useApp, type Profile as Profile_, type AdaptNeed, type Experience, type Goal, type IntensityPref, type SocialPref } from '../state'

const ADAPT_OPTIONS = [
  'Atividades de baixo impacto nas articulações',
  'Movimentos mais lentos e controlados',
  'Poder fazer sentado ou com apoio',
  'Ambiente mais calmo, com menos estímulos',
  'Acompanhamento de um instrutor',
]

function Choice<T extends string>({
  options,
  value,
  onChange,
  cols = 1,
}: {
  options: { v: T; label: string; emoji?: string }[]
  value: T | null
  onChange: (v: T) => void
  cols?: 1 | 2
}) {
  return (
    <div role="radiogroup" className={`grid gap-3 ${cols === 2 ? 'sm:grid-cols-2' : ''}`}>
      {options.map((o) => (
        <button
          key={o.v}
          role="radio"
          aria-checked={value === o.v}
          onClick={() => onChange(o.v)}
          className={`text-left rounded-2xl border-2 border-tinta px-4 py-3 font-bold text-lg transition-all ${
            value === o.v ? 'bg-menta shadow-[0_4px_0_#2b2d42] -translate-y-0.5 pop' : 'bg-white hover:bg-creme'
          }`}
        >
          {o.emoji && <span className="mr-2">{o.emoji}</span>}
          {o.label}
          {value === o.v && <Check className="inline ml-2" size={18} />}
        </button>
      ))}
    </div>
  )
}

function PlayerCard({ profile, teen }: { profile: Profile_; teen: boolean }) {
  const [copied, setCopied] = useState(false)
  const arch = ARCHETYPE[profile.goal]
  const top = recommend(profile)[0].activity
  const text = `Meu personagem Move+: ${arch.name} ${arch.emoji}. Superpoder: ${arch.power}. Combo ideal: ${top.name} ${top.emoji}. Descubra o seu: https://miriadms21-wq.github.io/move-plus/`
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copie o texto abaixo:', text)
    }
  }
  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="player-card pop w-72 rounded-3xl border-4 border-tinta p-5 text-tinta text-left shadow-[0_8px_0_#2b2d42]" aria-label="Carta do seu personagem Move+">
        <div className="flex justify-between text-xs font-extrabold uppercase tracking-wider">
          <span>Move+ · Carta de jogador</span>
          <span>{teen ? '★★★' : '★'}</span>
        </div>
        <div className="my-3 grid place-items-center rounded-2xl border-2 border-tinta bg-white/70 py-5 text-7xl">{arch.emoji}</div>
        <h2 className="text-2xl font-extrabold leading-tight">{arch.name}</h2>
        <p className="font-bold text-sm">Superpoder: {arch.power}</p>
        <div className="mt-3 rounded-xl border-2 border-tinta bg-white/70 p-2 text-sm font-bold">
          Combo ideal: {top.emoji} {top.name}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {top.benefits.slice(0, 3).map((b) => (
            <span key={b} className="rounded-full border border-tinta bg-white/70 px-2 py-0.5 text-xs font-bold">
              {b}
            </span>
          ))}
        </div>
      </div>
      <button className="btn btn-ghost mt-4" onClick={copy}>
        {copied ? '✅ Copiado!' : '📋 Copiar minha carta'}
      </button>
    </div>
  )
}

export default function Profile() {
  const { go, setProfile, profile, award, teen } = useApp()
  const [step, setStep] = useState(0)
  const [age, setAge] = useState<number | null>(profile?.age ?? null)
  const [exp, setExp] = useState<Experience | null>(profile?.experience ?? null)
  const [social, setSocial] = useState<SocialPref | null>(profile?.social ?? null)
  const [goal, setGoal] = useState<Goal | null>(profile?.goal ?? null)
  const [inten, setInten] = useState<IntensityPref | null>(profile?.intensity ?? null)
  const [adapt, setAdapt] = useState<AdaptNeed | null>(profile?.adaptNeed ?? null)
  const [adaptList, setAdaptList] = useState<string[]>(profile?.adaptations ?? [])
  const [done, setDone] = useState(false)

  const total = 6
  const ageValid = age !== null && age >= 0 && age <= 110
  const canNext = [ageValid, exp, social, goal, inten, adapt][step]

  const finish = () => {
    if (!ageValid || !exp || !social || !goal || !inten || !adapt) return
    setProfile({
      age: age!,
      ageGroup: ageGroupOf(age!),
      experience: exp,
      social,
      goal,
      intensity: inten,
      adaptNeed: adapt,
      adaptations: adapt === 'sim' ? adaptList : [],
    })
    award('perfil', 50, 'Perfil criado')
    setDone(true)
  }

  if (done) {
    return (
      <div className="page-in text-center max-w-xl mx-auto">
        <div className="flex justify-center">
          <MoviSays mood="cheer">Seu perfil ficou ótimo! Agora vou escolher atividades que combinam com você.</MoviSays>
        </div>
        <h1 className="mt-8 text-4xl font-extrabold">Seu perfil Move+ está pronto!</h1>
        <p className="mt-2 text-tinta-suave text-lg font-semibold">
          Faixa etária: <b>{AGE_LABEL[ageGroupOf(age!)]}</b> · Nenhum dado foi enviado ou guardado.
        </p>
        {profile && <PlayerCard profile={profile} teen={teen} />}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn text-lg" onClick={() => go('recomendacoes')}>
            Ver minhas recomendações <ArrowRight size={18} />
          </button>
          <button className="btn btn-ghost" onClick={() => { setDone(false); setStep(0) }}>
            Refazer perguntas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-in max-w-2xl mx-auto">
      <PageHeader title="Meu perfil" subtitle="Sem nome, sem e-mail e sem cadastro. Só 6 perguntinhas." />
      <div className="mb-6" aria-label={`Etapa ${step + 1} de ${total}`}>
        <div className="h-4 rounded-full border-2 border-tinta bg-white overflow-hidden">
          <div className="h-full bg-amarelo transition-all duration-500" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
        <p className="mt-1 text-sm font-bold text-tinta-suave">Pergunta {step + 1} de {total}</p>
      </div>

      <div className="card p-5 sm:p-7" key={step}>
        {step === 0 && (
          <>
            <h2 className="text-2xl font-extrabold mb-3">1. Qual é sua idade?</h2>
            <input
              type="number"
              min={0}
              max={110}
              inputMode="numeric"
              value={age ?? ''}
              onChange={(e) => setAge(e.target.value === '' ? null : Number(e.target.value))}
              className="w-full rounded-2xl border-2 border-tinta bg-white px-4 py-3 text-2xl font-extrabold"
              placeholder="Digite a idade"
              aria-label="Idade em anos"
            />
            {ageValid && (
              <p className="mt-3 font-bold pop">
                Categoria didática: <span className="bg-menta rounded-full px-3 py-1 border-2 border-tinta">{AGE_LABEL[ageGroupOf(age!)]}</span>
              </p>
            )}
            <p className="mt-3 text-sm text-tinta-suave font-semibold">
              Criança: até 11 anos · Adolescente: 12 a 17 · Adulto: 18 a 59 · Idoso: 60 ou mais. São categorias didáticas e não substituem uma avaliação individual.
            </p>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-extrabold mb-3">2. Qual é seu nível de experiência?</h2>
            <Choice<Experience>
              value={exp}
              onChange={setExp}
              options={[
                { v: 'iniciante', label: 'Iniciante', emoji: '🌱' },
                { v: 'intermediario', label: 'Intermediário', emoji: '🌿' },
                { v: 'experiente', label: 'Experiente', emoji: '🌳' },
              ]}
            />
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-extrabold mb-3">3. Como você prefere se exercitar?</h2>
            <Choice<SocialPref>
              value={social}
              onChange={setSocial}
              options={[
                { v: 'sozinho', label: 'Sozinho', emoji: '🧍' },
                { v: 'grupo', label: 'Em grupo', emoji: '👥' },
                { v: 'tanto-faz', label: 'Tanto faz', emoji: '🤷' },
              ]}
            />
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-extrabold mb-3">4. O que mais chama sua atenção?</h2>
            <Choice<Goal>
              cols={2}
              value={goal}
              onChange={setGoal}
              options={[
                { v: 'diversao', label: 'Diversão', emoji: '🎉' },
                { v: 'socializacao', label: 'Socialização', emoji: '🤝' },
                { v: 'coordenacao', label: 'Coordenação', emoji: '🎯' },
                { v: 'equilibrio', label: 'Equilíbrio', emoji: '⚖️' },
                { v: 'condicionamento', label: 'Condicionamento físico', emoji: '💪' },
                { v: 'relaxamento', label: 'Relaxamento', emoji: '🌸' },
              ]}
            />
          </>
        )}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-extrabold mb-3">5. Qual intensidade você prefere?</h2>
            <Choice<IntensityPref>
              cols={2}
              value={inten}
              onChange={setInten}
              options={[
                { v: 'leve', label: 'Leve', emoji: '🍃' },
                { v: 'moderada', label: 'Moderada', emoji: '🌤️' },
                { v: 'vigorosa', label: 'Vigorosa', emoji: '🔥' },
                { v: 'nao-sei', label: 'Ainda não sei', emoji: '❓' },
              ]}
            />
          </>
        )}
        {step === 5 && (
          <>
            <h2 className="text-2xl font-extrabold mb-3">6. Você precisa de alguma adaptação para praticar atividades físicas?</h2>
            <Choice<AdaptNeed>
              value={adapt}
              onChange={setAdapt}
              options={[
                { v: 'sim', label: 'Sim' },
                { v: 'nao', label: 'Não' },
                { v: 'nao-informar', label: 'Prefiro não informar' },
              ]}
            />
            {adapt === 'sim' && (
              <fieldset className="mt-4 pop">
                <legend className="font-bold mb-2">Marque o que ajuda (opcional, sem diagnóstico):</legend>
                <div className="grid gap-2">
                  {ADAPT_OPTIONS.map((o) => (
                    <label key={o} className="flex items-center gap-3 rounded-xl border-2 border-tinta/30 bg-white px-3 py-2 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        className="size-5 accent-tinta"
                        checked={adaptList.includes(o)}
                        onChange={() => setAdaptList((l) => (l.includes(o) ? l.filter((x) => x !== o) : [...l, o]))}
                      />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </>
        )}
      </div>

      <div className="mt-6 flex justify-between gap-3">
        <button className="btn btn-ghost" onClick={() => (step === 0 ? go('home') : setStep(step - 1))}>
          <ArrowLeft size={18} /> Voltar
        </button>
        {step < total - 1 ? (
          <button className="btn" disabled={!canNext} onClick={() => setStep(step + 1)}>
            Avançar <ArrowRight size={18} />
          </button>
        ) : (
          <button className="btn btn-menta" disabled={!canNext} onClick={finish}>
            Finalizar <Check size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
