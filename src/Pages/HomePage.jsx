import React, { useEffect } from 'react';
import FeaturedTutorials from '../Components/Home/FeaturedTutorials';
import HeroImage from '../Components/Home/HeroImage';
import NewsletterSignup from '../Components/Home/NewsletterSignup';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div>
      <HeroImage />
      <FeaturedTutorials />
      <NewsletterSignup />
    </div>
  );
};

export default HomePage;
