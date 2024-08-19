// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';

import Footer from './Components/Footer';
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
        <Navbar />
        <Routes>
          <Route path="/" element={<div><HomePage/></div>} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/find-question" element={<FindQuestion />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
