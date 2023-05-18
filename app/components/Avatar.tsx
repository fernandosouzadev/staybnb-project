import Image from 'next/image'

interface AvatarProps {
  src: string | null | undefined
  width?: number
  height?: number
}

export function Avatar({ src, width = 30, height = 30 }: AvatarProps) {
  return (
    <Image
      className=" rounded-full"
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
      height={height}
      width={width}
    ></Image>
  )
}
