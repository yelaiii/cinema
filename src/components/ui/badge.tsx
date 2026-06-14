import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cva } from 'class-variance-authority'

const badgeVariants = cva(
  'text-nunito font-bold text-[12px] leading-[16px] tracking-[1.5$] flex items-center justify-center size-fit px-[16px] py-[8px] rounded-infinite gap-[8px]',
  {
    variants: {
      type: {
        neutral: 'border border-ring text-primary',
        special: 'bg-accent-primary text-accent-foreground',
        success: 'bg-green-200 text-black',
        failure: 'bg-red-200 text-black',
      },
    },
    defaultVariants: {
      type: 'neutral',
    },
  },
)

function Badge({
  children,
  type,
  className,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof badgeVariants>) {
  return (
    <div className={badgeVariants({ type, className })} {...props}>
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
