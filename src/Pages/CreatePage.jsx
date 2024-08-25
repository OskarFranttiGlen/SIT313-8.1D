import React, { useState, useEffect } from 'react';
import ArticleForm from '../Components/Create/ArticleForm'; 
import QuestionForm from '../Components/Create/QuestionForm'; 
import FormSelector from '../Components/Create/FormSelector';

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
      
      {/* Use FormSelector to switch between Question and Article form */}
      <FormSelector postType={postType} setPostType={setPostType} />
      
      {/* Conditionally render either the QuestionForm or ArticleForm based on postType */}
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </div>
  );
};

export default CreatePage;
