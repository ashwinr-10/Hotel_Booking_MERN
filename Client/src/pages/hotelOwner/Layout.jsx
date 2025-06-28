import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate} = useAppContext()
  
  useEffect(()=>{
    if(!isOwner) {
      navigate('/')
    }
  },[isOwner])

  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <div className='flex flex-1 min-h-0'>
        <div className='w-16  md:w-64 min-w-0 md:min-w-56 max-w-xs h-full border-r border-gray-200 bg-white transition-all duration-300'>
          <Sidebar/>
        </div>
        <div className='flex-1 p-2 sm:p-4 pt-10 md:px-10 h-full overflow-y-auto min-h-0 transition-all duration-300'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout
