import React from 'react';
import CardComponent from './CardComponent'; 

// Array of article objects, each containing an id, image URL, description, rating, and author
const articles = [
  {
    id: 1,
    image: 'https://picsum.photos/300/150?random=1',
    description: 'Article 1 description',
    rating: 4.5,
    author: 'Author 1'
  },
  {
    id: 2,
    image: 'https://picsum.photos/300/150?random=2',
    description: 'Article 2 description',
    rating: 4.2,
    author: 'Author 2'
  },
  {
    id: 3,
    image: 'https://picsum.photos/300/150?random=3',
    description: 'Article 3 description',
    rating: 4.7,
    author: 'Author 3'
  }
];

// Inline styles for the container, title, articles row, and link
const containerStyle = {
  padding: '20px', // Padding around the container
  display: 'flex', // Flexbox layout
  flexDirection: 'column', // Arrange children in a column
  alignItems: 'center', // Center children horizontally
};

const titleStyle = {
  marginBottom: '20px', // Space below the title
  fontSize: '24px', // Font size for the title
  fontWeight: 'bold', // Bold font for the title
};

const articlesRowStyle = {
  display: 'flex', // Flexbox layout for the articles
  gap: '20px', // Space between articles
  justifyContent: 'center', // Center articles horizontally
  flexWrap: 'wrap', // Allow wrapping of articles to handle responsiveness
};

const seeAllLinkStyle = {
  display: 'block', // Display as a block element
  marginTop: '20px', // Space above the link
  color: '#007bff', // Blue color for the link text
  textDecoration: 'none' // Remove underline from the link
};

// The FeaturedArticles component renders a section displaying featured articles
const FeaturedArticles = () => {
  return (
    <div style={containerStyle}>
      {/* Section title */}
      <div style={titleStyle}>Featured Articles</div>
      
      {/* Container for the article cards */}
      <div style={articlesRowStyle}>
        {/* Map over the articles array and render a CardComponent for each article */}
        {articles.map(article => (
          <CardComponent key={article.id} {...article} />
        ))}
      </div>

      {/* Link to view all articles */}
      <a href="/all-articles" style={seeAllLinkStyle}>
        See all Articles
      </a>
    </div>
  );
};

export default FeaturedArticles;
