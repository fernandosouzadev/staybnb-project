'use client'

import { IconType } from 'react-icons'

interface ListingCategory {
  label: string
  icon: IconType
  description: string
}

export function ListingCategory({
  label,
  icon: Icon,
  description,
}: ListingCategory) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{label}</div>
      </div>
      <div className="text-neutral-500 font-light">{description}</div>
    </div>
  )
}
