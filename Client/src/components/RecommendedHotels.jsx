import React, { useRef, useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '../context/AppContext';

const RecommendedHotels = () => {
  const {rooms, searchedCities} = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = ()=>{
    const filteredHotels = rooms.slice().filter(room => searchedCities.includes
    (room.hotel.city));
    setRecommended (filteredHotels);
}

useEffect(() => {
    filterHotels()
}, [rooms, searchedCities])

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Swiper navigation fix for custom buttons
  useEffect(() => {
    // Swiper will attach navigation after first render
  }, []);

  return recommended.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title title="Recommended Hotels" subTitle="Explore our curated collection of world-class destinations, featuring extraordinary properties that deliver unmatched luxury, style, and once-in-a-lifetime experiences." font="font-playfair"/>
      <div className='w-full mt-20 relative'>
        {/* Custom Navigation Buttons */}
        <button ref={prevRef} className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#49B9FF]/80 text-blue-600 rounded-full shadow p-2 transition-all hidden md:block">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button ref={nextRef} className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#49B9FF]/80 text-blue-600 rounded-full shadow p-2 transition-all hidden md:block">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onInit={swiper => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {recommended.slice(0, 8).map((room, index) => (
            <SwiperSlide key={room._id}>
              <HotelCard room={room} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
}

export default RecommendedHotels
