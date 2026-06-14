import type { VariantProps } from 'class-variance-authority'

import { Input as InputPrimitive } from '@base-ui/react/input'
import { cva } from 'class-variance-authority'

const inputVariants = cva(
  'transition-all outline-none rounded-infinite text-foreground border border-input bg-primary-foreground placeholder:text-input focus:border-soft focus:shadow-[0_0_0_3px_var(--ring)] aria-invalid:border-destructive-border aria-invalid:focus:border-destructive focus:aria-invalid:shadow-[0_0_0_3px_var(--ring-error)] disabled:opacity-40 text-[18px] leading-[24px] tracking-[0.5%]',
  {
    variants: {
      size: {
        large: 'h-[52px] px-[16px] py-[12px]',
        regular: 'h-[40px] px-[16px] py-[12px]',
        small: 'h-[32px] px-[16px] py-[12px]',
      },
    },
    defaultVariants: {
      size: 'regular',
    },
  },
)

function Input({
  className,
  type,
  size,
  ...props
}: Omit<InputPrimitive.Props, 'size'> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={inputVariants({ size, className })}
      {...props}
    />
  )
}

export { Input, inputVariants }
