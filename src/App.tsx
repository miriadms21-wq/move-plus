import { useState } from 'react'
import { BookOpen, Calculator as CalcIcon, FlaskConical, Home as HomeIcon, Library, Menu, Presentation as PresIcon, Salad, Sparkles, Trophy, UserRound, X } from 'lucide-react'
import { AppProvider, useApp, type PageId } from './state'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Library_ from './pages/Library'
import Calculator from './pages/Calculator'
import Recommendations from './pages/Recommendations'
import Energy from './pages/Energy'
import Lab from './pages/Lab'
import Quiz from './pages/Quiz'
import Sources from './pages/Sources'
import Presentation from './pages/Presentation'
import { Confetti, Hud, Toast } from './components/game'

const NAV: { id: PageId; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Início', icon: <HomeIcon size={18} /> },
  { id: 'perfil', label: 'Meu perfil', icon: <UserRound size={18} /> },
  { id: 'biblioteca', label: 'Atividades', icon: <Library size={18} /> },
  { id: 'calculadora', label: 'Calculadora', icon: <CalcIcon size={18} /> },
  { id: 'recomendacoes', label: 'Recomendações', icon: <Sparkles size={18} /> },
  { id: 'energia', label: 'Energia', icon: <Salad size={18} /> },
  { id: 'laboratorio', label: 'Laboratório', icon: <FlaskConical size={18} /> },
  { id: 'quiz', label: 'Quiz', icon: <Trophy size={18} /> },
  { id: 'fontes', label: 'Fontes', icon: <BookOpen size={18} /> },
  { id: 'apresentacao', label: 'Apresentação', icon: <PresIcon size={18} /> },
]

const PAGES: Record<PageId, () => React.ReactElement> = {
  home: Home,
  perfil: Profile,
  biblioteca: Library_,
  calculadora: Calculator,
  recomendacoes: Recommendations,
  energia: Energy,
  laboratorio: Lab,
  quiz: Quiz,
  fontes: Sources,
  apresentacao: Presentation,
}

function Shell() {
  const { page, go, teen, setTeen } = useApp()
  const [open, setOpen] = useState(false)
  const Page = PAGES[page]
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Pular para o conteúdo</a>
      <Confetti />
      <Toast />
      <header className="site-header sticky top-0 z-40 bg-creme/95 backdrop-blur border-b-2 border-tinta">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-3">
          <button onClick={() => go('home')} className="font-display text-2xl sm:text-3xl font-extrabold" aria-label="Move+, ir para o início">
            Move<span className="text-rosa [-webkit-text-stroke:2px_#2b2d42]">+</span>
          </button>
          <div className="flex items-center gap-2">
            {teen && <Hud />}
            <button
              onClick={() => setTeen(!teen)}
              aria-pressed={teen}
              className={`whitespace-nowrap rounded-full border-2 border-tinta px-3 py-1.5 text-sm font-extrabold ${teen ? 'bg-rosa' : 'bg-white'}`}
              title="Alterna entre a versão clássica e a versão Teen"
            >
              🔥 <span className="hidden sm:inline">Modo </span>Teen{teen && <span className="hidden sm:inline">: ON</span>}
            </button>
          </div>
          <nav className="hidden xl:flex flex-wrap gap-1" aria-label="Principal">
            {NAV.map((n) => (
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
          <button className="xl:hidden btn btn-ghost !p-2" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="xl:hidden grid grid-cols-2 gap-2 px-4 pb-3" aria-label="Menu">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => { go(n.id); setOpen(false) }}
                className={`flex items-center gap-2 rounded-2xl px-3 py-2 font-bold border-2 border-tinta ${page === n.id ? 'bg-amarelo' : 'bg-white'}`}
              >
                {n.icon} {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main id="conteudo" className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-10 flex-1" key={page}>
        <div className="page-in"><Page /></div>
      </main>

      <footer className="site-footer border-t-2 border-tinta bg-menta/40 px-4 py-5 text-center text-sm font-semibold">
        Move+ · Projeto escolar educativo · Valores baseados no 2024 Adult Compendium of Physical Activities · Não substitui orientação de profissionais de saúde.
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
