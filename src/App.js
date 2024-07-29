import React from 'react';
import Navbar from './Components/Navbar';
import HeroImage from './Components/HeroImage';
import FeaturedArticles from './Components/FeauturedArticles';
import FeaturedTutorials from './Components/FeaturedTutorials';
import NewsletterSignup from './Components/NewsletterSignup';
import Footer from './Components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <HeroImage />
      <FeaturedArticles />
      <FeaturedTutorials />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default App;
