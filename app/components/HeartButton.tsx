'use client'

import { User } from '@prisma/client'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useFavorite from '../hooks/useFavorite'

interface HeartButtonProps {
  currentUser: User | null | undefined
  listingId: string
  listingImage: string
  listingTitle: string
}

export function HeartButton({
  currentUser,
  listingId,
  listingTitle,
  listingImage,
}: HeartButtonProps) {
  function toastCustom() {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex justify-center items-center">
              <div className="flex-shrink-0 pt-0.5">
                <Image
                  className="h-10 w-10 rounded-md"
                  src={listingImage}
                  alt="listing image"
                  width={10}
                  height={10}
                />
              </div>
              <div className="ml-3 flex-1 ">
                <p className="text-sm font-medium text-gray-900">
                  <strong>{listingTitle}</strong>
                  {!hasFavorited
                    ? ' has been saved to favorites'
                    : ' has been removed from favorites'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ),
      { position: 'bottom-left' },
    )
  }
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
    toastCustom,
  })

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}
