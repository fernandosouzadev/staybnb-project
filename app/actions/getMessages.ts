import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getMessages(conversationId: string) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
      return []
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
        conversation: {
          users: {
            some: {
              id: currentUser?.id,
            },
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return messages
  } catch (error: any) {
    return []
  }
}
