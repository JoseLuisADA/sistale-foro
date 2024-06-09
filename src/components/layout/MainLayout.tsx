//sistaleforo-web-final/src/components/MainLayout.tsx
import React, { ReactNode, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import useGetUser from '../../hooks/account/member-actions/useGetUser'

type MainLayoutProps = {
  children: ReactNode
}



const MainLayout = ({ children }: MainLayoutProps) => {
  const { fetchUser } = useGetUser()
  useEffect(() => {
    fetchUser()
  } , [])

  return(
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
  )
}

export default MainLayout
