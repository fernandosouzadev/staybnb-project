'use client'

import { Container } from '@/app/components/Container'
import { ListingHead } from '@/app/components/Listings/ListingHead'
import { ListingInfo } from '@/app/components/Listings/ListingInfo'
import { categories } from '@/app/components/Navbar/Categories'
import { Listing, Reservation, User } from '@prisma/client'
import { useMemo } from 'react'

interface ListingClientProps {
  currentUser: User | null
  listing: Listing & {
    user: User
  }
  reservations?: Reservation[]
}

export function ListingClient({
  listing,
  currentUser,
  reservations,
}: ListingClientProps) {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing])
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6 my-5">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guessCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
