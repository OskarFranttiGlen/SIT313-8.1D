import React, { useState } from 'react';
import LoginForm from '../Components/Auth/LoginForm'; 
import SignupForm from '../Components/Auth/SignupForm'; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State variable to toggle between login and signup forms

  return (
    <div className="max-w-4xl w-full mx-auto p-5 font-sans flex flex-col justify-center">
      {/* Container for the authentication page */}
      
      {/* Conditionally render either the LoginForm or SignupForm based on isLogin state */}
      {isLogin ? <LoginForm /> : <SignupForm />}
      
      {/* Toggle text to switch between login and signup forms */}
      <div 
        className="mt-5 text-lg text-blue-500 cursor-pointer text-center"
        onClick={() => setIsLogin(!isLogin)} // Toggle isLogin state on click
      >
        {isLogin ? "Don't have an account? Sign up here" : "Have an account? Log in here"}
      </div>
    </div>
  );
};

export default AuthPage;
