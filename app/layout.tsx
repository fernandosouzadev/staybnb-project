import './globals.css'
import { Nunito } from 'next/font/google'
import { Navbar } from './components/Navbar/Navbar'
import { ReduxProvider } from '@/app/providers/ReduxProvider'
import { ToasterProvider } from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import { Footer } from './components/Footer/Footer'
import ClientSessionProvider from './providers/ClientSessionProvider'

const font = Nunito({ subsets: ['latin'] })

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
  const user = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>
          <ToasterProvider />
          <div className="flex flex-col min-h-screen">
            <ClientSessionProvider>
              <Navbar user={user} />
              <div className="flex-grow pt-20">{children}</div>
            </ClientSessionProvider>
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
