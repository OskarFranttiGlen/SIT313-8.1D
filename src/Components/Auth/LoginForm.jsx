import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 
import { Input, Button, Spacer, Card } from '@nextui-org/react';

const LoginForm = () => {
  // State hooks to manage input fields and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigating programmatically

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = 'Login';
  }, []);

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt to sign in with email and password using Firebase auth
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to the home page on successful login
    } catch (error) {
      setError(error.message); // Set the error message if login fails
    }
  };

  return (
    // Center the login form both vertically and horizontally
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-8 max-w-md w-full shadow-lg">
        {/* Form title */}
        <h1 className="text-center text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
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
          {/* Login button */}
          <Button type="submit" shadow color="primary" auto fullWidth>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
