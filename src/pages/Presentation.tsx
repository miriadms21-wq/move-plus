import { NavButtons, PageHeader } from '../components/ui'
import { useApp, type PageId } from '../state'

const STEPS: { n: number; title: string; say: string; page: PageId; btn: string }[] = [
  {
    n: 1,
    title: 'Como a idade influencia as recomendações',
    say: 'Faça o perfil com 10 anos e veja as recomendações. Depois refaça com 70 anos. As atividades sugeridas mudam, porque a faixa etária é a primeira regra.',
    page: 'perfil',
    btn: 'Abrir Meu perfil',
  },
  {
    n: 2,
    title: 'Como cada modalidade funciona',
    say: 'Abra a ficha de duas ou três atividades. Mostre benefícios, cuidados, adaptações e as faixas etárias.',
    page: 'biblioteca',
    btn: 'Abrir a Biblioteca',
  },
  {
    n: 3,
    title: 'Como tempo e intensidade mudam a energia',
    say: 'Na calculadora, use idade de adulto e peso. Dobre o tempo (a energia dobra) e troque a intensidade (o gráfico muda). Abra o "Entenda esse cálculo".',
    page: 'calculadora',
    btn: 'Abrir a Calculadora',
  },
  {
    n: 4,
    title: 'Como comparar duas atividades',
    say: 'No Laboratório, escolha duas modalidades e compare benefícios, músculos e energia. Depois mexa no experimento do tempo.',
    page: 'laboratorio',
    btn: 'Abrir o Laboratório',
  },
  {
    n: 5,
    title: 'Como o organismo usa energia',
    say: 'Explique a energia dos alimentos (kcal), o gasto em repouso e o gasto na atividade. Eles são painéis separados de propósito.',
    page: 'energia',
    btn: 'Abrir Energia e alimentação',
  },
  {
    n: 6,
    title: 'Metodologia e fontes',
    say: 'Mostre a tabela com o código do Compêndio de cada MET e as limitações. Explique por que não calculamos calorias para crianças e adolescentes.',
    page: 'fontes',
    btn: 'Abrir Fontes',
  },
]

const SUBJECTS = [
  { s: 'Matemática', c: '#FFD87E', t: 'Fórmula, multiplicação e proporção (dobrar o tempo dobra a energia), leitura de gráficos e porcentagens.' },
  { s: 'Ciências', c: '#A9E8D4', t: 'Energia, metabolismo, quilocalorias, oxigênio usado, gasto em repouso e na atividade.' },
  { s: 'Educação Física', c: '#FFB5C8', t: 'Modalidades, benefícios, intensidade, cuidados, adaptações e hábitos saudáveis.' },
]

export default function Presentation() {
  const { go, restart } = useApp()
  return (
    <div className="page-in">
      <PageHeader title="Modo apresentação" subtitle="Roteiro de 6 passos para demonstrar o Move+ ao vivo." />

      <ol className="space-y-3">
        {STEPS.map((s) => (
          <li key={s.n} className="card p-4 flex gap-4 items-start">
            <span className="grid place-items-center size-10 shrink-0 rounded-full bg-amarelo border-2 border-tinta font-extrabold text-lg">{s.n}</span>
            <div className="flex-1">
              <h2 className="text-lg font-extrabold">{s.title}</h2>
              <p className="font-semibold text-tinta-suave">{s.say}</p>
              <button className="btn btn-ghost mt-2 !py-1.5 text-sm" onClick={() => go(s.page)}>{s.btn}</button>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-8 text-2xl font-extrabold">Três disciplinas, um projeto</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        {SUBJECTS.map((x) => (
          <div key={x.s} className="card p-4" style={{ background: x.c }}>
            <h3 className="text-xl font-extrabold">{x.s}</h3>
            <p className="font-semibold">{x.t}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button className="btn btn-menta" onClick={restart}>Reiniciar a experiência (limpa os dados)</button>
      </div>
      <NavButtons back="fontes" />
    </div>
  )
}
