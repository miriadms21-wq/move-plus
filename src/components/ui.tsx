import { useEffect, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { INTENSITIES, INTENSITY_LABEL, type Intensity } from '../data/activities'
import { useApp, type PageId } from '../state'

export function Movi({ size = 96, mood = 'happy' }: { size?: number; mood?: 'happy' | 'wow' | 'cheer' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Movi, a mascote do Move+" className="floaty shrink-0">
      <ellipse cx="60" cy="112" rx="28" ry="5" fill="#2b2d42" opacity="0.12" />
      <path
        d="M60 8c28 0 48 20 48 48 0 28-18 52-48 52S12 84 12 56C12 28 32 8 60 8z"
        fill="#A9E8D4"
        stroke="#2b2d42"
        strokeWidth="4"
      />
      <path d="M16 40c10-14 28-20 44-20s34 6 44 20" fill="none" stroke="#2b2d42" strokeWidth="4" />
      <path d="M17 38c10-12 27-18 43-18s33 6 43 18l-3 12c-10-8-24-12-40-12S30 42 20 50z" fill="#FFD87E" stroke="#2b2d42" strokeWidth="4" />
      <path d="M60 24v14M53 31h14" stroke="#2b2d42" strokeWidth="5" strokeLinecap="round" />
      <circle cx="42" cy="66" r="7" fill="#fff" stroke="#2b2d42" strokeWidth="3" />
      <circle cx="78" cy="66" r="7" fill="#fff" stroke="#2b2d42" strokeWidth="3" />
      <circle cx="43" cy="67" r="3.5" fill="#2b2d42" />
      <circle cx="79" cy="67" r="3.5" fill="#2b2d42" />
      <circle cx="32" cy="80" r="6" fill="#FFB5C8" opacity="0.8" />
      <circle cx="88" cy="80" r="6" fill="#FFB5C8" opacity="0.8" />
      {mood === 'wow' ? (
        <ellipse cx="60" cy="86" rx="7" ry="8" fill="#2b2d42" />
      ) : (
        <path
          d={mood === 'cheer' ? 'M44 80c4 16 28 16 32 0z' : 'M46 82c6 8 22 8 28 0'}
          fill={mood === 'cheer' ? '#fff' : 'none'}
          stroke="#2b2d42"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export function MoviSays({ children, mood }: { children: ReactNode; mood?: 'happy' | 'wow' | 'cheer' }) {
  return (
    <div className="flex items-center gap-3">
      <Movi size={72} mood={mood} />
      <div className="relative card px-4 py-3 text-sm sm:text-base font-semibold" role="note">
        <span className="sr-only">Movi diz: </span>
        {children}
      </div>
    </div>
  )
}

export function PageHeader({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: ReactNode }) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center gap-3">
        {icon}
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-tinta-suave text-lg">{subtitle}</p>}
    </header>
  )
}

export function Thermometer({ value }: { value: Intensity | null }) {
  const idx = value ? INTENSITIES.indexOf(value) : -1
  const colors = ['#A9E8D4', '#FFD87E', '#FFB5C8']
  return (
    <div className="flex items-end gap-2" role="img" aria-label={value ? `Intensidade ${INTENSITY_LABEL[value]}` : 'Intensidade não selecionada'}>
      {INTENSITIES.map((i, n) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className="w-8 rounded-full border-2 border-tinta transition-all duration-500"
            style={{ height: 20 + n * 16, background: n <= idx ? colors[n] : '#fff' }}
          />
          <span className="text-[11px] font-bold">{INTENSITY_LABEL[i]}</span>
        </div>
      ))}
    </div>
  )
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-tinta/50" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="card pop w-full max-w-2xl max-h-[88vh] overflow-y-auto p-5 sm:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-2xl font-extrabold">{title}</h2>
          <button className="btn btn-ghost !p-2" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Notice({ children }: { children: ReactNode }) {
  return <p className="text-sm bg-amarelo/90 text-tinta border-2 border-amarelo rounded-2xl px-4 py-3 font-semibold">{children}</p>
}

export function NavButtons({ back, next, nextLabel = 'Avançar' }: { back?: PageId; next?: PageId; nextLabel?: string }) {
  const { go } = useApp()
  return (
    <div className="mt-8 flex flex-wrap justify-between gap-3">
      {back ? (
        <button className="btn btn-ghost" onClick={() => go(back)}>
          <ArrowLeft size={18} /> Voltar
        </button>
      ) : (
        <span />
      )}
      {next && (
        <button className="btn" onClick={() => go(next)}>
          {nextLabel} <ArrowRight size={18} />
        </button>
      )}
    </div>
  )
}

/** Campos de idade e peso compartilhados pela Calculadora e pelo Laboratório. */
export function AgeWeight() {
  const { age, setAge, weight, setWeight, ageGroup } = useApp()
  return (
    <div className="grid grid-cols-2 gap-3">
      <label className="block text-sm font-bold">
        Sua idade
        <input
          type="number"
          min={0}
          max={110}
          inputMode="numeric"
          value={age ?? ''}
          onChange={(e) => setAge(e.target.value === '' ? null : Math.max(0, Math.min(110, Number(e.target.value))))}
          className="mt-1 w-full rounded-xl border-2 border-tinta/30 bg-white px-3 py-2 text-lg font-semibold"
          placeholder="ex.: 30"
        />
      </label>
      <label className="block text-sm font-bold">
        Peso em kg <span className="font-normal">(opcional)</span>
        <input
          type="number"
          min={20}
          max={250}
          inputMode="decimal"
          value={weight ?? ''}
          disabled={ageGroup === 'crianca' || ageGroup === 'adolescente'}
          onChange={(e) => setWeight(e.target.value === '' ? null : Number(e.target.value))}
          className="mt-1 w-full rounded-xl border-2 border-tinta/30 bg-white px-3 py-2 text-lg font-semibold disabled:bg-tinta/5"
          placeholder={ageGroup === 'crianca' || ageGroup === 'adolescente' ? 'não necessário' : 'ex.: 65'}
        />
      </label>
    </div>
  )
}
