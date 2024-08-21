// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './Components/Navigation/Navbar';
import Footer from './Components/Navigation/Footer'; 
import HomePage from './Pages/HomePage'; 
import ArticlesPage from './Pages/ArticlesPage'; 
import TutorialsPage from './Pages/TutorialsPage'; 
import CreatePage from './Pages/CreatePage'; 
import AuthPage from './Pages/AuthPage'; 
import FindQuestion from './Pages/FindQuestion'; 
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Navbar is rendered at the top of all pages */}
        <Navbar />
        
        {/* Define routes for different pages */}
        <Routes>
          {/* Home route */}
          <Route path="/" element={<div><HomePage/></div>} />
          {/* Articles page route */}
          <Route path="/articles" element={<ArticlesPage />} />
          {/* Find question page route */}
          <Route path="/find-question" element={<FindQuestion />} />
          {/* Tutorials page route */}
          <Route path="/tutorials" element={<TutorialsPage />} />
          {/* Create new post page route */}
          <Route path="/create" element={<CreatePage />} />
          {/* Authentication page route */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        
        {/* Footer is rendered at the bottom of all pages */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
