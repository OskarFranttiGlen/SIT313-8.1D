import React, { useState } from 'react';
import ArticleForm from '../Components/Forms/ArticleForm';
import QuestionForm from '../Components/Forms/QuestionForm';
import FormContainer from '../Components/Forms/FormContainer';

const styles = {
  container: {
    maxWidth: '1000px',  // Increased the maxWidth to allow more space
    width: '100%', // Ensure it takes the full available width
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  postTypeSelection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  label: {
    marginRight: '20px',
    fontSize: '16px',
  },
  radio: {
    marginRight: '8px',
  },
};

const CreatePage = () => {
  const [postType, setPostType] = useState('question');

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>New Post</h1>
      <div style={styles.postTypeSelection}>
        <label style={styles.label}>
          <input
            type="radio"
            value="question"
            checked={postType === 'question'}
            onChange={() => setPostType('question')}
            style={styles.radio}
          />
          Question
        </label>
        <label style={styles.label}>
          <input
            type="radio"
            value="article"
            checked={postType === 'article'}
            onChange={() => setPostType('article')}
            style={styles.radio}
          />
          Article
        </label>
      </div>
      
      {/* Wrap the forms with FormContainer */}
      <FormContainer className="form-wide">
        {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
      </FormContainer>
    </div>
  );
};

export default CreatePage;
