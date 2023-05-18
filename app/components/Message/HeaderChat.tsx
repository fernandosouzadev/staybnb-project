'use client'

import { setStatusChatInfoSideBar } from '@/app/redux/chatInfoSideBar/slice'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'

interface HeaderChatProps {
  name: string | null
}

export function HeaderChat({ name }: HeaderChatProps) {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.chatInfoSideBarReducer.isOpen)
  return (
    <>
      <div className="text-lg font-bold">{name}</div>
      <div
        className="rounded-full cursor-pointer p-2 border border-neutral-200 transition  hover:bg-neutral-50  hover:border-black text-sm font-light"
        onClick={() => dispatch(setStatusChatInfoSideBar(!isOpen))}
      >
        {isOpen ? 'Hide details' : 'Get details'}
      </div>
    </>
  )
}
