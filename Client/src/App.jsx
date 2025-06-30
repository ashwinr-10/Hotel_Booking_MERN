import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Hero from './components/Hero';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './components/Experience';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
// Usually in App.jsx or index.js
import 'slick-carousel/slick/slick.css';
import {Toaster} from 'react-hot-toast';
import 'slick-carousel/slick/slick-theme.css';
import { useAppContext } from './context/AppContext';
import Load from './components/Load';





const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg} = useAppContext();
  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
      <div className='min-h-[70vh]'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loader/:nextUrl" element={Load} />
        
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path="add-room" element={<AddRoom/>} />
          <Route path="list-room" element={<ListRoom/>} /> I
        </Route>  
      </Routes>
    </div>
    <Footer/>
    </div>
  )
}

export default App
