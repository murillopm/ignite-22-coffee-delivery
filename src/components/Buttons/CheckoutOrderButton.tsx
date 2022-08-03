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
      className="h-[46px] rounded-md bg-brand-yellow font-bold text-brand-white text-sm [&:not(:disabled):hover]:bg-brand-yellow-dark transition-colors disabled:cursor-not-allowed disabled:opacity-70"
      {...rest}
    >
      {label.toUpperCase()}
    </button>
  )
}
