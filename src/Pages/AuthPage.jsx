import React, { useState } from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import SignupForm from '../Components/Auth/SignupForm';
import ForgotPasswordForm from '../Components/Auth/ForgotPassword';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('login'); // State variable to manage auth mode ('login', 'signup', 'forgotPassword')

  return (
    <div className="max-w-4xl w-full mx-auto p-5 font-sans flex flex-col justify-center min-h-screen">
      <div className="flex flex-col items-center">
        {/* Conditionally render either the LoginForm, SignupForm, or ForgotPasswordForm based on authMode state */}
        {authMode === 'login' && <LoginForm />}
        {authMode === 'signup' && <SignupForm />}
        {authMode === 'forgotPassword' && <ForgotPasswordForm />}

        {/* Toggle text to switch between different forms */}
        <div className="mt-5 text-lg text-blue-500 cursor-pointer text-center">
          {authMode === 'login' && (
            <>
              <p onClick={() => setAuthMode('signup')}>Don't have an account? Sign up here</p>
              <p onClick={() => setAuthMode('forgotPassword')} className="mt-2">Forgot Password?</p>
            </>
          )}
          {authMode === 'signup' && (
            <p onClick={() => setAuthMode('login')}>Have an account? Log in here</p>
          )}
          {authMode === 'forgotPassword' && (
            <p onClick={() => setAuthMode('login')}>Remember your password? Log in here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
