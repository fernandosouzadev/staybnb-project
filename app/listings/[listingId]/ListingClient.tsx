'use client'

import { Container } from '@/app/components/Container'
import { ListingHead } from '@/app/components/Listings/ListingHead'
import { ListingInfo } from '@/app/components/Listings/ListingInfo'
import { ListingReservation } from '@/app/components/Listings/ListingReservation'
import { MessageModal } from '@/app/components/Modals/MessageModal'
import { categories } from '@/app/components/Navbar/Categories'
import { useAppDispatch } from '@/app/redux/hooks'
import { setStatusLoginModal } from '@/app/redux/loginModal/slice'
import { Listing, Reservation, User } from '@prisma/client'
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { toast } from 'react-hot-toast'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

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
  reservations = [],
}: ListingClientProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      )

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const onCreatedReservation = useCallback(() => {
    if (!currentUser) {
      return dispatch(setStatusLoginModal(true))
    }

    setIsLoading(true)

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        router.refresh()
        toast.success('Listing reserved!')
        setDateRange(initialDateRange)
        router.push('/trips')
      })
      .catch(() => {
        toast.error('Something went worng')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    dispatch,
    listing.id,
    router,
    totalPrice,
  ])

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing])

  return (
    <Container>
      <MessageModal disabledDates={disabledDates} listing={listing} />
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
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreatedReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
