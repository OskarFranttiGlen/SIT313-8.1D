import React from 'react';

const cardStyle = {
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  width: '300px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover'
};

const descriptionStyle = {
  padding: '15px'
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 15px 15px'
};

const ratingStyle = {
  color: '#f39c12'
};

const authorStyle = {
  color: '#7f8c8d'
};

const CardComponent = ({ image, description, rating, author }) => {
  return (
    <div style={cardStyle}>
      <img src={image} alt="Article" style={imageStyle} />
      <p style={descriptionStyle}>{description}</p>
      <div style={footerStyle}>
        <span style={ratingStyle}>Rating: {rating}</span>
        <span style={authorStyle}>By {author}</span>
      </div>
    </div>
  );
};

export default CardComponent;
