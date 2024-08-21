import React from 'react';

const CardComponent = ({ image, description, rating, author }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden w-72 shadow-md">
      <img src={image} alt="Article" className="w-full h-36 object-cover" />
      <p className="p-4 text-gray-700">{description}</p>
      <div className="flex justify-between items-center px-4 pb-4">
        <span className="text-yellow-500">Rating: {rating}</span>
        <span className="text-gray-500">By {author}</span>
      </div>
    </div>
  );
};

export default CardComponent;
