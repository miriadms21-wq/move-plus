/**
 * Dados editáveis da aba Tio Eddy.
 * Fonte: Drive "03_Marketing e Comunicação" (Brandbook V1 jul/2025, embalagens e ensaio de fotos).
 * Para atualizar: edite este arquivo. Fotos ficam em /public/tioeddy/.
 */
export interface Flavor {
  id: string
  name: string
  description: string
  /** Cor do sabor (a mesma da embalagem). */
  color: string
  /** Texto escuro ou claro sobre a cor. */
  ink: string
  logo: string
  pack: string
  photos: string[]
  /** Informações impressas na embalagem (por pacote de 80g). */
  nutrition: { kcal: string; trans: string; fibras: string; proteinas: string }
  /** Se vazio, usa o preço geral do produto. */
  price?: number
}

/** Paleta oficial (Brandbook V1). */
export const COLORS = {
  noite: '#1A1A1A',
  dourado: '#EFAC1F',
  mare: '#61B8FF',
  brasa: '#F56126',
  alecrim: '#7DBF61',
}

export const BRAND = {
  name: 'Tio Eddy',
  tagline: 'Se é para escolher um snack, conheça uma opção com outra proposta.',
  heroTitle: 'Uma nova proposta para seus momentos de snack.',
  heroText:
    'Feito à base de pão sírio e azeite extravirgem, o Tio Eddy apresenta uma proposta diferente para quem gosta de snacks e quer conhecer novas opções.',
  /** Texto da embalagem. */
  packLine: 'Snack assado de pão sírio de fermentação natural e azeite extravirgem',
  packPhrase: 'Leve, delicioso & muito crocante.',
  heroPhoto: 'tioeddy/fotos/picante-dip.jpg',
  /** História da marca (texto do verso da embalagem). */
  story: {
    title: 'Simples e gostoso, como nos bons tempos',
    paragraphs: [
      'Tio Eddy é do tempo em que o sabor não era artificial, comida gostosa não fazia mal e bons ingredientes eram regra.',
      'Em uma época de produtos ultraprocessados ou snacks “fit” sem graça, mostramos que dá pra ter o melhor dos dois mundos: sabor de verdade, com ingredientes naturais.',
      'Comer bem não precisa ser complicado — pode ser leve, prático e cheio de sabor.',
      'Tio Eddy é um snack feito para quem valoriza comida de verdade. Cada pacote é um convite pra viver melhor, comendo melhor.',
    ],
    closing: 'Como nos bons tempos! Tio Eddy. Valeu, vida!!',
    image: 'tioeddy/fotos/mascote.jpg',
  },
}

export const PRICE = 14.99

export const INGREDIENTS = [
  { name: 'Pão sírio', description: 'De fermentação natural, assado. É a base de todos os sabores.', photo: 'tioeddy/fotos/azeite-prato.jpg' },
  { name: 'Azeite extravirgem', description: 'O azeite que acompanha o pão sírio em cada pacote.', photo: 'tioeddy/fotos/azeite-dip.jpg' },
]

export const FLAVORS: Flavor[] = [
  {
    id: 'azeite-sal',
    name: 'Azeite & Sal',
    description: 'O sabor mais simples: pão sírio assado, azeite extravirgem e sal.',
    color: COLORS.mare,
    ink: COLORS.noite,
    logo: 'tioeddy/logo/L-RGB-5.svg',
    pack: 'tioeddy/packs/azeite.jpg',
    photos: ['tioeddy/fotos/azeite-prato.jpg', 'tioeddy/fotos/azeite-perto.jpg'],
    nutrition: { kcal: '272', trans: '0 g', fibras: '1,6 g', proteinas: '5,5 g' },
  },
  {
    id: 'picante',
    name: 'Picante',
    description: 'Para quem gosta de um toque de picância no pão sírio crocante.',
    color: COLORS.brasa,
    ink: '#fff',
    logo: 'tioeddy/logo/L-RGB-8.svg',
    pack: 'tioeddy/packs/picante.jpg',
    photos: ['tioeddy/fotos/picante-dip.jpg', 'tioeddy/fotos/picante-prato.jpg'],
    nutrition: { kcal: '270', trans: '0 g', fibras: '1,76 g', proteinas: '5,4 g' },
  },
  {
    id: 'parmesao-ervas',
    name: 'Parmesão & Ervas',
    description: 'Parmesão e ervas sobre o pão sírio assado.',
    color: COLORS.alecrim,
    ink: COLORS.noite,
    logo: 'tioeddy/logo/L-RGB-10.svg',
    pack: 'tioeddy/packs/parmesao.jpg',
    photos: ['tioeddy/fotos/parmesao-perto.jpg', 'tioeddy/fotos/parmesao-dip.jpg'],
    nutrition: { kcal: '278', trans: '0 g', fibras: '1,6 g', proteinas: '7,4 g' },
  },
]

/** Selo impresso nas embalagens (alegação da marca). */
export const WHY = [
  { big: '50%', small: 'menos gordura que um chips de batata tradicional' },
  { big: '0 g', small: 'de gordura trans por pacote' },
  { big: 'Assado', small: 'pão sírio de fermentação natural' },
  { big: 'Natural', small: 'ingredientes naturais, leve e muito crocante' },
]

export const PACK_SEAL = '50% menos gordura que um chips de batata tradicional'

/** Tabela nutricional do Azeite & Sal, por 100 g (verso da embalagem). */
export const NUTRI_100G = [
  { big: '340', small: 'kcal' },
  { big: '12 g', small: 'gorduras totais' },
  { big: '1,8 g', small: 'gorduras saturadas' },
  { big: '0 g', small: 'gorduras trans' },
  { big: '2 g', small: 'fibras' },
  { big: '6,9 g', small: 'proteínas' },
]
export const INGREDIENT_LIST =
  'Pão sírio (farinha de trigo enriquecida com ferro e ácido fólico, açúcar, sal e conservante propionato de cálcio), azeite de oliva extra virgem, sal. Contém derivados de trigo. Contém glúten.'

/**
 * Comparativo com outras marcas, por 100 g.
 * SÓ APARECE quando COMPETITORS_VERIFIED = true, depois de conferir cada valor no rótulo do produto.
 * Preencha 'value' com o número do rótulo e 'product' com o produto exato (sabor e gramagem).
 */
export const COMPETITORS_VERIFIED = false
export const COMPETITORS = [
  { name: 'Gulão', product: '', kcal: '', gordura: '', saturada: '' },
  { name: 'Cheetos', product: '', kcal: '', gordura: '', saturada: '' },
  { name: 'Doritos', product: '', kcal: '', gordura: '', saturada: '' },
]

export const COMPARISON = [
  { label: 'Base do produto', eddy: 'Pão sírio de fermentação natural', other: 'Consulte o rótulo' },
  { label: 'Como é feito', eddy: 'Assado', other: 'Consulte o rótulo' },
  { label: 'Gordura em destaque', eddy: 'Azeite extravirgem', other: 'Consulte o rótulo' },
  { label: 'Gordura trans (por pacote)', eddy: '0 g por pacote', other: 'Consulte o rótulo' },
]
