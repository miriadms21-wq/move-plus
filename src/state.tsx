import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { ageGroupOf, type AgeGroup, type Intensity } from './data/activities'
import { BADGES } from './lib/game'

export type Experience = 'iniciante' | 'intermediario' | 'experiente'
export type SocialPref = 'sozinho' | 'grupo' | 'tanto-faz'
export type Goal = 'diversao' | 'socializacao' | 'coordenacao' | 'equilibrio' | 'condicionamento' | 'relaxamento'
export type IntensityPref = Intensity | 'nao-sei'
export type AdaptNeed = 'sim' | 'nao' | 'nao-informar'

export interface Profile {
  age: number
  ageGroup: AgeGroup
  experience: Experience
  social: SocialPref
  goal: Goal
  intensity: IntensityPref
  adaptNeed: AdaptNeed
  adaptations: string[]
}

export type PageId =
  | 'home'
  | 'perfil'
  | 'biblioteca'
  | 'calculadora'
  | 'recomendacoes'
  | 'energia'
  | 'laboratorio'
  | 'quiz'
  | 'fontes'
  | 'apresentacao'

const PAGES: PageId[] = [
  'home',
  'perfil',
  'biblioteca',
  'calculadora',
  'recomendacoes',
  'energia',
  'laboratorio',
  'quiz',
  'fontes',
  'apresentacao',
]

function pageFromHash(): PageId {
  const h = window.location.hash.replace('#/', '').replace('#', '')
  return (PAGES as string[]).includes(h) ? (h as PageId) : 'home'
}

function teenFromUrl(): boolean {
  try {
    return new URLSearchParams(window.location.search).get('modo') === 'teen'
  } catch {
    return false
  }
}

interface Ctx {
  page: PageId
  go: (p: PageId) => void
  profile: Profile | null
  setProfile: (p: Profile | null) => void
  /** Idade usada nos cálculos (vem do perfil ou é digitada na calculadora). */
  age: number | null
  setAge: (n: number | null) => void
  ageGroup: AgeGroup | null
  weight: number | null
  setWeight: (n: number | null) => void
  restart: () => void
  /** Modo Teen: visual neon e gamificação (XP, níveis, conquistas). */
  teen: boolean
  setTeen: (v: boolean) => void
  xp: number
  keys: string[]
  /** Dá XP uma única vez por chave. Chamadas repetidas são ignoradas. */
  award: (key: string, xp: number, text: string) => void
  toast: string | null
  burst: number
  celebrate: () => void
}

const AppCtx = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>(pageFromHash)
  const [profile, setProfileState] = useState<Profile | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [weight, setWeight] = useState<number | null>(null)
  const [teen, setTeen] = useState<boolean>(teenFromUrl)
  const [xp, setXp] = useState(0)
  const [keys, setKeys] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [burst, setBurst] = useState(0)

  useEffect(() => {
    const onHash = () => setPage(pageFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.teen = teen ? 'true' : 'false'
  }, [teen])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  const celebrate = useCallback(() => setBurst((b) => b + 1), [])

  const keysRef = useRef<string[]>([])

  const award = useCallback((key: string, points: number, text: string) => {
    const before = keysRef.current
    if (before.includes(key)) return
    const next = [...before, key]
    keysRef.current = next
    setKeys(next)
    setXp((x) => x + points)
    const newBadge = BADGES.find((b) => !b.has(before) && b.has(next))
    setToast(newBadge ? `${newBadge.emoji} Conquista desbloqueada: ${newBadge.name}! (+${points} XP)` : `+${points} XP · ${text}`)
    setBurst((b) => b + 1)
  }, [])

  const go = (p: PageId) => {
    window.location.hash = `#/${p}`
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const setProfile = (p: Profile | null) => {
    setProfileState(p)
    if (p) setAge(p.age)
  }

  const restart = () => {
    setProfileState(null)
    setAge(null)
    setWeight(null)
    setXp(0)
    keysRef.current = []
    setKeys([])
    go('home')
  }

  const ageGroup = age !== null && age >= 0 ? ageGroupOf(age) : null

  return (
    <AppCtx.Provider
      value={{ page, go, profile, setProfile, age, setAge, ageGroup, weight, setWeight, restart, teen, setTeen, xp, keys, award, toast, burst, celebrate }}
    >
      {children}
    </AppCtx.Provider>
  )
}

export function useApp(): Ctx {
  const c = useContext(AppCtx)
  if (!c) throw new Error('useApp fora do AppProvider')
  return c
}
