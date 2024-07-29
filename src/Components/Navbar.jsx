import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>DEV@Deakin</div>
      <input type="text" placeholder="Search..." style={styles.searchBar} />
      <button style={styles.button}>Post</button>
      <button style={styles.button}>Login</button>
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
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  searchBar: {
    flex: 1,
    margin: '0 20px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f4f4f4',
    cursor: 'pointer',
  },
};

export default Navbar;
