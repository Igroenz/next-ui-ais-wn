import AppHamburgerMenu from '@/components/shared/app-hamburger-menu'
import AppSidebar from '@/components/shared/app-sidebar'
import React, { ReactNode } from 'react'

export default function DashboardLayout(
  {
    children
  }: {
    children: ReactNode,
  }
) {
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-100 via-neutral-50 to-purple-100'>
      <div className='w-full mx-auto lg:mx-0 2xl:container 2xl:mx-auto flex flex-col lg:flex-row relative'>
        {/* <= 1024px */}
        <div className='flex sticky top-0 lg:hidden'>
          <AppHamburgerMenu />
        </div>
        {/* >= 1024px */}
        <div className='hidden lg:block sticky top-0 lg:w-[18%]'>
          <AppSidebar />
        </div>
        <main className='w-full lg:w-[82%]'>
          {children}
        </main>
      </div>
    </div>
  )
}
