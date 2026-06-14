import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

export function Field({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-[4px] w-full', className)}>{children}</div>
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[14px] font-medium text-foreground leading-[22px] tracking-[0.5%]">
      {children}
    </p>
  )
}

export function FieldError({ children }: { children: ReactNode }) {
  return (
    <p className="text-[14px] font-medium text-destructive-foreground leading-[22px] tracking-[0.5%]">
      {children}
    </p>
  )
}
