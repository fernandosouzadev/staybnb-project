'use client'

import { useAppSelector } from '@/app/redux/hooks'
import { setStatusSearchModal } from '@/app/redux/searchModal/slice'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { useDispatch } from 'react-redux'
import { ContrySelect, CountrySelectValue } from '../Inputs/ContrySelect'
import { Modal } from './Modal'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import { Heading } from '../Heding'
import { Calendar } from '../Inputs/Calendar'
import { Counter } from '../Inputs/Counter'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export function SearchModal() {
  const router = useRouter()
  const dispatch = useDispatch()
  const params = useSearchParams()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [location, setLocation] = useState<CountrySelectValue>()
  const isOpen = useAppSelector((state) => state.searchModalReducer.isOpen)

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location],
  )

  function onBack() {
    setStep((state) => state - 1)
  }

  function onNext() {
    setStep((state) => state + 1)
  }

  const onSubmit = useCallback(async () => {
    let currentQuery = {}

    if (step !== STEPS.INFO) {
      return onNext()
    }

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true },
    )

    setStep(STEPS.LOCATION)
    dispatch(setStatusSearchModal(false))
    router.push(url)
  }, [
    bathroomCount,
    dateRange,
    dispatch,
    guestCount,
    location?.value,
    params,
    roomCount,
    router,
    step,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <ContrySelect onChange={(value) => setLocation(value)} value={location} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setStatusSearchModal(false))}
      title="Filters"
      actionlabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}
