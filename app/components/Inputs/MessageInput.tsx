'use client'

import axios from 'axios'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

interface MessageInputProps {
  conversationId: string
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true })
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
    })
  }
  const value = watch('message')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-full border border-neutral-300 p-2 mb-2 w-full outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus-within:border-2 focus-within:border-black flex flex-row justify-between items-center"
    >
      <input
        placeholder="Type a message"
        className="w-full h-full outline-none"
        id="message"
        autoComplete="message"
        required
        {...register('message', { required: true })}
      />
      {value !== '' && (
        <BsFillArrowUpCircleFill size={25} onClick={handleSubmit(onSubmit)} />
      )}
    </form>
  )
}
