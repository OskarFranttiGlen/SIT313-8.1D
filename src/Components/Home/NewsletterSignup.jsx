import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react'; 

const NewsletterSignup = () => {
  // State variables for storing the email input and response message
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Debugging line to check if the API key is correctly loaded from the .env file
  console.log("API Key:", process.env.REACT_APP_API_KEY);

  // Function to handle the subscription process
  const handleSubscribe = async () => {
    try {
      // Sending a POST request to the subscription API endpoint
      const response = await fetch('http://localhost:5000/subscribe', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Sending data as JSON
          'x-api-key': process.env.REACT_APP_API_KEY, // Use the API key from the .env file
        },
        body: JSON.stringify({ 
          firstname: 'John', // Placeholder data for firstname, should be replaced with actual data
          lastname: 'Doe',   // Placeholder data for lastname, should be replaced with actual data
          email: email // Email address entered by the user
        }),
      });

      // Parsing the response from the server
      const result = await response.json();
      if (response.ok) {
        // If the response is successful, display the success message
        setMessage(result.message);
      } else {
        // If there's an error, display the error message from the server
        setMessage(result.error);
      }
    } catch (error) {
      // Handling any network or other errors that occur during the request
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="p-10 text-center bg-white border-t border-gray-300 relative z-50">
      {/* Section title */}
      <h2 className="text-2xl font-bold mb-4">SIGN UP FOR OUR DAILY INSIDER</h2>
      
      {/* Input field and subscribe button */}
      <div className="flex justify-center mb-4">
        <Input 
          clearable 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} // Update email state when the input changes
          className="mr-2 flex-1 max-w-xs"
        />
        <Button 
          auto
          onClick={handleSubscribe} // Call handleSubscribe function when button is clicked
          color="primary" variant="solid"
        >
          Subscribe
        </Button>
      </div>

      {/* Displaying the message after subscription attempt */}
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default NewsletterSignup;
