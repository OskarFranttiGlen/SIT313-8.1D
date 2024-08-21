import React from 'react';
import { Link } from '@nextui-org/react'; // Import the Link component from NextUI
import CardComponent from './CardComponent';

const tutorials = [
  {
    id: 1,
    image: 'https://picsum.photos/300/150?random=4',
    description: 'JavaScript Basics - A comprehensive guide to the fundamentals of JavaScript.',
    rating: 5,
    author: 'Michael Brown'
  },
  {
    id: 2,
    image: 'https://picsum.photos/300/150?random=5',
    description: 'Advanced CSS Techniques - Learn advanced CSS techniques for creating stunning web designs.',
    rating: 4.9,
    author: 'Emily Davis'
  },
  {
    id: 3,
    image: 'https://picsum.photos/300/150?random=6',
    description: 'Web Accessibility - An introduction to web accessibility and how to make your sites more inclusive.',
    rating: 5,
    author: 'Chris Wilson'
  }
];

const FeaturedTutorials = () => {
  return (
    <div className="py-8 flex flex-col items-center">
      <h2 className="mb-6 text-2xl font-bold text-center">Featured Tutorials</h2>
      <div className="flex gap-6 justify-center flex-wrap">
        {tutorials.map(tutorial => (
          <CardComponent key={tutorial.id} {...tutorial} />
        ))}
      </div>
      <Link href="/all-tutorials" className="mt-8 text-blue-500 hover:underline">See all Tutorials</Link>
    </div>
  );
};

export default FeaturedTutorials;
