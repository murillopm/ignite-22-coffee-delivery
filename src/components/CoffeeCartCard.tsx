import { Minus, Plus } from 'phosphor-react'
import { useContext } from 'react'

import { CoffeeCartContext } from '../contexts/CoffeeCartContext'
import { RemoveButton } from './Buttons/RemoveButton'

type CoffeeCartCardProps = {
  id: number
  name: string
  image: string
  amount: number
  price: number
}

export function CoffeeCartCard({
  id,
  name,
  image,
  price,
  amount,
}: CoffeeCartCardProps) {
  const { incrementItemAmount, decrementItemAmount, removeItemFromCart } =
    useContext(CoffeeCartContext)

  return (
    <div className="flex-1 flex justify-between px-1 py-2">
      <div className="flex gap-5 items-center">
        <img src={image} className="h-16 w-16" alt="" />
        <div className="flex flex-col h-full gap-2 w-">
          <p>{name}</p>
          <div className="h-full flex gap-2 items-center">
            <span className="w-[72px] h-full marker:p-2 flex items-center justify-center gap-1 text-brand-base-title bg-brand-base-button rounded-md">
              <button type="button">
                <Minus
                  className="text-brand-purple hover:text-brand-purple-dark transition-colors"
                  weight="bold"
                  size={14}
                  onClick={() => decrementItemAmount(id)}
                />
              </button>
              &nbsp;{amount}&nbsp;
              <button type="button">
                <Plus
                  className="text-brand-purple hover:text-brand-purple-dark transition-colors"
                  weight="bold"
                  size={14}
                  onClick={() => incrementItemAmount(id)}
                />
              </button>
            </span>
            <RemoveButton onClick={() => removeItemFromCart(id)} />
          </div>
        </div>
      </div>
      <span className="text-brand-base-text font-bold text-base">
        {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price * amount)}
      </span>
    </div>
  )
}
