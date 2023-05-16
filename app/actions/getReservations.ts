import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId?: string
  userId?: string
  author?: string
}

export async function getReservations(params: IParams) {
  try {
    const { listingId, userId, author } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }
    if (userId) {
      query.userId = userId
    }
    if (author) {
      query.listing = { userId: author }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return reservations
  } catch (error: any) {
    throw new Error(error)
  }
}
