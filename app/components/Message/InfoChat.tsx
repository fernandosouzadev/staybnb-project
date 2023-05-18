'use client'

import { setStatusChatInfoSideBar } from '@/app/redux/chatInfoSideBar/slice'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { Listing } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoCloseOutline } from 'react-icons/io5'
import { Button } from '../Button'

interface InfoChatProps {
  listing: Listing | undefined
}

export function InfoChat({ listing }: InfoChatProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.chatInfoSideBarReducer.isOpen)

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="mt-[2px] border-x border-t border-rose-50 focus:border-black"
      tabIndex={3}
    >
      <div className="border-b border-rose-50 flex flex-row justify-between items-center min-h-[80px] px-5">
        <div className="text-lg font-bold">Details</div>
        <IoCloseOutline
          size="40px"
          className="p-2 rounded-full cursor-pointer transition hover:bg-neutral-50"
          onClick={() => dispatch(setStatusChatInfoSideBar(false))}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 px-10 py-5">
        <div className="w-full h-[300px] relative">
          <Image
            alt="Listing"
            src={listing?.imageSrc || ''}
            fill
            className="rounded-lg"
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </div>
        <div className="text-bold text-neutral-700">{listing?.title}</div>
        <div className="text-light text-neutral-400">
          {listing?.description}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${listing?.price} USD</div>
          <div className="font-light">night</div>
        </div>
        <hr />
        <Button
          label="Reservation"
          onClick={() => router.push(`/listing/${listing?.id}`)}
          outline
        />
      </div>
    </div>
  )
}
