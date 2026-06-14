'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

import { cn } from '@/utils/cn'

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn('group/tabs flex gap-2 data-horizontal:flex-col', className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('rounded-infinite outline-none flex p-[4px] h-[50px] bg-muted', className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, icon, ...props }: { icon?: boolean } & TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        'outline-none relative inline-flex flex-1 items-center justify-center rounded-infinite px-[12px] py-[8px] text-[18px] font-bold leading-[26px] tracking-[0.5%] whitespace-nowrap text-foreground transition-all gap-[8px] data-active:bg-background data-active:shadow-[0_1px_3px_#0000001a] disabled:opacity-40 hover:bg-secondary cursor-pointer focus:shadow-[0_0_3px_var(--ring)] focus:bg-secondary data-active:focus:bg-background',
        icon && 'p-[12px]! [&>svg]:size-[16px]! size-[40px]!',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
