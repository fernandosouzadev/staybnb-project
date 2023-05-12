import Image from 'next/image'

interface AvatarProps {
  src: string | null | undefined
}

export function Avatar({ src }: AvatarProps) {
  return (
    <Image
      className=" rounded-full"
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
      height="30"
      width="30"
    ></Image>
  )
}
