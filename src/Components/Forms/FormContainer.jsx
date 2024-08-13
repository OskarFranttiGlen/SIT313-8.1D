// src/Components/FormContainer.jsx
import React from 'react';

const FormContainer = ({ children }) => {
  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  return <div style={containerStyle}>{children}</div>;
};

export default FormContainer;
