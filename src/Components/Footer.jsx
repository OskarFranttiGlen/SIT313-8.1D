import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.section}>
        <h3>Explore</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>Home</li>
          <li style={styles.listItem}>Questions</li>
          <li style={styles.listItem}>Articles</li>
          <li style={styles.listItem}>Tutorials</li>
        </ul>
      </div>
      <div style={styles.section}>
        <h3>Support</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>FAQs</li>
          <li style={styles.listItem}>Help</li>
          <li style={styles.listItem}>Contact Us</li>
        </ul>
      </div>
      <div style={styles.section}>
        <h3>Stay connected</h3>
        <div style={styles.socialIcons}>
          <a href="https://www.facebook.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href="https://www.twitter.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://www.instagram.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>DEV@Deakin 2022</p>
        <ul style={styles.bottomList}>
          <li>Privacy Policy</li>
          <li>Terms</li>
          <li>Code of Conduct</li>
        </ul>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    position: 'fixed',  // Fixes the footer to the bottom
    bottom: 0,          // Aligns the footer to the bottom
    width: '100%',      // Ensures the footer spans the entire width
    padding: '20px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    zIndex: 1000,       // Ensures it stays above other content
  },
  section: {
    margin: '10px 0',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Adds space between the list items
  },
  listItem: {
    marginBottom: '10px', // Additional spacing if needed
  },
  socialIcons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Adds space between social links
  },
  socialLink: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  bottom: {
    width: '100%',
    textAlign: 'center',
    borderTop: '1px solid #444',
    paddingTop: '10px',
    marginTop: '10px',
  },
  bottomList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
};

export default Footer;
