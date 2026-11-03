import { ArrowRight, BookOpen, FlaskConical, Library } from 'lucide-react'
import { ACTIVITIES } from '../data/activities'
import { Movi } from '../components/ui'
import { useApp } from '../state'

const STEPS = [
  { n: '01', t: 'Conte sobre você', d: 'Seis perguntas rápidas, sem nome, sem e-mail e sem cadastro.' },
  { n: '02', t: 'Receba sugestões', d: 'Até três atividades, com os critérios de escolha à vista.' },
  { n: '03', t: 'Explore a ciência', d: 'Calcule a energia, compare modalidades e teste o que aprendeu.' },
]

const PILLARS = [
  { s: 'Matemática', c: '#FFE29A', d: 'Fórmula, proporção e leitura de gráficos.' },
  { s: 'Ciências', c: '#A9E8D4', d: 'Energia, metabolismo e quilocalorias.' },
  { s: 'Educação Física', c: '#FFB5C8', d: 'Modalidades, benefícios e cuidados.' },
]

export default function PremiumHome() {
  const { go } = useApp()
  return (
    <div className="space-y-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,27,47,0.1)] bg-white/80 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-tinta-suave">
            <span className="size-2 rounded-full bg-menta" /> Educação Física · Ciências · Matemática
          </p>
          <h1 className="mt-5 text-6xl sm:text-7xl lg:text-8xl leading-[0.95]">
            Move<span className="text-[#f0709a]">+</span>
          </h1>
          <p className="mt-4 font-display text-2xl sm:text-3xl text-tinta-suave">Movimente-se, descubra e aprenda!</p>
          <p className="mt-5 max-w-xl text-lg font-medium text-tinta-suave">
            Uma experiência para entender como o corpo usa energia, conhecer sete atividades físicas e receber sugestões pensadas para o seu perfil, com base em ciência e
            sem coletar nenhum dado pessoal.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="btn text-base" onClick={() => go('perfil')}>
              Começar minha descoberta <ArrowRight size={18} />
            </button>
            <button className="btn btn-ghost" onClick={() => go('biblioteca')}>
              <Library size={18} /> Ver as atividades
            </button>
          </div>
          <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
            {[
              ['7', 'modalidades'],
              ['MET', 'base científica'],
              ['0', 'dados coletados'],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-display text-3xl font-semibold">{k}</dt>
                <dd className="text-xs font-bold uppercase tracking-wide text-tinta-suave">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <Movi size={84} mood="cheer" />
              <p className="font-semibold leading-snug">
                Oi! Eu sou o Movi! Vamos descobrir como nosso corpo utiliza energia e conhecer atividades físicas incríveis?
              </p>
            </div>
            <div className="mt-5 grid grid-cols-7 gap-2" aria-hidden="true">
              {ACTIVITIES.map((a) => (
                <span key={a.id} className="grid aspect-square place-items-center rounded-2xl text-2xl" style={{ background: a.color }}>
                  {a.emoji}
                </span>
              ))}
            </div>
          </div>
          <div className="card w-64 p-4 sm:ml-10">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-tinta-suave">Exemplo de resultado</p>
            <p className="mt-1 font-display text-3xl font-semibold">≈ 205 kcal</p>
            <p className="text-xs font-semibold text-tinta-suave">Corrida moderada · 30 min · 60 kg. Estimativa, não medição.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl sm:text-4xl">Como funciona</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="card p-6">
              <span className="font-display text-4xl font-semibold text-[#f0709a]">{s.n}</span>
              <h3 className="mt-2 text-xl">{s.t}</h3>
              <p className="mt-1 font-medium text-tinta-suave">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl">Sete atividades</h2>
          <button className="text-sm font-extrabold underline underline-offset-4" onClick={() => go('biblioteca')}>
            Ver todas
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ACTIVITIES.map((a) => (
            <button
              key={a.id}
              onClick={() => go('biblioteca')}
              className="card group p-4 text-left transition-transform hover:-translate-y-1"
              aria-label={`${a.name}: abrir biblioteca`}
            >
              <span className="grid size-12 place-items-center rounded-2xl text-2xl" style={{ background: a.color }}>
                {a.emoji}
              </span>
              <h3 className="mt-3 text-lg">{a.name}</h3>
              <p className="text-sm font-medium text-tinta-suave">{a.tagline}</p>
            </button>
          ))}
          <button onClick={() => go('laboratorio')} className="card flex flex-col justify-between p-4 text-left" style={{ background: '#1b1b2f', color: '#fff' }}>
            <FlaskConical />
            <span>
              <span className="block font-display text-lg">Laboratório</span>
              <span className="text-sm font-medium opacity-80">Compare duas atividades lado a lado.</span>
            </span>
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.s} className="rounded-3xl p-6" style={{ background: p.c }}>
            <BookOpen size={20} />
            <h3 className="mt-3 text-xl">{p.s}</h3>
            <p className="font-medium">{p.d}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
