import React, { useState, useEffect } from 'react';
import ArticleForm from '../Components/Create/ArticleForm';
import QuestionForm from '../Components/Create/QuestionForm';

const CreatePage = () => {
  const [postType, setPostType] = useState('question');

  useEffect(() => {
    document.title = 'Create Post';
  }, []);

  return (
    <div className="max-w-4xl w-full mx-auto p-5 font-sans">
      <h1 className="text-center text-3xl font-semibold mb-8">New Post</h1>
      <div className="flex justify-center mb-6">
        <label className="mr-5 text-lg">
          <input
            type="radio"
            value="question"
            checked={postType === 'question'}
            onChange={() => setPostType('question')}
            className="mr-2"
          />
          Question
        </label>
        <label className="text-lg">
          <input
            type="radio"
            value="article"
            checked={postType === 'article'}
            onChange={() => setPostType('article')}
            className="mr-2"
          />
          Article
        </label>
      </div>
      
      {/* Wrap the forms with FormContainer */}
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </div>
  );
};

export default CreatePage;
