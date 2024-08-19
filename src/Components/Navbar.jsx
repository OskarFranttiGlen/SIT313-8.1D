import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Ensure this path correctly points to your Firebase config
import { onAuthStateChanged, signOut } from 'firebase/auth';

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
    <nav style={styles.navbar}>
      <button style={styles.logo} onClick={handleLogoClick}>
        DEV@Deakin
      </button>
      <input type="text" placeholder="Search..." style={styles.searchBar} aria-label="Search" />
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleFindQuestionClick}>
          Find Questions
        </button>
        {user && (
          <button style={styles.button} onClick={handlePostClick}>
            Post
          </button>
        )}
        <button style={styles.button} onClick={handleAuthClick}>
          {user ? `Logout (${user.displayName || user.email})` : 'Login'}
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    color: '#000',
  },
  searchBar: {
    flex: 1,
    margin: '0 20px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  buttonContainer: {
    display: 'flex',
    marginRight: '40px',
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f4f4f4',
    cursor: 'pointer',
    transition: 'background-color 0.3s, border-color 0.3s',
    fontFamily: 'Arial, sans-serif', // Ensuring font consistency
  },
  buttonHover: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
  },
};

export default Navbar;
