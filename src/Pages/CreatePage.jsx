import React, { useState, useEffect } from 'react';
import ArticleForm from '../Components/Create/ArticleForm'; 
import QuestionForm from '../Components/Create/QuestionForm'; 

const CreatePage = () => {
  const [postType, setPostType] = useState('question'); // State variable to toggle between 'question' and 'article' forms

  // Effect hook to set the document title when the component is mounted
  useEffect(() => {
    document.title = 'Create Post'; // Set the document title to 'Create Post'
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="max-w-4xl w-full mx-auto p-5 font-sans">
      {/* Container for the create post page */}
      
      {/* Page title */}
      <h1 className="text-center text-3xl font-semibold mb-8">New Post</h1>
      
      {/* Radio buttons to switch between Question and Article form */}
      <div className="flex justify-center mb-6">
        <label className="mr-5 text-lg">
          <input
            type="radio"
            value="question"
            checked={postType === 'question'} // Check this radio button if postType is 'question'
            onChange={() => setPostType('question')} // Update postType to 'question' when this radio button is selected
            className="mr-2"
          />
          Question
        </label>
        <label className="text-lg">
          <input
            type="radio"
            value="article"
            checked={postType === 'article'} // Check this radio button if postType is 'article'
            onChange={() => setPostType('article')} // Update postType to 'article' when this radio button is selected
            className="mr-2"
          />
          Article
        </label>
      </div>
      
      {/* Conditionally render either the QuestionForm or ArticleForm based on postType */}
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </div>
  );
};

export default CreatePage;
