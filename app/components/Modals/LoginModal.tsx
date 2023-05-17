'use client'

import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { Modal } from './Modal'
import { Heading } from '../Heding'
import { Input } from '../Inputs/Input'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { useRouter } from 'next/navigation'
import { setStatusLoginModal } from '@/app/redux/loginModal/slice'
import { setStatusRegisterModal } from '@/app/redux/registerModal/slice'

export function LoginModal() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { isOpen } = useAppSelector((state) => state.loginModalReducer)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleModalRegister = useCallback(() => {
    dispatch(setStatusLoginModal(false))
    dispatch(setStatusRegisterModal(true))
  }, [dispatch])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in success!')
        router.refresh()
        dispatch(setStatusLoginModal(false))
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
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
        <div>{"Don't have an account?"}</div>
        <div
          onClick={handleModalRegister}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Create an account
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      isOpen={isOpen}
      disabled={isLoading}
      title="Login"
      onClose={() => dispatch(setStatusLoginModal(false))}
      secondaryActionLabel="Cancel"
      actionlabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  )
}
