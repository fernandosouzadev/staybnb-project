'use client'

import useCountries from '@/app/hooks/useContries'
import { User } from '@prisma/client'
import Image from 'next/image'
import { HeartButton } from '../HeartButton'
import { Heading } from '../Heding'

interface ListingHeadProps {
  id: string
  title: string
  locationValue: string
  imageSrc: string
  currentUser: User | null
}

export function ListingHead({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser,
}: ListingHeadProps) {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Listing image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            currentUser={currentUser}
            listingId={id}
            listingTitle={title}
            listingImage={imageSrc}
          />
        </div>
      </div>
    </>
  )
}
