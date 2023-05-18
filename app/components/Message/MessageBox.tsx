'use client'

import { Message, User } from '@prisma/client'
import { format } from 'date-fns'
import { Avatar } from '../Avatar'

interface MessageBoxProps {
  data: Message & {
    sender: User
  }
}

export function MessageBox({ data }: MessageBoxProps) {
  const dateMessage = format(new Date(data.createdAt), 'p')
  return (
    <div className="rounded-md px-3 py-5 flex flex-row items-start gap-3 hover:bg-neutral-50 focus:bg-neutral-50">
      <Avatar src={data.sender.image} width={50} height={50} />

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-1">
          <div className="font-bold capitalize">{data.sender.name}</div>
          <div className="font-light text-xs text-neutral-400">
            {dateMessage}
          </div>
        </div>

        <div className="font-light">{data.body}</div>
      </div>
    </div>
  )
}
