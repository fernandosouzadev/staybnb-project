'use client'

import { setCurrentUser } from '@/app/redux/currentUser/slice'
import { useAppDispatch } from '@/app/redux/hooks'
import { User } from '@prisma/client'
import { Container } from '../Container'
import { Logo } from './Logo'
import { Search } from './Search'
import { UserMenu } from './UserMenu'

interface NavbarProps {
  user: User | null
}

export function Navbar({ user }: NavbarProps) {
  const dispatch = useAppDispatch()
  dispatch(setCurrentUser(user))
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
        py-4
        border-b-[1px]
        "
      >
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}
