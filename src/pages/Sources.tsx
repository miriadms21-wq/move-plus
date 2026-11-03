import { useEffect } from 'react'
import { ACTIVITIES, INTENSITIES, INTENSITY_LABEL } from '../data/activities'
import { useApp } from '../state'
import { NavButtons, Notice, PageHeader } from '../components/ui'

export default function Sources() {
  const { award } = useApp()
  useEffect(() => {
    award('fontes', 20, 'Fontes lidas')
  }, [award])
  return (
    <div className="page-in">
      <PageHeader title="Fontes e metodologia" subtitle="De onde vêm os números do Move+ e quais são os limites." />

      <section className="card p-5">
        <h2 className="text-xl font-extrabold">Fontes</h2>
        <ul className="mt-2 list-disc pl-5 font-semibold space-y-2">
          <li>
            <b>2024 Adult Compendium of Physical Activities</b>, fonte de todos os valores de MET usados nos cálculos para adultos.{' '}
            <a className="underline font-extrabold" href="https://pacompendium.com/adult-compendium/" target="_blank" rel="noreferrer">pacompendium.com/adult-compendium</a>
          </li>
          <li>
            <b>Youth Compendium of Physical Activities</b> (NCCOR), consultado para entender o método para crianças e adolescentes, que usa METy (relação com o gasto basal da faixa etária).{' '}
            <a className="underline font-extrabold" href="https://www.nccor.org/tools-youthcompendium/" target="_blank" rel="noreferrer">nccor.org/tools-youthcompendium</a>
          </li>
          <li>
            <b>OMS</b>, Diretrizes sobre atividade física e comportamento sedentário (2020): referência geral para a recomendação de cerca de 60 min/dia (crianças e adolescentes).
          </li>
        </ul>
      </section>

      <section className="card p-5 mt-5">
        <h2 className="text-xl font-extrabold">Como calculamos (adultos)</h2>
        <p className="mt-1 font-semibold">kcal = (MET × 3,5 × peso em kg ÷ 200) × minutos. É uma aproximação, não uma medição exata.</p>
        <h2 className="text-xl font-extrabold mt-4">Limitações</h2>
        <ul className="mt-1 list-disc pl-5 font-semibold space-y-1">
          <li>O MET é uma média de grupos de pessoas e não considera condicionamento, composição corporal, técnica ou clima.</li>
          <li><b>Crianças e adolescentes:</b> o Move+ não calcula calorias individuais. A fórmula é para adultos, e não implementamos uma estimativa individual para jovens por falta de base segura para isso.</li>
          <li>Para algumas atividades, o Compêndio não tem valor em todas as intensidades. Nesses casos, o Move+ mostra "sem valor" em vez de inventar um número.</li>
          <li>O Compêndio não tem uma linha específica de jiu-jitsu: usamos "artes marciais (inclui jiu-jitsu)". Para hidroginástica usamos "water aerobics".</li>
          <li>As notas de 1 a 5 do comparador são uma escala didática do Move+ e não são dados científicos.</li>
          <li>As recomendações usam regras simples e visíveis. Não substituem orientação profissional.</li>
        </ul>
      </section>

      <section className="card p-5 mt-5 overflow-x-auto">
        <h2 className="text-xl font-extrabold mb-2">Valores de MET usados (Compêndio 2024)</h2>
        <table className="w-full text-sm font-semibold">
          <thead>
            <tr className="text-left border-b-2 border-tinta">
              <th className="py-2 pr-2">Atividade</th>
              <th className="pr-2">Intensidade</th>
              <th className="pr-2">MET</th>
              <th className="pr-2">Código</th>
              <th>Descrição original</th>
            </tr>
          </thead>
          <tbody>
            {ACTIVITIES.flatMap((a) =>
              INTENSITIES.filter((i) => a.mets[i]).map((i) => (
                <tr key={a.id + i} className="border-b border-tinta/10 align-top">
                  <td className="py-1 pr-2 font-extrabold">{a.name}</td>
                  <td className="pr-2">{INTENSITY_LABEL[i]}</td>
                  <td className="pr-2">{a.mets[i]!.met.toLocaleString('pt-BR')}</td>
                  <td className="pr-2">{a.mets[i]!.code}</td>
                  <td className="text-tinta-suave">{a.mets[i]!.original}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
        <p className="mt-2 text-sm font-semibold text-tinta-suave">Os rótulos de intensidade (leve, moderada, vigorosa) foram escolhidos a partir da descrição de cada linha do Compêndio.</p>
      </section>

      <section className="card p-5 mt-5">
        <h2 className="text-xl font-extrabold">Privacidade</h2>
        <p className="font-semibold">O Move+ não pede nome, e-mail ou telefone. As respostas ficam só na tela do seu aparelho e somem quando você reinicia ou fecha a página.</p>
      </section>
      <div className="mt-5"><Notice>O Move+ é um projeto educativo e não substitui avaliação ou orientação de profissionais de saúde e de Educação Física.</Notice></div>
      <NavButtons back="quiz" next="apresentacao" nextLabel="Modo apresentação" />
    </div>
  )
}
