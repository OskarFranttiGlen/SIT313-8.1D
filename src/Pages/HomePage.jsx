import React, { useEffect } from 'react';
import FeaturedTutorials from '../Components/Home/FeaturedTutorials'; 
import HeroImage from '../Components/Home/HeroImage'; 
import NewsletterSignup from '../Components/Home/NewsletterSignup'; 

const HomePage = () => {
  // Effect hook to set the document title when the component is mounted
  useEffect(() => {
    document.title = 'Home'; // Set the document title to 'Home'
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      {/* Hero section with an image and title */}
      <HeroImage />
      
      {/* Section displaying featured tutorials */}
      <FeaturedTutorials />
      
      {/* Section for users to sign up for the newsletter */}
      <NewsletterSignup />
    </div>
  );
};

export default HomePage;
