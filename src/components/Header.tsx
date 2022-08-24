import { MapPin, ShoppingCart } from 'phosphor-react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CoffeeCartContext } from '../contexts/CoffeeCartContext'
import { Logo } from './Buttons/Images/Logo'

export function Header() {
  const { cartItems, location } = useContext(CoffeeCartContext)

  const cartItemsCounter = cartItems.reduce(
    (total, item) => item.amount + total,
    0,
  )

  return (
    <header className="px-40 py-8 flex items-center justify-between">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <div className="flex items-stretch gap-3 relative">
        <button className="flex items-center justify-between gap-1 py-[10px] px-2 rounded-md text-sm text-brand-purple bg-brand-purple-light">
          <MapPin className="inline-block " weight="fill" size={22} />
          {location.city && location.city + ' - ' + location.state}
        </button>
        <NavLink
          to="/checkout"
          className="flex items-center p-2 rounded-md bg-brand-yellow-light text-brand-yellow-dark"
        >
          <ShoppingCart weight="fill" size={22} />
        </NavLink>
        <div
          className={`${
            cartItemsCounter > 0 ? 'visible' : 'invisible'
          } absolute right-0 translate-y-[-8px] translate-x-[8.35px] w-5 h-5 rounded-full flex justify-center items-center font-bold text-xs text-brand-base-button bg-brand-yellow-dark`}
        >
          {cartItemsCounter}
        </div>
      </div>
    </header>
  )
}
