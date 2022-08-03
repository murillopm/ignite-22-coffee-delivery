import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PaymentMethodButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  isActive: boolean
  icon?: ReactNode
}

export function PaymentMethodButton({
  name,
  icon,
  isActive,
  ...rest
}: PaymentMethodButtonProps) {
  return (
    <button
      type="button"
      className={`w-full max-w-[179px] h-[51px] border p-[15px] rounded-md bg-brand-base-button flex gap-3 items-center uppercase text-xs text-brand-base-text focus:outline-brand-purple ${
        isActive
          ? 'border-brand-purple bg-brand-purple-light'
          : 'hover:bg-brand-base-hover transition-colors'
      }`}
      {...rest}
    >
      {icon}
      {name}
    </button>
  )
}
