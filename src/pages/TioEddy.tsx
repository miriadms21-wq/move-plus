import { useState } from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { BRAND, COLORS, COMPARISON, FLAVORS, INGREDIENTS, PRICE, WHY, type Flavor } from '../data/tioeddy'
import { PERIODS, brl, spent } from '../lib/snack'
import { useApp } from '../state'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`
const { noite, dourado } = COLORS

function Eyebrow({ children, color = dourado }: { children: string; color?: string }) {
  return (
    <p className="te-body text-xs font-bold uppercase tracking-[0.28em]" style={{ color }}>
      {children}
    </p>
  )
}

function BackButton() {
  const { go } = useApp()
  return (
    <button
      onClick={() => {
        go('economia')
        window.scrollTo(0, 0)
      }}
      className="te-body inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-4 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-black"
    >
      <ArrowLeft size={16} /> Voltar ao Move+
    </button>
  )
}

function Ticker() {
  const items = ['Pão sírio', 'Azeite extravirgem', 'Assado', 'Leve, delicioso & muito crocante', 'Ingredientes naturais']
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden py-3" style={{ background: dourado, color: noite }} aria-hidden="true">
      <div className="te-marquee flex w-max gap-8 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="te-title text-lg sm:text-xl">
            {t} <span className="mx-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function NutriBadges({ f }: { f: Flavor }) {
  const items = [
    [f.nutrition.kcal, 'calorias'],
    [f.nutrition.trans, 'gordura trans'],
    [f.nutrition.fibras, 'fibras'],
    [f.nutrition.proteinas, 'proteínas'],
  ]
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(([v, l]) => (
        <div key={l} className="rounded-2xl bg-white px-2 py-2.5 text-center" style={{ color: noite }}>
          <p className="te-title text-xl">{v}</p>
          <p className="te-body text-[11px] font-bold uppercase leading-tight">{l}</p>
        </div>
      ))}
    </div>
  )
}

function FlavorCard({ f }: { f: Flavor }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border-4 border-black/0 shadow-xl" style={{ background: f.color, color: f.ink }}>
      <div className="relative">
        <img src={asset(f.photos[0])} alt={`Tio Eddy ${f.name}`} loading="lazy" className="h-56 w-full object-cover" />
        <img
          src={asset(f.pack)}
          alt={`Embalagem Tio Eddy ${f.name} 80g`}
          loading="lazy"
          className="absolute bottom-3 right-3 w-24 rotate-3 rounded-2xl bg-white shadow-2xl"
        />
      </div>
      <div className="p-5">
        <h3 className="te-title text-3xl">{f.name}</h3>
        <p className="te-body mt-2 text-sm font-bold">{f.description}</p>
        <p className="te-body mt-4 text-xs font-bold uppercase tracking-widest opacity-70">Por pacote de 80 g</p>
        <div className="mt-2">
          <NutriBadges f={f} />
        </div>
        <p className="te-title mt-5 text-4xl">{brl(f.price ?? PRICE)}</p>
      </div>
    </article>
  )
}

function Invest() {
  const [days, setDays] = useState(7)
  const perDay = days / 7
  return (
    <section className="py-16" style={{ background: COLORS.mare, color: noite }}>
      <div className="mx-auto max-w-6xl px-5">
        <Eyebrow color={noite}>Mesmo hábito, outra escolha</Eyebrow>
        <h2 className="te-title mt-2 text-3xl sm:text-5xl">Quanto custa um lanche saudável?</h2>
        <p className="mt-3 max-w-2xl text-lg font-bold">
          Snack todo mundo compra. A diferença está no que vai no pacote: pão sírio assado, azeite extravirgem e ingredientes naturais. Vale cada centavo investido no seu lanche.
        </p>
        <label className="mt-6 inline-block text-sm font-bold">
          Quantos dias por semana você lancha?
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-1 block rounded-xl border-2 border-black bg-white px-3 py-2 text-lg font-bold">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <option key={d} value={d}>
                {d} {d === 1 ? 'dia' : 'dias'}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {PERIODS.map((p) => (
            <div key={p.id} className="min-w-0 rounded-3xl p-4" style={{ background: noite, color: '#fff' }}>
              <p className="te-body text-[11px] font-bold uppercase tracking-wider" style={{ color: dourado }}>{p.label}</p>
              <p className="te-title mt-1 text-2xl">{brl(spent(PRICE, perDay, p.days))}</p>
            </div>
          ))}
        </div>
        <p className="te-title mt-8 text-2xl sm:text-4xl">Gaste com o que faz bem. Escolha Tio Eddy.</p>
      </div>
    </section>
  )
}

export default function TioEddy() {
  return (
    <div className="te-body min-h-screen overflow-x-hidden text-white" style={{ background: noite }}>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 px-5 py-3 backdrop-blur" style={{ background: noite + 'ee' }}>
        <img src={asset('tioeddy/logo/L-RGB-4.svg')} alt="Tio Eddy" className="h-10 w-auto" />
        <BackButton />
      </header>

      {/* 1. Apresentação */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
          <div>
            <Eyebrow>Snack assado · pão sírio · azeite extravirgem</Eyebrow>
            <h1 className="te-title mt-4 text-4xl sm:text-6xl">
              Tio Eddy:
              <br />
              <span style={{ color: dourado }}>{BRAND.heroTitle}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-neutral-200">{BRAND.heroText}</p>
            <p className="te-title mt-8 inline-block rotate-[-1.5deg] rounded-xl px-4 py-3 text-xl sm:text-2xl" style={{ background: dourado, color: noite }}>
              {BRAND.tagline}
            </p>
          </div>
          <div className="relative">
            <img src={asset(BRAND.heroPhoto)} alt="Mão pegando um chip de pão sírio Tio Eddy com guacamole" className="aspect-[4/5] w-full rounded-[2.5rem] border-4 object-cover" style={{ borderColor: dourado }} />
            <div className="absolute -bottom-6 -left-3 flex gap-2 sm:-left-8">
              {FLAVORS.map((f, i) => (
                <img
                  key={f.id}
                  src={asset(f.pack)}
                  alt={`Embalagem ${f.name}`}
                  className="w-24 rounded-2xl sm:w-32"
                  style={{ transform: `rotate(${(i - 1) * 6}deg)`, background: '#fff', boxShadow: '0 12px 30px #0008' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Ticker />

      <section className="mx-auto max-w-6xl px-5 pt-14">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {WHY.map((w, i) => (
            <div key={w.big} className="rounded-3xl p-4 sm:p-5" style={{ background: [COLORS.mare, COLORS.brasa, COLORS.alecrim, dourado][i], color: i === 1 ? '#fff' : noite }}>
              <p className="te-title whitespace-nowrap text-xl sm:text-2xl md:text-xl lg:text-3xl xl:text-4xl">{w.big}</p>
              <p className="te-body mt-1 text-sm font-bold leading-snug">{w.small}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Ingredientes */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Eyebrow>Ingredientes</Eyebrow>
        <h2 className="te-title mt-2 text-3xl sm:text-5xl">Conheça nossos ingredientes</h2>
        <p className="mt-3 max-w-2xl text-lg text-neutral-300">{BRAND.packLine}.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {INGREDIENTS.map((i, n) => (
            <article key={i.name} className="relative overflow-hidden rounded-[2rem] border-2 border-white/15">
              <img src={asset(i.photo)} alt={i.name} loading="lazy" className="h-64 w-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1a1a1aee 15%, transparent 70%)' }} />
              <div className="absolute bottom-0 p-6">
                <span className="te-title text-6xl" style={{ color: dourado }}>0{n + 1}</span>
                <h3 className="te-title text-3xl">{i.name}</h3>
                <p className="mt-1 text-sm font-bold text-neutral-200">{i.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 rounded-2xl border border-dashed border-white/25 p-4 text-sm text-neutral-300">
          A lista completa de ingredientes de cada sabor está no rótulo da embalagem.
        </p>
      </section>

      {/* História (aparece quando houver texto oficial) */}
      {BRAND.story && (
        <section className="py-16" style={{ background: COLORS.mare, color: noite }}>
          <div className="mx-auto max-w-3xl px-5">
            <Eyebrow color={noite}>Nossa história</Eyebrow>
            <p className="te-title mt-3 text-3xl">{BRAND.story}</p>
          </div>
        </section>
      )}

      {/* 3. Sabores */}
      <section className="py-16" style={{ background: '#111' }}>
        <div className="mx-auto max-w-6xl px-5">
          <Eyebrow>Sabores</Eyebrow>
          <h2 className="te-title mt-2 text-3xl sm:text-5xl">Conheça os sabores</h2>
          <p className="te-title mt-3 text-xl" style={{ color: dourado }}>{BRAND.packPhrase}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {FLAVORS.map((f) => (
              <FlavorCard key={f.id} f={f} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Preço */}
      <section className="py-16 text-center" style={{ background: dourado, color: noite }}>
        <div className="mx-auto max-w-6xl px-5">
          <p className="te-body text-xs font-bold uppercase tracking-[0.3em]">Preço</p>
          <p className="te-title text-[clamp(2.75rem,15vw,8rem)]">{brl(PRICE)}</p>
          <p className="te-body mt-2 text-sm font-bold opacity-70">Preço informado pela marca.</p>
        </div>
      </section>

      {/* 5. Comparação */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Eyebrow>Outra possibilidade</Eyebrow>
        <h2 className="te-title mt-2 text-3xl sm:text-5xl">Propostas lado a lado</h2>
        <p className="mt-3 max-w-2xl text-lg text-neutral-300">
          Cada snack tem a sua proposta. Olhar a composição e a lista de ingredientes ajuda a escolher com mais informação.
        </p>
        <div className="mt-8 overflow-x-auto rounded-3xl border-2 border-white/15">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-white/5 text-sm">
              <tr>
                <th className="p-3 text-neutral-400 sm:p-4">Critério</th>
                <th className="te-title p-4 text-lg" style={{ color: dourado }}>Tio Eddy</th>
                <th className="p-4 text-neutral-300">Outros snacks</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((r) => (
                <tr key={r.label} className="border-t border-white/10">
                  <th scope="row" className="p-3 font-bold sm:p-4">{r.label}</th>
                  <td className="p-3 font-bold sm:p-4">{r.eddy}</td>
                  <td className="p-3 text-neutral-400 sm:p-4">{r.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4 rounded-3xl p-5" style={{ background: COLORS.brasa }}>
          <p className="te-title text-4xl sm:text-5xl">50%</p>
          <p className="te-title max-w-xl text-xl sm:text-2xl">
            menos gordura que um chips de batata tradicional.
          </p>
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-neutral-400">
          <Sparkles size={14} /> Confira sempre o rótulo de cada produto e escolha o que faz sentido para você.
        </p>
      </section>

      <Invest />

      <footer className="border-t border-white/10 px-5 py-12 text-center">
        <img src={asset('tioeddy/logo/L-RGB-2.svg')} alt="Tio Eddy" className="mx-auto mb-6 h-20 w-auto" />
        <BackButton />
      </footer>
    </div>
  )
}
