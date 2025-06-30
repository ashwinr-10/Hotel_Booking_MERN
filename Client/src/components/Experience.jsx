import React from 'react';
import { assets } from '../assets/assets';

const experiences = [
  {
    title: 'Spa & Wellness',
    image: assets.poolIcon,
    description: 'Relax and rejuvenate with world-class spa treatments and wellness programs at our partner hotels.'
  },
  {
    title: 'Adventure Activities',
    image: assets.mountainIcon,
    description: 'Experience thrilling adventures, from mountain hikes to water sports, curated for every explorer.'
  },
  {
    title: 'Culinary Journeys',
    image: assets.freeBreakfastIcon,
    description: 'Savor gourmet dining and local flavors with exclusive culinary experiences and food tours.'
  },
  {
    title: 'Cultural Events',
    image: assets.badgeIcon,
    description: 'Immerse yourself in local culture with art tours, festivals, and unique traditions.'
  },
  {
    title: 'Family-Friendly',
    image: assets.guestsIcon,
    description: 'Create lasting memories with activities and amenities designed for families and kids.'
  },
  {
    title: 'Wellness Retreats',
    image: assets.badgeIcon,
    description: 'Recharge your mind and body with holistic wellness retreats, yoga sessions, and mindfulness experiences.'
  },
];

const Experience = () => {
  return (
    <section
      className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-16 pt-36 min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#f0f6ff' }}
    >
      <div className="relative z-10 w-full">
        <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-8 text-center text-gray-900">Unforgettable Experiences</h2>
        <p className="text-center max-w-2xl mx-auto text-gray-700 mb-12">
          Discover a world of unique experiences curated just for you. Whether you seek relaxation, adventure, or cultural immersion, our platform connects you to the best each destination has to offer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-white/80 rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
              <img src={exp.image} alt={exp.title} className="h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center text-gray-900">{exp.title}</h3>
              <p className="text-gray-700 text-center mb-4">{exp.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <a href="/rooms" className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#2563EB] transition-colors duration-300">Explore Hotels & Experiences</a>
        </div>
      </div>
    </section>
  );
};

export default Experience; 