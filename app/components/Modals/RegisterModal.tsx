'use client'

import axios from 'axios'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { Modal } from './Modal'
import { Heading } from '../Heding'
import { Input } from '../Inputs/Input'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { setStatusRegisterModal } from '@/app/redux/registerModal/slice'
import { setStatusLoginModal } from '@/app/redux/loginModal/slice'
import { signIn } from 'next-auth/react'

export function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen } = useAppSelector((state) => state.registerModalReducer)
  const dispatch = useAppDispatch()

  const handleModalLogin = useCallback(() => {
    dispatch(setStatusRegisterModal(false))
    dispatch(setStatusLoginModal(true))
  }, [dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Account registered successfully')
        dispatch(setStatusRegisterModal(false))
        dispatch(setStatusLoginModal(true))
      })
      .catch((error) => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Facebook"
        icon={AiFillFacebook}
        iconColor="#3b5998"
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="flex flex-row items-center justify-center gap-2">
        <div>Already havean account?</div>
        <div
          onClick={handleModalLogin}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Log In
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      isOpen={isOpen}
      disabled={isLoading}
      title="Register"
      onClose={() => dispatch(setStatusRegisterModal(false))}
      secondaryActionLabel="Cancel"
      actionlabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  )
}
