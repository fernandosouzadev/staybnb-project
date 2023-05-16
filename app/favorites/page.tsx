import getCurrentUser from '../actions/getCurrentUser'
import { EmptyState } from '../components/EmptyState'
import { getFavoritesListing } from '../actions/getFavoritesListing'
import { FavoritesClient } from './FavoritesClient'

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser()
  const listings = await getFavoritesListing()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Favorites found"
        subtitle="Looks like you have no favorties listing"
      />
    )
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />
}
