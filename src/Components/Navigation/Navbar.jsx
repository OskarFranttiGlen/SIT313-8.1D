import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Button } from '@nextui-org/react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handlePostClick = () => {
    navigate('/create');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleFindQuestionClick = () => {
    navigate('/find-question');
  };

  const handleAuthClick = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          console.log('Logged out successfully');
          navigate('/'); // Optional: redirect to home on logout
        })
        .catch((error) => console.error('Sign out error:', error));
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black border-b border-gray-800 shadow-lg text-white flex justify-between items-center p-4 mb-16">
      <Button
        onClick={handleLogoClick}
      >
        DEV@Deakin
      </Button>
      <div className="flex items-center space-x-4">
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
