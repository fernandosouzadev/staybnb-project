'use client'

import useConversation from '@/app/hooks/useConversation'
import { pusherClient } from '@/app/libs/pusher'
import { Message, User } from '@prisma/client'
import axios from 'axios'
import { find } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { MessageBox } from './MessageBox'

interface MessagesListProps {
  initialMessages: (Message & {
    sender: User
  })[]
}

type FullMessageType = Message & {
  sender: User
}

export function MessagesList({ initialMessages = [] }: MessagesListProps) {
  const { conversationId } = useConversation()
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="w-full md:w-[60%] py-2 ">
      {messages.map((messageItem) => (
        <MessageBox key={messageItem.id} data={messageItem} />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  )
}
