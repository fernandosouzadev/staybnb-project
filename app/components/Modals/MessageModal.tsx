'use client'

import { useAppSelector } from '@/app/redux/hooks'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { useDispatch } from 'react-redux'
import { Modal } from './Modal'
import { Heading } from '../Heding'
import { Calendar } from '../Inputs/Calendar'
import { setStatusMessageModal } from '@/app/redux/messageModal/slice'
import axios from 'axios'
import { Listing, User } from '@prisma/client'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

enum STEPS {
  DATE = 0,
  MESSAGE = 1,
}

interface MessageModalProps {
  disabledDates: Date[]
  listing: Listing & {
    user: User
  }
}

export function MessageModal({ disabledDates, listing }: MessageModalProps) {
  const [step, setStep] = useState(STEPS.DATE)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const isOpen = useAppSelector((state) => state.messageModalReducer.isOpen)

  function onBack() {
    setStep((state) => state - 1)
  }

  function onNext() {
    setStep((state) => state + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.MESSAGE) {
      return 'Sende Messege'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DATE) {
      return undefined
    }
    return 'Back'
  }, [step])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const message = watch('message')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    const message = watch('message')
    if (step !== STEPS.MESSAGE) {
      return onNext()
    }
    axios
      .post('/api/conversations', {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        message: data.message,
        name: listing.user.name,
        listingId: listing.id,
        userId: listing.userId,
      })
      .then((data) => {
        dispatch(setStatusMessageModal(false))
        router.push(`/guest/inbox/${data.data.id}`)
      })
      .catch((error) => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What date would you like to book?"
        subtitle="Select your preferred date"
      />

      <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
        disabledDates={disabledDates}
      />
    </div>
  )

  if (step === STEPS.MESSAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Still have questions? Message the Host"
          subtitle="Take your doubts to have an incredible hosting!"
        />
        <textarea
          id="message"
          {...register('message', { required: true })}
          className="resize-none w-full h-24 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:bg-neutral-50"
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(setStatusMessageModal(false))}
      title="Filters"
      actionlabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      disabled={message === '' && isLoading}
    />
  )
}
