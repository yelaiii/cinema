import type { ReactNode } from 'react'

import { Menu } from './_components/menu'

export default function MenuLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      {children}
      <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-center p-[16px] z-40">
        <Menu />
      </div>
    </div>
  )
}
