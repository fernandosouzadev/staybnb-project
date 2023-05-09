'use client'

import { MouseEvent, useState } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
  iconColor?: string
}

export function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  iconColor,
}: ButtonProps) {
  const [mouseMoveOnButton, setMouseMoveOnButton] = useState({ x: 0, y: 0 })
  console.log(mouseMoveOnButton)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition w-full 
      ${outline ? 'bg-white' : 'bg-gradient-to-r from-rose-500 to-pink-700'}
      ${outline ? 'border-black' : 'border-rose-500'}
      ${outline ? 'text-black' : 'text-white'}
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'text-sm' : 'text-md'}
      ${small ? 'font-light' : 'font-semibold'}
      ${small ? 'border-[1px]' : 'border-2'}
      translate
      `}
    >
      {Icon && (
        <Icon size={24} className="absolute left-4 top-3" color={iconColor} />
      )}
      {label}
    </button>
  )
}
