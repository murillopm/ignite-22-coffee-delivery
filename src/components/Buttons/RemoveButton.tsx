import { Trash } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react'

interface RemoveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function RemoveButton({ ...rest }: RemoveButtonProps) {
  return (
    <button
      type="button"
      className="group h-8 p-2 flex items-center gap-1 rounded-md bg-brand-base-button hover:bg-brand-base-hover transition-colors"
      {...rest}
    >
      <Trash className="text-brand-purple" size={16} />
      <span className="text-xs text-brand-base-text group-hover:text-brand-base-subtitle">
        REMOVER
      </span>
    </button>
  )
}
