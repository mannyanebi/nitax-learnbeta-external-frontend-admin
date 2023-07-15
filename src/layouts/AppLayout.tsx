import React from 'react'
import SessionExpiredModal from '@/components/auth/SessionExpiredModal'

type Props = { children: React.ReactNode }

export default function AppLayout({ children }: Props) {
  return (
    <React.Fragment>
      <SessionExpiredModal />
      {children}
    </React.Fragment>
  )
}