import React from 'react';

const NewsletterSignup = () => {
  return (
    <div style={styles.container}>
      <h2>SIGN UP FOR OUR DAILY INSIDER</h2>
      <input type="email" placeholder="Enter your email" style={styles.input} />
      <button style={styles.button}>Subscribe</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    borderTop: '1px solid #ddd',
    position: 'relative', // Position it relative to its normal flow
    zIndex: 1000,        // Ensure it appears above other content
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default NewsletterSignup;
