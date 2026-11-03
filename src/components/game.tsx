import { useMemo, useState } from 'react'
import { Trophy } from 'lucide-react'
import { BADGES, levelOf } from '../lib/game'
import { useApp } from '../state'
import { Modal } from './ui'

const COLORS = ['#A9E8D4', '#B8C8FF', '#FFD87E', '#FFB5C8', '#F6F3E9']

export function Confetti() {
  const { burst, teen } = useApp()
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        dx: (Math.random() - 0.5) * 240,
        rot: (Math.random() - 0.5) * 900,
        dur: 1.4 + Math.random() * 1.2,
        delay: Math.random() * 0.25,
        color: COLORS[i % COLORS.length],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burst],
  )
  if (!teen || burst === 0) return null
  return (
    <div aria-hidden="true" key={burst}>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={
            {
              left: `${p.left}vw`,
              background: p.color,
              animationDelay: `${p.delay}s`,
              '--dx': `${p.dx}px`,
              '--rot': `${p.rot}deg`,
              '--dur': `${p.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

export function Toast() {
  const { toast, teen } = useApp()
  if (!toast || !teen) return null
  return (
    <div
      role="status"
      className="toast fixed bottom-6 left-1/2 z-50 max-w-[92vw] rounded-full border-2 border-white bg-tinta px-5 py-3 text-center font-extrabold text-creme shadow-[0_0_30px_rgba(255,216,126,0.6)]"
    >
      {toast}
    </div>
  )
}

export function Hud() {
  const { xp, keys } = useApp()
  const [open, setOpen] = useState(false)
  const lv = levelOf(xp)
  const owned = BADGES.filter((b) => b.has(keys))
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-3 py-1 text-left"
        aria-label={`Nível ${lv.n}, ${lv.name}, ${xp} XP. Abrir conquistas`}
      >
        <Trophy size={18} className="text-amarelo" />
        <span className="leading-tight">
          <span className="block whitespace-nowrap text-xs font-extrabold">
            Nv {lv.n}
            <span className="hidden sm:inline"> · {lv.name}</span>
          </span>
          <span className="hud-bar block w-12 sm:w-24">
            <div style={{ width: `${lv.pct}%` }} />
          </span>
        </span>
        <span className="whitespace-nowrap text-xs font-extrabold">{xp} XP</span>
      </button>
      {open && (
        <Modal title="🏆 Suas conquistas" onClose={() => setOpen(false)}>
          <p className="font-semibold">
            Nível <b>{lv.n} · {lv.name}</b> — {xp} XP{lv.next ? ` (faltam ${lv.next - xp} para o próximo nível)` : ' (nível máximo!)'}
          </p>
          <div className="mt-2 h-4 rounded-full border-2 border-tinta bg-white overflow-hidden">
            <div className="h-full bg-menta transition-all duration-500" style={{ width: `${lv.pct}%` }} />
          </div>
          <p className="mt-3 text-sm font-semibold text-tinta-suave">
            Missões: use o site para ganhar XP. É só um jogo de aprendizagem, sem relação com peso, calorias ou desempenho físico.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {BADGES.map((b) => {
              const has = owned.includes(b)
              return (
                <li key={b.id} className={`rounded-2xl border-2 border-tinta p-3 ${has ? 'bg-amarelo' : 'bg-creme opacity-70'}`}>
                  <div className="text-3xl">{has ? b.emoji : '🔒'}</div>
                  <div className="font-extrabold">{b.name}</div>
                  <div className="text-sm font-semibold">{b.how}</div>
                </li>
              )
            })}
          </ul>
        </Modal>
      )}
    </>
  )
}
