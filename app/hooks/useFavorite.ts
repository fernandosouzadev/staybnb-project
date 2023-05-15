import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { MouseEvent, useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../redux/hooks'
import { setStatusLoginModal } from '../redux/loginModal/slice'

interface IUseFavorite {
  listingId: string
  currentUser?: User | null
  toastCustom: () => void
}

export default function useFavorite({
  listingId,
  currentUser,
  toastCustom,
}: IUseFavorite) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []
    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return dispatch(setStatusLoginModal(true))
      }

      try {
        let request
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }
        toastCustom()
        await request()
        router.refresh()
      } catch (error) {
        toast.error('Someting went wrong')
      }
    },
    [currentUser, hasFavorited, listingId, dispatch, router],
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}
