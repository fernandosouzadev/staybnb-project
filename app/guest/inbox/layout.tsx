import getConversations from '@/app/actions/getConversations'
import { ChatList } from '@/app/components/Message/ChatList'
import { ContainerChat } from '@/app/components/Message/ContainerChat'
import '@/app/globals.css'

export const metadata = {
  title: 'Airbnb - Discover Your Home Away from Home',
  description: 'Airbnb clone - new concept',
  icons: {
    icon: '/images/favicon.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations()

  return (
    <ContainerChat>
      <ChatList initalConversation={conversations} />
      {children}
    </ContainerChat>
  )
}
