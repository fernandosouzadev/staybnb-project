'use client'

import useCountries from '@/app/hooks/useContries'
import { User } from '@prisma/client'
import { IconType } from 'react-icons'
import { Avatar } from '../Avatar'
import Map from '../Map'
import { ListingCategory } from './ListingCategory'

interface ListingInfoProps {
  user: User | null
  category:
    | {
        label: string
        icon: IconType
        description: string
      }
    | undefined
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}

export function ListingInfo({
  user,
  category,
  bathroomCount,
  description,
  guestCount,
  locationValue,
  roomCount,
}: ListingInfoProps) {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}
