import { FlaskConical, Library, Sparkles } from 'lucide-react'
import { ACTIVITIES } from '../data/activities'
import { MoviSays } from '../components/ui'
import { useApp } from '../state'

export default function Home() {
  const { go, teen } = useApp()
  return (
    <div>
      <section className="rounded-[2rem] border-2 border-tinta p-6 sm:p-10 text-center text-tinta bg-gradient-to-br from-menta via-creme to-lilas shadow-[0_6px_0_#2b2d42]">
        <p className="inline-block bg-white border-2 border-tinta rounded-full px-4 py-1 text-sm font-extrabold">
          {teen ? '🎮 Desafio: descubra seu personagem Move+' : 'Projeto interdisciplinar'}
        </p>
        <h1 className="mt-4 text-6xl sm:text-8xl font-extrabold leading-none">
          <span className="neon-title">Move</span>
          <span className="text-rosa [-webkit-text-stroke:3px_#2b2d42]">+</span>
        </h1>
        <p className="mt-2 text-xl sm:text-3xl font-bold font-display">Movimente-se, descubra e aprenda!</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-5" aria-hidden="true">
          {ACTIVITIES.map((a, i) => (
            <span
              key={a.id}
              className="floaty grid place-items-center size-14 sm:size-20 rounded-full border-2 border-tinta text-3xl sm:text-5xl"
              style={{ background: a.color, animationDelay: `${i * 0.25}s` }}
            >
              {a.emoji}
            </span>
          ))}
        </div>

        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg font-semibold">
          {teen ? (
            <>
              Bora ver o que seu corpo faz com energia? Crie seu <b>personagem</b>, ganhe <b>XP</b>, suba de nível, desbloqueie <b>conquistas</b> e descubra qual das 7
              atividades combina com você. Educação Física + Ciências + Matemática, só que jogando. 🚀
            </>
          ) : (
            <>
              O Move+ junta <b>Educação Física</b>, <b>Ciências</b> e <b>Matemática</b> para você conhecer 7 atividades, entender como o corpo usa energia e receber
              sugestões que combinam com o seu perfil.
            </>
          )}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn text-lg" onClick={() => go('perfil')}>
            <Sparkles size={20} /> {teen ? 'Bora começar! 🔥' : 'Começar minha descoberta!'}
          </button>
          <button className="btn btn-ghost" onClick={() => go('biblioteca')}>
            <Library size={18} /> Biblioteca de atividades
          </button>
          <button className="btn btn-menta" onClick={() => go('laboratorio')}>
            <FlaskConical size={18} /> Laboratório de comparações
          </button>
        </div>
      </section>

      <div className="mt-8 max-w-2xl">
        <MoviSays mood="cheer">Oi! Eu sou o Movi! Vamos descobrir como nosso corpo utiliza energia e conhecer atividades físicas incríveis?</MoviSays>
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { t: '1. Conte sobre você', d: 'Responda 6 perguntinhas rápidas. Sem nome, sem e-mail, sem cadastro.', c: '#FFD87E' },
          { t: '2. Receba sugestões', d: 'O Move+ indica até 3 atividades e mostra os critérios usados.', c: '#FFB5C8' },
          { t: '3. Explore e aprenda', d: 'Calcule, compare, descubra curiosidades e teste seu conhecimento no quiz.', c: '#B8C8FF' },
        ].map((s) => (
          <div key={s.t} className="card p-5" style={{ borderTop: `8px solid ${s.c}` }}>
            <h2 className="text-xl font-extrabold">{s.t}</h2>
            <p className="mt-1 text-tinta-suave font-semibold">{s.d}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
