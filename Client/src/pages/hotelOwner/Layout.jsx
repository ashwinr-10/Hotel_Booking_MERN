import React from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <div className='flex flex-1 min-h-0'>
        <div className='w-64 min-w-56 max-w-xs h-full border-r border-gray-200 bg-white'>
          <Sidebar/>
        </div>
        <div className='flex-1 p-4 pt-10 md:px-10 h-full overflow-y-auto min-h-0'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout
