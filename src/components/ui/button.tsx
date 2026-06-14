import type { VariantProps } from 'class-variance-authority'

import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'font-nunito flex gap-[8px] font-medium text-[14px] leading-[21px] tracking-[0.5%] w-fit cursor-pointer disabled:cursor-auto rounded-infinite transition-all items-center justify-center outline-none svg [&>svg]:size-[16px] [&>svg]:stroke-2',
  {
    variants: {
      variant: {
        default:
          'text-primary-foreground bg-primary hover:enabled:bg-primary-hover active:bg-primary-hover disabled:opacity-20',
        secondary:
          'text-secondary-foreground bg-secondary hover:enabled:bg-secondary-hover active:bg-secondary-hover disabled:opacity-70 disabled:hover:bg-secondary',
        outline:
          'text-foreground bg-outline border border-ring hover:border-accent-secondary active:border-accent-secondary hover:enabled:shadow-[-2px_2px_var(--accent-secondary)] disabled:opacity-20 disabled:bg-secondary disabled:border-border-hard',
        ghost:
          'text-ghost-foreground bg-transparent hover:enabled:bg-ghost-hover disabled:opacity-40',
        link: 'hover:enabled:underline active:underline focus:shadow-[0_0_3px_var(--ring)] focus:bg-[#fff]/1',
      },
      size: {
        large: 'h-[52px] px-[24px] py-[12px]',
        regular: 'h-[40px] px-[24px] py-[8px]',
        small: 'h-[32px] px-[12px] py-[4px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'regular',
    },
  },
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
