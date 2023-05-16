'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { setStatusLoginModal } from '@/app/redux/loginModal/slice'
import { setStatusRegisterModal } from '@/app/redux/registerModal/slice'
import { setStatusRentModal } from '@/app/redux/rentModal/slice'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useClickAway } from 'react-use'
import { Avatar } from '../Avatar'
import { LoginModal } from '../Modals/LoginModal'
import { RegisterModal } from '../Modals/RegisterModal'
import { RentModal } from '../Modals/RentModal'
import { MenuItem } from './MenuItem'

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const userMenuRef = useRef(null)
  const router = useRouter()

  const toggleOpen = useCallback(() => {
    setIsOpen((state) => !state)
  }, [])
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.currentUserReducer.user)

  function handleOpenModalRegister() {
    dispatch(setStatusRegisterModal(true))
    setIsOpen(false)
  }

  function handleOpenModalLogin() {
    dispatch(setStatusLoginModal(true))
    setIsOpen(false)
  }

  useClickAway(userMenuRef, () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  const onRent = useCallback(() => {
    if (!currentUser) {
      return dispatch(setStatusLoginModal(true))
    }
    dispatch(setStatusRentModal(true))
  }, [currentUser, dispatch])

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <div className="relative" ref={userMenuRef}>
        <div className="flex flex-row items-center gap-3">
          <div
            onClick={() => {
              setIsOpen(false)
              onRent()
            }}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Airbnb your home
          </div>
          <div
            onClick={toggleOpen}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem
                    label="My trips"
                    onClick={() => router.push('/trips')}
                  />
                  <MenuItem
                    label="My Favorites"
                    onClick={() => router.push('/favorites')}
                  />
                  <MenuItem
                    label="My reservations"
                    onClick={() => router.push('/reservations')}
                  />
                  <MenuItem
                    label="My properties"
                    onClick={() => router.push('/properties')}
                  />
                  <MenuItem label="Airbnb my home" onClick={() => onRent()} />
                  <hr />
                  <MenuItem label="Logout" onClick={() => signOut()} />
                </>
              ) : (
                <>
                  <MenuItem label="Log in" onClick={handleOpenModalLogin} />
                  <MenuItem label="Sign up" onClick={handleOpenModalRegister} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
