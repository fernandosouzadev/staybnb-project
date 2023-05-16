import getCurrentUser from '../actions/getCurrentUser'
import { getReservations } from '../actions/getReservations'
import { EmptyState } from '../components/EmptyState'
import { TripsClient } from './TripsClient'

export default async function TripsPage() {
  const currentUser = await getCurrentUser()
  const reservations = await getReservations({ userId: currentUser?.id })

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Trips found"
        subtitle="Looks like you havent reserved any trips"
      />
    )
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}
