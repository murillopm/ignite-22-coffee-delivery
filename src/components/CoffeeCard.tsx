import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import { useContext, useState } from 'react'
import { CoffeeCartContext } from '../contexts/CoffeeCartContext'

type CoffeeCartData = {
  id: number
  name: string
  image: string
  amount: number
  price: number
}

interface CoffeCardProps {
  id: number
  name: string
  description: string
  labels: string[]
  price: number
  image: string
}

export function CoffeeCard(coffee: CoffeCardProps) {
  const { cartItems, addItemToCart } = useContext(CoffeeCartContext)
  const [amount, setAmount] = useState(() => {
    const itemIsInCart = cartItems.find((item) => item.id === coffee.id)
    if (itemIsInCart) {
      return itemIsInCart.amount
    } else {
      return 1
    }
  })

  const { id, name, description, labels, price, image } = coffee

  function handleDecreaseAmount() {
    if (amount > 1) {
      setAmount((state) => state - 1)
    }
  }

  function handleIncreaseAmount() {
    setAmount((state) => state + 1)
  }

  function formatPrice(price: number) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
      .format(price)
      .replace(/R\$\s/g, '')
  }

  function handleAddItemToCart() {
    const itemToBeAdded: CoffeeCartData = {
      id,
      name,
      image,
      price,
      amount,
    }
    addItemToCart(itemToBeAdded)
  }

  return (
    <div className="w-[256px] h-[310px] pb-5 bg-brand-base-card rounded-tl-md rounded-br-md rounded-tr-[36px] rounded-bl-[36px] flex flex-col items-center">
      <img className="mt-[-20px] h-[120px] w-[120px]" src={image} alt="" />
      <div className="mt-3 flex justify-center items-center gap-1">
        {labels.map((label) => (
          <span
            key={label}
            className="px-2 py-1 rounded-full bg-brand-yellow-light text-brand-yellow-dark font-bold text-[10px]"
          >
            {label.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="mx-5">
        <p className="mt-4 font-brand font-bold text-center">{name}</p>
        <p className="mt-2 text-center text-sm text-brand-base-label">
          {description}
        </p>
      </div>
      <div className="w-full mt-auto px-6 flex items-center justify-between">
        <span className="text-sm text-brand-base-text">
          R${' '}
          <strong className="text-[24px] leading-[130%] font-brand font-extrabold text-brand-base-text">
            {formatPrice(price)}
          </strong>
        </span>
        <div className="flex items-center gap-2">
          <span className="p-2 flex items-center justify-center gap-1 text-brand-base-title bg-brand-base-button rounded-md">
            <button>
              <Minus
                className="text-brand-purple hover:text-brand-purple-dark transition-colors"
                weight="bold"
                size={14}
                onClick={handleDecreaseAmount}
              />
            </button>
            &nbsp;{amount}&nbsp;
            <button>
              <Plus
                className="text-brand-purple hover:text-brand-purple-dark transition-colors"
                weight="bold"
                size={14}
                onClick={handleIncreaseAmount}
              />
            </button>
          </span>
          <button
            className="p-2 bg-brand-purple-dark text-brand-base-card rounded-md hover:bg-brand-purple transition-colors"
            onClick={handleAddItemToCart}
          >
            <ShoppingCart weight="fill" size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}
