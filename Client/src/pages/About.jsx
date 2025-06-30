import React from 'react';

const About = () => {
  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center min-h-screen'>
      <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>About Us</p>
      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>Welcome to EasyStay</h1>
      <p className='max-w-2xl mt-2 text-sm md:text-base'>
        EasyStay is your gateway to extraordinary comfort and world-class service. Our mission is to connect travelers with the finest hotels and resorts, ensuring every stay is memorable. Whether you seek luxury, adventure, or relaxation, we provide seamless booking experiences and curated recommendations tailored to your needs.
      </p>
      <p className='max-w-2xl mt-4 text-sm md:text-base'>
        Our platform is designed with you in mind, offering intuitive search, exclusive offers, and genuine reviews. Start your journey with us and uncover your ideal destination today.
      </p>
    </div>
  );
};

export default About; 