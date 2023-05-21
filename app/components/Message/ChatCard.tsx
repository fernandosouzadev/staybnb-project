'use client'

import useConversation from '@/app/hooks/useConversation'
import useMediaQuery from '@/app/hooks/useMediaQuery'
import useOtherUser from '@/app/hooks/useOtherUser'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { setStatusMessageListMobile } from '@/app/redux/messageListMobile/slice'
import {
  Conversation,
  Listing,
  Message,
  Reservation,
  User,
} from '@prisma/client'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { Avatar } from '../Avatar'

interface ChatProps {
  data: Conversation & {
    listing: Listing & {
      reservations: Reservation[]
    }
    messages: (Message & {
      sender: User
      seen: User[]
    })[]
    users: User[]
  }
  notification: () => void
}

export function ChatCard({ data, notification }: ChatProps) {
  const router = useRouter()
  const session = useSession()
  const { conversationId } = useConversation()
  const currentUser = useAppSelector((state) => state.currentUserReducer.user)

  const isSelected = useMemo(() => {
    if (conversationId === data.id) {
      return true
    }
    return false
  }, [conversationId, data])

  const otherUser = useOtherUser(data)

  const lastMessage = useMemo(() => {
    const messages = data.messages || []

    return messages[messages.length - 1]
  }, [data.messages])

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email],
  )

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.body) {
      return lastMessage?.body
    }
  }, [lastMessage])

  const isMobile = useMediaQuery('(min-width: 768px)')
  const dispatch = useAppDispatch()

  const handleClick = useCallback(() => {
    router.push(`/guest/inbox/${data.id}`)
  }, [router, data])

  const handleClickMobile = useCallback(() => {
    router.push(`/guest/inbox/${data.id}`)
    dispatch(setStatusMessageListMobile(true))
  }, [data, dispatch, router])

  const formattedStartDate = data ? format(data?.startDate, 'MMM d') : ''
  const formattedEndDate = data ? format(data?.endDate, 'MMM d') : ''

  const isValiable = useMemo(() => {
    return data.listing.reservations.every(
      (reservation) =>
        reservation.startDate !== data.startDate &&
        reservation.endDate !== data.endDate &&
        reservation.listingId === data.listingId,
    )
  }, [data])

  useEffect(() => {
    if (!hasSeen && conversationId !== data.id) {
      notification()
    }
  }, [conversationId, data.id, hasSeen, notification])

  return (
    <a
      className={`relative cursor-pointer px-3 py-5 flex flex-row items-start gap-3 border-b border-neutral-200 ${
        isSelected && 'bg-neutral-50 rounded-md  border-0'
      }`}
      onClick={!isMobile ? handleClickMobile : handleClick}
    >
      <Avatar src={otherUser?.image} width={50} height={50} />

      <div className="flex flex-col gap-2">
        <div className="font-light capitalize">{otherUser?.name}</div>
        <div
          className={`${
            hasSeen ? 'font-light' : 'font-bold'
          } overflow-ellipsis overflow-hidden`}
          style={{
            WebkitLineClamp: '2',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {lastMessageText}
        </div>
        <div className="font-light text-xs text-neutral-400">
          {`${
            isValiable ? 'Available' : 'Unavailable'
          } - ${formattedStartDate} - ${formattedEndDate}`}
        </div>
      </div>
    </a>
  )
}
