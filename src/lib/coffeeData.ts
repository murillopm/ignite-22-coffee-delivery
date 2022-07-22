import Expresso from '../assets/coffeImageList/expresso.png'
import ExpressoAmericano from '../assets/coffeImageList/americano.png'
import ExpressoCremoso from '../assets/coffeImageList/expressocremoso.png'
import ExpressoGelado from '../assets/coffeImageList/cafegelado.png'
import CafeComLeite from '../assets/coffeImageList/cafecomleite.png'
import Latte from '../assets/coffeImageList/latte.png'
import Capuccino from '../assets/coffeImageList/capuccino.png'
import Macchiato from '../assets/coffeImageList/macchiato.png'
import Mocaccino from '../assets/coffeImageList/mochaccino.png'
import ChocolateQuente from '../assets/coffeImageList/chocolatequente.png'
import Cubano from '../assets/coffeImageList/cubano.png'
import Havaiano from '../assets/coffeImageList/havaiano.png'
import Arabe from '../assets/coffeImageList/arabe.png'
import Irlandes from '../assets/coffeImageList/irlandes.png'

export const coffeeData = [
  {
    id: 1,
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    image: Expresso,
    labels: ['Tradicional'],
    price: 9.9,
  },
  {
    id: 2,
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    image: ExpressoAmericano,
    labels: ['Tradicional'],
    price: 9.9,
  },
  {
    id: 3,
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    image: ExpressoCremoso,
    labels: ['Tradicional'],
    price: 9.9,
  },
  {
    id: 4,
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    image: ExpressoGelado,
    labels: ['Tradicional', 'Gelado'],
    price: 9.9,
  },
  {
    id: 5,
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    image: CafeComLeite,
    labels: ['Tradicional', 'Com leite'],
    price: 9.9,
  },
  {
    id: 6,
    name: 'Latte',
    description:
      'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    image: Latte,
    labels: ['Tradicional', 'Com leite'],
    price: 9.9,
  },
  {
    id: 7,
    name: 'Capuccino',
    description:
      'Bebida com canela feita de doses iguais de café, leite e espuma',
    image: Capuccino,
    labels: ['Tradicional', 'Com leite'],
    price: 9.9,
  },
  {
    id: 8,
    name: 'Macchiato',
    description:
      'Café expresso misturado com um pouco de leite quente e espuma',
    image: Macchiato,
    labels: ['Tradicional', 'Com leite'],
    price: 9.9,
  },
  {
    id: 9,
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    image: Mocaccino,
    labels: ['Tradicional', 'Com leite'],
    price: 9.9,
  },
  {
    id: 10,
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    image: ChocolateQuente,
    labels: ['Especial', 'Com leite'],
    price: 9.9,
  },
  {
    id: 11,
    name: 'Cubano',
    description:
      'Drink gelado de café expresso com rum, creme de leite e hortelã',
    image: Cubano,
    labels: ['Especial', 'Alcoólico', 'Gelado'],
    price: 9.9,
  },
  {
    id: 12,
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    image: Havaiano,
    labels: ['Especial'],
    price: 9.9,
  },
  {
    id: 13,
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    image: Arabe,
    labels: ['Especial'],
    price: 9.9,
  },
  {
    id: 14,
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    image: Irlandes,
    labels: ['Especial', 'Alcoólico'],
    price: 9.9,
  },
]
