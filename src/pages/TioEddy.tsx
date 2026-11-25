import { ArrowLeft, Camera, Leaf, Sparkles } from 'lucide-react'
import { BRAND, COMPARISON, FLAVORS, INGREDIENTS, PRICE, type Flavor } from '../data/tioeddy'
import { brl } from '../lib/snack'
import { useApp } from '../state'

const Y = '#FFC400'
const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

function Photo({ src, label, className = '' }: { src?: string; label: string; className?: string }) {
  if (src) return <img src={asset(src)} alt={label} loading="lazy" className={`object-cover ${className}`} />
  return (
    <div
      role="img"
      aria-label={`Espaço reservado: ${label}`}
      className={`flex flex-col items-center justify-center gap-2 text-center text-xs font-semibold ${className}`}
      style={{ background: 'repeating-linear-gradient(45deg,#1a1a1a,#1a1a1a 14px,#222 14px,#222 28px)', color: '#8a8a8a' }}
    >
      <Camera size={28} />
      Foto: {label}
    </div>
  )
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-extrabold uppercase tracking-[0.25em]" style={{ color: Y }}>
      {children}
    </p>
  )
}

function FlavorCard({ f }: { f: Flavor }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#161616]">
      <Photo src={f.image} label={f.name} className="h-48 w-full" />
      <div className="p-5">
        <h3 className="text-xl font-extrabold text-white">{f.name}</h3>
        <p className="mt-1 text-sm text-neutral-400">{f.description}</p>
        <p className="mt-3 text-lg font-extrabold" style={{ color: Y }}>
          {brl(f.price ?? PRICE)}
        </p>
      </div>
    </article>
  )
}

export default function TioEddy() {
  const { go } = useApp()
  const back = (
    <button
      onClick={() => {
        go('economia')
        window.scrollTo(0, 0)
      }}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
    >
      <ArrowLeft size={16} /> Voltar ao Move+
    </button>
  )

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0b0b0b]/90 px-5 py-3 backdrop-blur">
        <span className="text-xl font-extrabold tracking-tight">
          <span style={{ color: Y }}>●</span> TIO EDDY
        </span>
        {back}
      </header>

      {/* 1. Apresentação */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-24">
        <div>
          <Eyebrow>Snack · pão sírio · azeite extravirgem</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl" style={{ fontFamily: "'Fraunces', serif" }}>
            {BRAND.heroTitle}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-neutral-300">{BRAND.heroText}</p>
          <p className="mt-6 border-l-4 pl-4 text-base font-semibold" style={{ borderColor: Y, color: Y }}>
            {BRAND.tagline}
          </p>
        </div>
        <Photo src={BRAND.heroImage} label="foto de destaque do produto" className="aspect-square w-full rounded-3xl" />
      </section>

      {/* 2. Ingredientes */}
      <section className="border-y border-white/10 bg-[#111] py-14">
        <div className="mx-auto max-w-6xl px-5">
          <Eyebrow>Ingredientes</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold">Conheça nossos ingredientes</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INGREDIENTS.map((i) => (
              <div key={i.name} className="rounded-2xl border border-white/10 bg-[#161616] p-6">
                <Leaf style={{ color: Y }} />
                <h3 className="mt-3 text-xl font-extrabold">{i.name}</h3>
                {i.description && <p className="mt-1 text-sm text-neutral-400">{i.description}</p>}
              </div>
            ))}
            <div className="rounded-2xl border border-dashed border-white/20 p-6 text-sm text-neutral-500">
              Outros ingredientes serão adicionados aqui quando forem confirmados.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sabores */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <Eyebrow>Sabores</Eyebrow>
        <h2 className="mt-2 text-3xl font-extrabold">Conheça os sabores</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FLAVORS.length > 0 ? (
            FLAVORS.map((f) => <FlavorCard key={f.id} f={f} />)
          ) : (
            <article className="overflow-hidden rounded-2xl border border-dashed border-white/20 bg-[#161616]">
              <Photo label="foto do sabor" className="h-48 w-full" />
              <div className="p-5">
                <h3 className="text-xl font-extrabold">Sabores em breve</h3>
                <p className="mt-1 text-sm text-neutral-400">
                  Os sabores disponíveis serão apresentados aqui, cada um com foto, descrição e preço.
                </p>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* 4. Preço */}
      <section className="py-14" style={{ background: Y, color: '#0b0b0b' }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em]">Preço</p>
          <p className="text-6xl font-extrabold sm:text-7xl" style={{ fontFamily: "'Fraunces', serif" }}>
            {brl(PRICE)}
          </p>
          <p className="text-sm font-semibold opacity-70">Preço informado pela marca.</p>
        </div>
      </section>

      {/* 5. Comparação */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <Eyebrow>Outra possibilidade</Eyebrow>
        <h2 className="mt-2 text-3xl font-extrabold">Propostas lado a lado</h2>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Cada snack tem a sua proposta. Olhar a composição e a lista de ingredientes ajuda a escolher com mais informação.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[520px] text-left">
            <thead className="bg-[#161616] text-sm">
              <tr>
                <th className="p-4 text-neutral-400">Critério</th>
                <th className="p-4" style={{ color: Y }}>
                  Tio Eddy
                </th>
                <th className="p-4 text-neutral-300">Outros snacks</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((r) => (
                <tr key={r.label} className="border-t border-white/10">
                  <th scope="row" className="p-4 font-bold">
                    {r.label}
                  </th>
                  <td className="p-4 font-semibold">{r.eddy}</td>
                  <td className="p-4 text-neutral-400">{r.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
          <Sparkles size={14} /> Comparação informativa, sem juízo de valor. Confira sempre o rótulo de cada produto.
        </p>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 text-center">{back}</footer>
    </div>
  )
}
