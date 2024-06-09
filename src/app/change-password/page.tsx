'use client'
import React from 'react'
import { useUserContext } from '../../context/UserContext'
import ChangePassword from '../../components/ChangePassword'
import MainLayout from '../../components/layout/MainLayout'

const ChangePasswordPage = () => {
  const { user } = useUserContext()

  return <MainLayout>{user.token && <ChangePassword token={user.token} />}</MainLayout>
}

export default ChangePasswordPage
