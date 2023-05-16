'use client'

import { Listing, Reservation, User } from '@prisma/client'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '../components/Container'
import { Heading } from '../components/Heding'
import { ListingCard } from '../components/Listings/ListingCard'

interface PropertiesClientProps {
  listings: Listing[]
  currentUser: User | null
}

export function PropertiesClient({
  listings,
  currentUser,
}: PropertiesClientProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted')
          router.refresh()
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setDeletingId(''))
    },
    [router],
  )

  return (
    <Container>
      <div className="my-5">
        <Heading title="Propeties" subtitle="List of your properties" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
