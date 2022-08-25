import { ButtonHTMLAttributes, ReactNode } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'

interface PaymentMethodButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  value: string
  icon?: ReactNode
}

export function PaymentMethodButton({
  name,
  icon,
  value,
  ...rest
}: PaymentMethodButtonProps) {
  return (
    <RadioGroup.Item
      type="button"
      value={value}
      className="w-full max-w-[179px] h-[51px] border p-[15px] rounded-md bg-brand-base-button flex gap-3 items-center uppercase text-xs text-brand-base-text focus:outline-brand-purple"
      {...rest}
    >
      {icon}
      {name}
    </RadioGroup.Item>
  )
}
