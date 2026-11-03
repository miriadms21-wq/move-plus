export interface QuizQuestion {
  q: string
  options: string[]
  answer: number
  explain: string
}

export const QUIZ: QuizQuestion[] = [
  {
    q: 'Qual unidade costuma aparecer nos rótulos para indicar a energia dos alimentos?',
    options: ['Quilocaloria (kcal)', 'Quilograma (kg)', 'Litro (L)', 'Metro (m)'],
    answer: 0,
    explain: 'A quilocaloria (kcal) mede a energia contida nos alimentos. Ela também pode aparecer em quilojoules (kJ).',
  },
  {
    q: 'O corpo usa energia mesmo quando estamos dormindo?',
    options: ['Não, só quando nos movimentamos', 'Sim, para manter coração, respiração e temperatura', 'Só quando sonhamos', 'Só depois de comer'],
    answer: 1,
    explain: 'O corpo gasta energia o tempo todo, até em repouso. Esse gasto básico mantém funções vitais como respirar e bater o coração.',
  },
  {
    q: 'O que significa 1 MET?',
    options: ['A energia gasta em repouso', 'Um tipo de esporte', 'Uma quantidade de comida', 'Uma medida de distância'],
    answer: 0,
    explain: 'MET é o "equivalente metabólico". 1 MET corresponde ao gasto de energia em repouso. Uma atividade de 6 METs gasta cerca de 6 vezes essa energia.',
  },
  {
    q: 'Pelo "teste da conversa", como saber se a intensidade está moderada?',
    options: ['Não consigo falar nada', 'Consigo conversar, mas não consigo cantar', 'Consigo cantar facilmente', 'Estou sem fôlego total'],
    answer: 1,
    explain: 'Na intensidade moderada, dá para conversar, mas a respiração fica mais rápida. Se não dá para falar frases curtas, a intensidade está bem forte.',
  },
  {
    q: 'Qual característica é muito associada ao Pilates?',
    options: ['Postura e equilíbrio', 'Corridas longas', 'Jogos em equipe', 'Saltos em altura'],
    answer: 0,
    explain: 'O Pilates trabalha movimentos controlados, respiração, postura, equilíbrio e fortalecimento do centro do corpo.',
  },
  {
    q: 'Por que a hidroginástica costuma ter menos impacto nas articulações?',
    options: ['Porque a água ajuda a sustentar o corpo', 'Porque não exige movimento', 'Porque é sempre bem leve', 'Porque é feita só por idosos'],
    answer: 0,
    explain: 'Na água, o corpo "pesa" menos, então as articulações recebem menos impacto. A água também oferece resistência aos movimentos.',
  },
  {
    q: 'O gasto de energia de uma atividade representa todo o gasto de energia do dia?',
    options: ['Sim, é tudo', 'Não, o corpo gasta energia o dia todo', 'Só em atividades longas', 'Só em esportes coletivos'],
    answer: 1,
    explain: 'O gasto de uma atividade é só uma parte. O corpo também gasta energia em repouso, para digerir os alimentos e nas tarefas do dia a dia.',
  },
  {
    q: 'A fórmula de gasto energético do Move+ dá um resultado:',
    options: ['Exato, como uma medição', 'Aproximado, uma estimativa', 'Sempre igual para todas as pessoas', 'Que serve para decidir o que comer'],
    answer: 1,
    explain: 'A fórmula é uma aproximação. Cada pessoa é única, e o resultado real pode variar.',
  },
  {
    q: 'Qual cuidado é importante antes e durante uma atividade física?',
    options: ['Aquecer e se hidratar', 'Ficar sem beber água', 'Começar sempre no máximo', 'Pular o alongamento sempre'],
    answer: 0,
    explain: 'Aquecer prepara o corpo, e se hidratar ajuda no bem-estar. Começar com calma e respeitar os limites previne lesões.',
  },
  {
    q: 'Quais benefícios a dança pode trazer?',
    options: ['Ritmo, coordenação e socialização', 'Apenas força nos braços', 'Nenhum, é só diversão', 'Só melhora a velocidade'],
    answer: 0,
    explain: 'A dança trabalha ritmo, coordenação, expressão corporal, resistência e ainda ajuda na socialização.',
  },
  {
    q: 'Quem pode se beneficiar de se movimentar?',
    options: ['Pessoas de todas as idades, com adaptações e orientação', 'Só atletas', 'Só adultos', 'Só quem tem muita experiência'],
    answer: 0,
    explain: 'Existem formas de movimento para todas as idades e níveis. O importante é escolher algo adequado e, se necessário, buscar orientação profissional.',
  },
]

export const CURIOSITIES: { emoji: string; text: string; color: string }[] = [
  { emoji: '😴', text: 'Você sabia que o corpo utiliza energia até quando estamos dormindo?', color: '#B8C8FF' },
  { emoji: '💃', text: 'A dança também pode melhorar a coordenação e a memória de movimentos!', color: '#FFB5C8' },
  { emoji: '🚴', text: 'O ciclismo pode ser praticado de forma recreativa ou esportiva!', color: '#FFD87E' },
  { emoji: '🏊', text: 'Na água, o corpo "pesa" menos, por isso a hidroginástica tem menos impacto nas articulações.', color: '#A9E8D4' },
  { emoji: '🥋', text: 'No jiu-jitsu, a técnica vale mais do que a força.', color: '#B8C8FF' },
  { emoji: '🧠', text: 'O cérebro é um dos órgãos que mais usam energia, mesmo em repouso.', color: '#FFD87E' },
]

export const EXPLAINERS = {
  kcal: 'Uma quilocaloria (kcal) é a quantidade de energia necessária para aquecer 1 litro de água em cerca de 1 °C. Os rótulos usam kcal (e às vezes kJ) para mostrar a energia que um alimento pode fornecer.',
  body: 'O corpo obtém energia dos carboidratos, das gorduras e das proteínas dos alimentos. Em média, cada grama de carboidrato ou proteína fornece cerca de 4 kcal, e cada grama de gordura cerca de 9 kcal.',
  rest: 'Mesmo em repouso, o corpo gasta energia: para o coração bater, para respirar, manter a temperatura e fazer o cérebro funcionar. Esse é o gasto de repouso e, em geral, é a maior parte do gasto do dia.',
  activity: 'Quando nos movimentamos, os músculos precisam de mais energia. Quanto mais intensa e longa a atividade, maior tende a ser esse gasto extra.',
  notAll: 'O gasto de uma atividade é só uma parte do gasto de energia do dia. Por isso, ele não representa o gasto total, e não serve para "compensar" o que foi comido.',
}
