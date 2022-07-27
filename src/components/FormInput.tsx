import { InputHTMLAttributes } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  isOptional?: boolean
  widthInPixels?: number
}

export function FormInput({
  id,
  isOptional,
  widthInPixels,
  ...rest
}: FormInputProps) {
  return (
    <label
      htmlFor={id}
      className="relative"
      style={{
        width: `${widthInPixels ? `${widthInPixels}px` : '100%'}`,
      }}
    >
      <input
        id={id}
        type="text"
        className={`h-[42px] rounded-[4px] p-3 text-sm text-brand-base-text bg-brand-base-input focus:outline-brand-yellow-dark placeholder:text-brand-base-label`}
        {...rest}
        style={{
          width: `${widthInPixels ? `${widthInPixels}px` : '100%'}`,
        }}
      />
      {isOptional && (
        <span className="text-xs text-brand-base-label italic absolute right-[12px] top-[13px]">
          Opcional
        </span>
      )}
    </label>
  )
}
