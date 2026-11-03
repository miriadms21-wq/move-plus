import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { ageGroupOf, type AgeGroup, type Intensity } from './data/activities'

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
}

const AppCtx = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>(pageFromHash)
  const [profile, setProfileState] = useState<Profile | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [weight, setWeight] = useState<number | null>(null)

  useEffect(() => {
    const onHash = () => setPage(pageFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
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
    go('home')
  }

  const ageGroup = age !== null && age >= 0 ? ageGroupOf(age) : null

  return (
    <AppCtx.Provider value={{ page, go, profile, setProfile, age, setAge, ageGroup, weight, setWeight, restart }}>
      {children}
    </AppCtx.Provider>
  )
}

export function useApp(): Ctx {
  const c = useContext(AppCtx)
  if (!c) throw new Error('useApp fora do AppProvider')
  return c
}
