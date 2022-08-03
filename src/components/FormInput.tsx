import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react'
import { FieldError } from 'react-hook-form'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  isOptional?: boolean
  errors: FieldError | undefined
  widthInPixels?: number
}

const FormInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FormInputProps
> = (
  { id, isOptional, errors, widthInPixels, ...rest }: FormInputProps,
  ref: any,
) => {
  const isInvalid = !!errors

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
        ref={ref}
        className={`h-[42px] rounded-[4px] p-3 text-sm text-brand-base-text bg-brand-base-input placeholder:text-brand-base-label ${
          isInvalid
            ? 'focus:outline-red-600'
            : 'focus:outline-brand-yellow-dark '
        }`}
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
      {isInvalid && (
        <p className="mt-1 p-1 text-center bg-red-100 rounded-sm text-xs text-red-600">
          {errors.message}
        </p>
      )}
    </label>
  )
}

export const FormInput = forwardRef(FormInputBase)
