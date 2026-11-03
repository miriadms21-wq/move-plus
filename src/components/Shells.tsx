import { useState, type ReactNode } from 'react'
import { Grid2x2, Menu, X } from 'lucide-react'
import { useApp, type Mode, type PageId } from '../state'
import { Hud } from './game'
import { Modal } from './ui'

export interface NavItem {
  id: PageId
  label: string
  icon: ReactNode
}

export function ModeSwitch() {
  const { mode, setMode } = useApp()
  const opts: [Mode, string][] = [
    ['classic', 'Clássico'],
    ['teen', '🔥 Teen'],
    ['premium', '✨ Premium'],
  ]
  return (
    <div className="segmented" role="group" aria-label="Escolha a versão do site">
      {opts.map(([m, label]) => (
        <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>
          {label}
        </button>
      ))}
    </div>
  )
}

/** Versões Clássica e Teen: barra superior. */
export function TopShell({ nav, children }: { nav: NavItem[]; children: ReactNode }) {
  const { page, go, teen } = useApp()
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="site-header sticky top-0 z-40 bg-creme/95 backdrop-blur border-b-2 border-tinta">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
          <button onClick={() => go('home')} className="font-display text-2xl sm:text-3xl font-extrabold" aria-label="Move+, ir para o início">
            Move<span className="text-rosa [-webkit-text-stroke:2px_#2b2d42]">+</span>
          </button>
          <div className="flex items-center gap-2">
            {teen && <Hud />}
            <ModeSwitch />
          </div>
          <nav className="hidden 2xl:flex flex-wrap gap-1" aria-label="Principal">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                aria-current={page === n.id ? 'page' : undefined}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold border-2 ${page === n.id ? 'bg-amarelo border-tinta' : 'border-transparent hover:bg-white'}`}
              >
                {n.icon} {n.label}
              </button>
            ))}
          </nav>
          <button className="2xl:hidden btn btn-ghost !p-2" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="2xl:hidden grid grid-cols-2 gap-2 px-4 pb-3" aria-label="Menu">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  go(n.id)
                  setOpen(false)
                }}
                className={`flex items-center gap-2 rounded-2xl px-3 py-2 font-bold border-2 border-tinta ${page === n.id ? 'bg-amarelo' : 'bg-white'}`}
              >
                {n.icon} {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>
      <main id="conteudo" className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-10 flex-1" key={page}>
        <div className="page-in">{children}</div>
      </main>
      <footer className="site-footer border-t-2 border-tinta bg-menta/40 px-4 py-5 text-center text-sm font-semibold">
        Move+ · Projeto escolar educativo · Valores baseados no 2024 Adult Compendium of Physical Activities · Não substitui orientação de profissionais de saúde.
      </footer>
    </div>
  )
}

/** Versão Premium: aplicativo com barra lateral (desktop) e abas (celular). */
export function PremiumShell({ nav, children }: { nav: NavItem[]; children: ReactNode }) {
  const { page, go } = useApp()
  const [more, setMore] = useState(false)
  const tabs = nav.filter((n) => ['home', 'perfil', 'biblioteca', 'calculadora'].includes(n.id))
  const moreActive = !tabs.some((t) => t.id === page)

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden lg:flex lg:w-64 xl:w-72 shrink-0 flex-col gap-1 p-5 sticky top-0 h-screen overflow-y-auto border-r border-[rgba(27,27,47,0.1)]">
        <button onClick={() => go('home')} className="px-2 text-left" aria-label="Move+, ir para o início">
          <span className="font-display text-4xl font-semibold tracking-tight">
            Move<span className="text-[#f0709a]">+</span>
          </span>
          <span className="block text-xs font-bold text-tinta-suave mt-0.5">Movimente-se, descubra e aprenda!</span>
        </button>
        <nav className="mt-6 flex flex-col gap-1" aria-label="Principal">
          {nav.map((n) => (
            <button key={n.id} className="sidebar-link" aria-current={page === n.id ? 'page' : undefined} onClick={() => go(n.id)}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 space-y-3">
          <ModeSwitch />
          <p className="text-[11px] leading-snug font-semibold text-tinta-suave">
            Projeto escolar educativo. Valores do 2024 Adult Compendium of Physical Activities. Não substitui orientação de profissionais de saúde.
          </p>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-2 px-4 py-2.5 bg-[#faf8f3]/85 backdrop-blur border-b border-[rgba(27,27,47,0.1)]">
          <button onClick={() => go('home')} className="font-display text-2xl font-semibold" aria-label="Move+, ir para o início">
            Move<span className="text-[#f0709a]">+</span>
          </button>
          <ModeSwitch />
        </header>
        <main id="conteudo" className="mx-auto w-full max-w-5xl px-4 sm:px-8 py-6 sm:py-10 pb-28 lg:pb-12 flex-1" key={page}>
          <div className="page-in">{children}</div>
        </main>
      </div>

      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex bg-white/92 backdrop-blur border-t border-[rgba(27,27,47,0.1)] px-2 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1"
        aria-label="Navegação principal"
      >
        {tabs.map((n) => (
          <button key={n.id} className="tabbar-link" aria-current={page === n.id ? 'page' : undefined} onClick={() => go(n.id)}>
            <span className="tab-ico">{n.icon}</span>
            {n.label}
          </button>
        ))}
        <button className="tabbar-link" aria-current={moreActive ? 'page' : undefined} onClick={() => setMore(true)}>
          <span className="tab-ico">
            <Grid2x2 size={18} />
          </span>
          Mais
        </button>
      </nav>

      {more && (
        <Modal title="Todas as telas" onClose={() => setMore(false)}>
          <div className="grid grid-cols-2 gap-2">
            {nav.map((n) => (
              <button
                key={n.id}
                className="sidebar-link border border-[rgba(27,27,47,0.1)]"
                aria-current={page === n.id ? 'page' : undefined}
                onClick={() => {
                  go(n.id)
                  setMore(false)
                }}
              >
                {n.icon} {n.label}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}
