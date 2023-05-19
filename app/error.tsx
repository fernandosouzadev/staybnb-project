'use client'

import { useEffect } from 'react'
import { EmptyState } from './components/EmptyState'

interface ErrorPageProps {
  error: Error
}

export default function ErrorPage({ error }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <EmptyState
      title="Uh Oh"
      subtitle="Somenthing went wrong!"
      showReset
      actionLabel="Back to home"
    />
  )
}
