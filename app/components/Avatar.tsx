import Image from 'next/image'

export function Avatar() {
  return (
    <Image
      className=" rounded-full"
      alt="Avatar"
      src="/images/placeholder.jpg"
      height="30"
      width="30"
    ></Image>
  )
}
