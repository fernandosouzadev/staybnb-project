'use client'

import { ReactNode } from 'react'

interface ContaienrProps {
  children: ReactNode
}

export function Container({ children }: ContaienrProps) {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  )
}
