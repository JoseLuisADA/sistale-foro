// sistaleforo-web-final/src/app/user-management/page.tsx

'use client'
import React from 'react'
import UsersList from '../../components/UserManagement'
import MainLayout from '../../components/layout/MainLayout'
import { useUserContext } from '../../context/UserContext'

export default function UserManagement() {
  const { user } = useUserContext()

  return (
  <MainLayout>
    <UsersList user={user} />
  </MainLayout>)
}
