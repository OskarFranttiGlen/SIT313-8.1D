import React from 'react';
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

const containerStyle = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const titleStyle = {
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
};

const tutorialsRowStyle = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  flexWrap: 'wrap', // To handle responsiveness
};

const seeAllLinkStyle = {
  display: 'block',
  marginTop: '20px',
  color: '#007bff',
  textDecoration: 'none'
};

const FeaturedTutorials = () => {
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Featured Tutorials</div>
      <div style={tutorialsRowStyle}>
        {tutorials.map(tutorial => (
          <CardComponent key={tutorial.id} {...tutorial} />
        ))}
      </div>
      <a href="/all-tutorials" style={seeAllLinkStyle}>See all Tutorials</a>
    </div>
  );
};

export default FeaturedTutorials;
