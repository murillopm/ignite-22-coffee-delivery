import { MapPin, ShoppingCart } from 'phosphor-react'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="px-40 py-8 flex items-center justify-between">
      <Logo />
      <div className="flex items-stretch gap-3">
        <span className="flex items-center justify-between gap-1 w-36 py-[10px] px-2 rounded-md text-sm text-brand-purple bg-brand-purple-light">
          <MapPin className="inline-block " weight="fill" size={22} />
          Porto Alegre, RS
        </span>
        <span className="flex items-center p-2 rounded-md bg-brand-yellow-light text-brand-yellow-dark">
          <ShoppingCart size={22} />
        </span>
      </div>
    </header>
  )
}
