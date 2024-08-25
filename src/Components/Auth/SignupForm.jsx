import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig'; 
import { Input, Button, Spacer, Card } from '@nextui-org/react';

const SignupForm = () => {
  // State hooks to manage input fields and error messages
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigating programmatically

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  // Handle form submission for sign up
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create a new user with email and password using Firebase auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
      });

      navigate('/');  // Redirect to home page after successful signup
    } catch (error) {
      setError(error.message); // Set the error message if signup fails
    }
  };

  return (
    // Center the signup form both vertically and horizontally
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-8 max-w-md w-full shadow-lg">
        {/* Form title */}
        <h1 className="text-center text-2xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          {/* First Name input field */}
          <Input
            isRequired
            type="name"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}

          />
          {/* Last Name input field */}
          <Input
            isRequired
            type="name"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}

          />
          {/* Email input field */}
          <Input
            isRequired
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          {/* Password input field */}
          <Input
            isRequired
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          {/* Error message display */}
          {error && <p className="text-red-500">{error}</p>}
          <Spacer y={1} />
          {/* Sign Up button */}
          <Button type="submit" shadow color="primary" auto fullWidth>
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
