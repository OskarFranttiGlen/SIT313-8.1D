import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate('/create');
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <nav style={styles.navbar}>
      <button 
        style={styles.logo} 
        onClick={handleLogoClick} // Add onClick handler
      >
        DEV@Deakin
      </button>
      <input type="text" placeholder="Search..." style={styles.searchBar} aria-label="Search" />
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button} 
          onClick={handlePostClick} // Add onClick handler
        >
          Post
        </button>
        <button style={styles.button}>Login</button>
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
    marginRight: '20px',
    background: 'none', // Remove default button background
    border: 'none', // Remove default button border
    cursor: 'pointer', // Change cursor to pointer for better UX
    padding: '0', // Remove default button padding
    color: '#000', // Set text color to match design
    textAlign: 'left', // Align text to the left
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
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f4f4f4',
    cursor: 'pointer',
    transition: 'background-color 0.3s, border-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
  },
};

export default Navbar;
