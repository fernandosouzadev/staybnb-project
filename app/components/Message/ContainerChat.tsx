'use client'

import { useAppSelector } from '@/app/redux/hooks'
import { ReactNode } from 'react'

interface ContainerChatProps {
  children: ReactNode
}

export function ContainerChat({ children }: ContainerChatProps) {
  const isOpen = useAppSelector((state) => state.chatInfoSideBarReducer.isOpen)
  return (
    <div
      className="w-full flex flex-col"
      style={{ height: 'calc(100vh - 83px)' }}
    >
      <div
        className={`grid grid-cols-1 ${
          isOpen ? 'md:grid-cols-[400px,1fr,400px]' : 'md:grid-cols-[400px,1fr]'
        }  gap-0 h-[100%]`}
      >
        {children}
      </div>
    </div>
  )
}
