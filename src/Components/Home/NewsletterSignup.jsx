import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';

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
          'x-api-key': process.env.REACT_APP_API_KEY, // Use the API key from the .env file
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
    <div className="p-10 text-center bg-white border-t border-gray-300 relative z-50">
      <h2 className="text-2xl font-bold mb-4">SIGN UP FOR OUR DAILY INSIDER</h2>
      <div className="flex justify-center mb-4">
        <Input 
          clearable 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="mr-2 flex-1 max-w-xs"
        /> 
        <Button 
          auto
          onClick={handleSubscribe}
          color="primary" variant="solid"
        >
          Subscribe
        </Button>
      </div>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default NewsletterSignup;
