'use client'

import useCountries from '@/app/hooks/useContries'
import { useAppDispatch } from '@/app/redux/hooks'
import { setStatusSearchModal } from '@/app/redux/searchModal/slice'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { SearchModal } from '../Modals/SearchModal'

export function Search() {
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  const { getByValue } = useCountries()

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label
    }

    return 'Anywhere'
  }, [getByValue, locationValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)
      let diff = differenceInDays(end, start)

      if (diff === 0) {
        diff = 1
      }

      return `${diff} days`
    }

    return 'Any week'
  }, [endDate, startDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`
    }

    return 'Add Guests'
  }, [guestCount])

  return (
    <>
      <SearchModal />

      <div
        onClick={() => dispatch(setStatusSearchModal(true))}
        className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">{locationLabel}</div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            {durationLabel}
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">{guestLabel}</div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <BiSearch size={15} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
