'use client'

import Lottie from 'lottie-react'
import * as animationData from '../../public/lottie/airplane-around-the-world.json'

export function Loader() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <div className="w-10 h-10">
        <Lottie animationData={animationData} />
      </div>
    </div>
  )
}
