import React, { useState } from 'react';
import LoginForm from '../Components/Forms/LoginForm';
import SignupForm from '../Components/Forms/SignupForm';
import FormContainer from '../Components/Forms/FormContainer';

const styles = {
  container: {
    maxWidth: '1000px',  // Match the maxWidth of CreatePage
    width: '100%', // Ensure it takes the full available width
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',  // Match the font-family of CreatePage
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center', // Match the textAlign of CreatePage
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  toggleLink: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#007bff',
    cursor: 'pointer',
    textAlign: 'center', // Match the textAlign of CreatePage
  }
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={styles.container}>
      
      {/* Wrap the forms with FormContainer, matching the CreatePage */}
      <FormContainer className="form-wide">
        {isLogin ? <LoginForm /> : <SignupForm />}
      </FormContainer>

      <div style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign up here" : "Have an account? Log in here"}
      </div>
    </div>
  );
};

export default AuthPage;
