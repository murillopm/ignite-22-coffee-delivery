import { ButtonHTMLAttributes } from 'react'

interface CheckoutOrderButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export function CheckoutOrderButton({
  label,
  ...rest
}: CheckoutOrderButtonProps) {
  return (
    <button
      className="h-[46px] rounded-md border-0 bg-brand-yellow font-bold text-brand-white hover:bg-brand-yellow-dark transition-colors"
      {...rest}
    >
      {label.toUpperCase()}
    </button>
  )
}
