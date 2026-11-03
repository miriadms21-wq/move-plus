import { useMemo, useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { QUIZ } from '../data/content'
import { MoviSays, NavButtons, PageHeader } from '../components/ui'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Embaralha as alternativas de cada pergunta e guarda onde ficou a resposta certa. */
function buildQuiz() {
  return QUIZ.map((q) => {
    const opts = shuffle(q.options.map((text, i) => ({ text, ok: i === q.answer })))
    return { q: q.q, explain: q.explain, opts }
  })
}

export default function Quiz() {
  const [round, setRound] = useState(0)
  const quiz = useMemo(() => buildQuiz(), [round])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = quiz[i]
  const answered = picked !== null

  const pick = (n: number) => {
    if (answered) return
    setPicked(n)
    if (q.opts[n].ok) setScore((s) => s + 1)
  }
  const next = () => {
    if (i + 1 >= quiz.length) setFinished(true)
    else {
      setI(i + 1)
      setPicked(null)
    }
  }
  const restart = () => {
    setRound((r) => r + 1)
    setI(0)
    setPicked(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const pct = score / quiz.length
    const msg =
      pct >= 0.8
        ? 'Uau! Você é craque em movimento e energia!'
        : pct >= 0.5
          ? 'Muito bem! Você já sabe bastante. Que tal explorar o Laboratório?'
          : 'Boa tentativa! Aprender é parte da jornada. Visite a biblioteca e tente de novo!'
    return (
      <div className="page-in max-w-xl mx-auto text-center">
        <PageHeader title="Quiz Move+" />
        <div className="card p-6">
          <p className="text-lg font-bold">Sua pontuação de conhecimento</p>
          <p className="text-7xl font-extrabold font-display">{score}<span className="text-3xl">/{quiz.length}</span></p>
        </div>
        <div className="mt-6 flex justify-center"><MoviSays mood="cheer">{msg}</MoviSays></div>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <button className="btn" onClick={restart}><RotateCcw size={18} /> Jogar de novo</button>
        </div>
        <NavButtons back="laboratorio" next="fontes" nextLabel="Fontes e metodologia" />
      </div>
    )
  }

  return (
    <div className="page-in max-w-2xl mx-auto">
      <PageHeader title="Quiz Move+" subtitle="Teste o que você aprendeu sobre movimento e energia." />
      <div className="h-4 rounded-full border-2 border-tinta bg-white overflow-hidden mb-1" aria-hidden="true">
        <div className="h-full bg-menta transition-all duration-500" style={{ width: `${((i + (answered ? 1 : 0)) / quiz.length) * 100}%` }} />
      </div>
      <p className="mb-4 text-sm font-bold text-tinta-suave">Pergunta {i + 1} de {quiz.length}</p>

      <div className="card p-5" key={`${round}-${i}`}>
        <h2 className="text-xl sm:text-2xl font-extrabold">{q.q}</h2>
        <div className="mt-4 grid gap-3">
          {q.opts.map((o, n) => {
            const isPicked = picked === n
            const show = answered && (o.ok || isPicked)
            return (
              <button
                key={o.text}
                disabled={answered}
                onClick={() => pick(n)}
                className={`flex items-center justify-between gap-2 text-left rounded-2xl border-2 border-tinta px-4 py-3 font-bold text-lg transition-all disabled:cursor-default ${
                  show ? (o.ok ? 'bg-menta pop' : 'bg-rosa pop') : 'bg-white hover:bg-creme'
                } ${answered && !show ? 'opacity-60' : ''}`}
              >
                {o.text}
                {show && (o.ok ? <CheckCircle2 aria-label="Correta" /> : <XCircle aria-label="Incorreta" />)}
              </button>
            )
          })}
        </div>
        {answered && (
          <div className="mt-4 pop" role="status">
            <p className="font-extrabold text-lg">{q.opts[picked!].ok ? '🎉 Você acertou!' : '🤔 Quase! Veja a explicação:'}</p>
            <p className="font-semibold text-tinta-suave">{q.explain}</p>
          </div>
        )}
      </div>
      <div className="mt-5 flex justify-end">
        <button className="btn" disabled={!answered} onClick={next}>{i + 1 >= quiz.length ? 'Ver resultado' : 'Próxima'}</button>
      </div>
    </div>
  )
}
