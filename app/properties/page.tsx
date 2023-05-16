import getCurrentUser from '../actions/getCurrentUser'
import { EmptyState } from '../components/EmptyState'
import { PropertiesClient } from './PropertiesClient'
import getListings from '../actions/getListings'

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser()
  const listings = await getListings({ userId: currentUser?.id })

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties found"
        subtitle="Looks like you have no properties"
      />
    )
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />
}
