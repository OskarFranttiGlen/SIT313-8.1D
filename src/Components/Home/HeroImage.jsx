import React from 'react';

const HeroImage = () => {
  return (
    <div className="w-full h-72 relative mb-5 overflow-hidden">
      {/* The hero banner image */}
      <img 
        src="https://picsum.photos/1200/300" // Source of the hero banner image
        alt="Hero Banner" // Alt text for accessibility
        className="w-full h-full object-cover" // Ensures the image covers the full container, maintaining aspect ratio
      />
      
      {/* Overlay with text */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        {/* Title text centered over the image */}
        <h1 className="text-white text-4xl text-center">1234</h1>
      </div>
    </div>
  );
};

export default HeroImage;
