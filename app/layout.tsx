import './globals.css'
import { Nunito } from 'next/font/google'
import { Navbar } from './components/Navbar/Navbar'
import { ReduxProvider } from '@/app/providers/ReduxProvider'
import { ToasterProvider } from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb new concept',
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
          <Navbar user={user} />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
