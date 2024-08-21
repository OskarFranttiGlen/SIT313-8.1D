import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../../firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { Button } from '@nextui-org/react'; 

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState(null); // State variable to track the authenticated user

  // Effect hook to monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when authentication state changes
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, []);

  // Handler for when the 'Post' button is clicked
  const handlePostClick = () => {
    navigate('/create'); // Navigate to the 'create' page
  };

  // Handler for when the logo is clicked
  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home page
  };

  // Handler for when the 'Find Questions' button is clicked
  const handleFindQuestionClick = () => {
    navigate('/find-question'); // Navigate to the 'find-question' page
  };

  // Handler for authentication button (login/logout)
  const handleAuthClick = () => {
    if (user) {
      // If user is logged in, sign them out
      signOut(auth)
        .then(() => {
          console.log('Logged out successfully');
          navigate('/'); // Optionally navigate to the home page on logout
        })
        .catch((error) => console.error('Sign out error:', error)); // Log any errors
    } else {
      // If no user is logged in, navigate to the authentication page
      navigate('/auth');
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black border-b border-gray-800 shadow-lg text-white flex justify-between items-center p-4 mb-16">
      {/* Logo button to navigate to home */}
      <Button onClick={handleLogoClick}>
        DEV@Deakin
      </Button>

      {/* Right side buttons for navigation and authentication */}
      <div className="flex items-center space-x-4">
        {/* Show 'Find Questions' and 'Post' buttons if the user is logged in */}
        {user && (
          <>
            <Button
              color="primary" variant="solid"
              onClick={handleFindQuestionClick}
            >
              Find Questions
            </Button>
            <Button
              color="primary" variant="solid"
              onClick={handlePostClick}
            >
              Post
            </Button>
          </>
        )}
        
        {/* Authentication button to either log in or log out */}
        <Button
          color="primary" variant="ghost"
          onClick={handleAuthClick}
        >
          {user ? `Logout (${user.displayName || user.email})` : 'Log in / Sign up'}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
