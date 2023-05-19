'use client'

import useOtherUser from '@/app/hooks/useOtherUser'
import { setStatusChatInfoSideBar } from '@/app/redux/chatInfoSideBar/slice'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { Conversation, Message, User } from '@prisma/client'

interface HeaderChatProps {
  conversation: Conversation & {
    users: User[]
  }
}

export function HeaderChat({ conversation }: HeaderChatProps) {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.chatInfoSideBarReducer.isOpen)
  const otherUser = useOtherUser(conversation)
  return (
    <>
      <div className="text-lg font-bold">{otherUser?.name}</div>
      <div
        className="rounded-full cursor-pointer p-2 border border-neutral-200 transition  hover:bg-neutral-50  hover:border-black text-sm font-light"
        onClick={() => dispatch(setStatusChatInfoSideBar(!isOpen))}
      >
        {isOpen ? 'Hide details' : 'Get details'}
      </div>
    </>
  )
}
