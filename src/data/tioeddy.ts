/**
 * Dados editáveis da aba Tio Eddy.
 * Para atualizar: edite este arquivo (sabores, ingredientes, fotos, preço).
 * Fotos: coloque o arquivo em /public/tioeddy/ e preencha `image` (ex.: 'tioeddy/original.jpg').
 */
export interface Flavor {
  id: string
  name: string
  description: string
  /** Se vazio, usa o preço geral do produto. */
  price?: number
  image?: string
}

export interface Ingredient {
  name: string
  description?: string
}

export const BRAND = {
  name: 'Tio Eddy',
  tagline: 'Se é para escolher um snack, conheça uma opção com outra proposta.',
  heroTitle: 'Tio Eddy: uma nova proposta para seus momentos de snack.',
  heroText:
    'Feito à base de pão sírio e azeite extravirgem, o Tio Eddy apresenta uma proposta diferente para quem gosta de snacks e quer conhecer novas opções.',
  /** Foto de destaque (opcional). */
  heroImage: '' as string,
}

export const PRICE = 14.99

export const INGREDIENTS: Ingredient[] = [
  { name: 'Pão sírio' },
  { name: 'Azeite extravirgem' },
  // Adicione aqui outros ingredientes quando forem confirmados:
  // { name: 'Nome', description: 'Descrição' },
]

/** Sabores reais ainda não informados. Adicione objetos aqui e os cartões aparecem sozinhos. */
export const FLAVORS: Flavor[] = []

export const COMPARISON = [
  { label: 'Base do produto', eddy: 'Pão sírio', other: 'Consulte o rótulo' },
  { label: 'Gordura em destaque', eddy: 'Azeite extravirgem', other: 'Consulte o rótulo' },
  { label: 'Lista completa de ingredientes', eddy: 'A confirmar', other: 'Consulte o rótulo' },
  { label: 'Informação nutricional', eddy: 'A confirmar', other: 'Consulte o rótulo' },
]
