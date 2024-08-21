import React from 'react';

const HeroImage = () => {
  return (
    <div className="w-full h-72 relative mb-5 overflow-hidden">
      <img 
        src="https://picsum.photos/1200/300"
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <h1 className="text-white text-4xl text-center">1234</h1>
      </div>
    </div>
  );
};

export default HeroImage;
