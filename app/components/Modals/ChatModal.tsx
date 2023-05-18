'use client'

import { useAppSelector } from '@/app/redux/hooks'
import { useDispatch } from 'react-redux'
import { Modal } from './Modal'
import { setStatusMessageListMobile } from '@/app/redux/messageListMobile/slice'
import useConversation from '@/app/hooks/useConversation'
import { pusherClient } from '@/app/libs/pusher'
import { Message, User } from '@prisma/client'
import axios from 'axios'
import { find } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageBox } from '../Message/MessageBox'
import { useRouter } from 'next/navigation'
import { MessageInput } from '../Inputs/MessageInput'

interface ChatModalProps {
  initialMessages: (Message & {
    sender: User
  })[]
  name: string | null | undefined
}

type FullMessageType = Message & {
  sender: User
}

export function ChatModal({ initialMessages, name }: ChatModalProps) {
  const dispatch = useDispatch()
  const isOpen = useAppSelector(
    (state) => state.messageListMobileReducer.isOpen,
  )
  const { conversationId } = useConversation()
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    dispatch(setStatusMessageListMobile(false))
    router.push('/guest/inbox/')
  }, [dispatch, router])

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
    bottomRef?.current?.scrollIntoView()
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }

        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage
          }

          return currentMessage
        }),
      )
      bottomRef?.current?.scrollIntoView()
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])

  const bodyContent = (
    <div
      className="flex flex-col justify-between items-center "
      style={{ height: 'calc(100vh - 170px)' }}
    >
      <div className="w-full flex flex-col justify-between items-center overflow-y-auto">
        <div className="w-full p-2 ">
          {messages.map((messageItem) => (
            <MessageBox key={messageItem.id} data={messageItem} />
          ))}
          <div className="pt-2" ref={bottomRef} />
        </div>
      </div>
      <div className="w-full md:w-[60%]">
        <MessageInput conversationId={conversationId} />
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={name || 'Message'}
      body={bodyContent}
      onSubmit={() => {}}
      actionlabel={''}
    />
  )
}
