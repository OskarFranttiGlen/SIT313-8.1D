import React, { useState } from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import SignupForm from '../Components/Auth/SignupForm';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-4xl w-full mx-auto p-5 font-sans flex flex-col justify-center">
      
      {/* Wrap the forms with FormContainer */}
      {isLogin ? <LoginForm /> : <SignupForm />}
      
      <div 
        className="mt-5 text-lg text-blue-500 cursor-pointer text-center"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Sign up here" : "Have an account? Log in here"}
      </div>
    </div>
  );
};

export default AuthPage;
