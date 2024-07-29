import React from 'react';
import CardComponent from './CardComponent';

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

const articlesRowStyle = {
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

const FeaturedArticles = () => {
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Featured Articles</div>
      <div style={articlesRowStyle}>
        {articles.map(article => (
          <CardComponent key={article.id} {...article} />
        ))}
      </div>
      <a href="/all-articles" style={seeAllLinkStyle}>See all Articles</a>
    </div>
  );
};

export default FeaturedArticles;
