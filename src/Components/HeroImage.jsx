import React from 'react';

const HeroImage = () => {
  return (
    <div style={styles.heroImage}>
      <img 
        src="https://picsum.photos/1200/300"
        alt="Hero Banner"
        style={styles.image}
      />
      <div style={styles.overlay}>
        <h1 style={styles.title}>1234</h1>
      </div>
    </div>
  );
};

const styles = {
  heroImage: {
    width: '100%',
    height: '300px',
    position: 'relative',
    marginBottom: '20px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '36px',
    textAlign: 'center',
  },
};

export default HeroImage;