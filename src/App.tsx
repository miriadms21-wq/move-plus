import { BookOpen, Calculator as CalcIcon, FlaskConical, Home as HomeIcon, Library, Presentation as PresIcon, Salad, Sparkles, Trophy, UserRound } from 'lucide-react'
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
import { Confetti, Toast } from './components/game'
import { PremiumShell, TopShell } from './components/Shells'

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
  const { page, mode } = useApp()
  const Page = PAGES[page]
  const Layout = mode === 'premium' ? PremiumShell : TopShell
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Pular para o conteúdo
      </a>
      <Confetti />
      <Toast />
      <Layout nav={NAV}>
        <Page />
      </Layout>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
