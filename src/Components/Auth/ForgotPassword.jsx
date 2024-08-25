import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Input, Button, Spacer, Card } from '@nextui-org/react';

const ForgotPasswordForm = () => {
  // State hooks to manage input fields and error messages
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigating programmatically

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  // Handle form submission for password reset
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Attempt to send a password reset email using Firebase auth
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
      setError(''); // Clear any previous error messages
    } catch (error) {
      setError(error.message); // Set the error message if reset fails
      setMessage(''); // Clear any previous success messages
    }
  };

  return (
    // Center the forgot password form both vertically and horizontally
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-8 max-w-md w-full shadow-lg">
        {/* Form title */}
        <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          {/* Email input field */}
          <Input
            isRequired
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          {/* Success or error message display */}
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <Spacer y={1} />
          {/* Submit button */}
          <Button type="submit" shadow color="primary" auto fullWidth>
            Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
