import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  console.log("API Key:", process.env.REACT_APP_API_KEY); // Debugging line

  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '89f2d4c8-3a5b-49ea-bf77-9828f842d8b9', // Use the API key from the .env file
        },
        body: JSON.stringify({ 
          firstname: 'John', // Replace with actual data
          lastname: 'Doe',   // Replace with actual data
          email: email 
        }),
      });
      
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>SIGN UP FOR OUR DAILY INSIDER</h2>
      <input 
        type="email" 
        placeholder="Enter your email" 
        style={styles.input} 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button style={styles.button} onClick={handleSubscribe}>Subscribe</button>
      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    borderTop: '1px solid #ddd',
    position: 'relative',
    zIndex: 1000,
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
