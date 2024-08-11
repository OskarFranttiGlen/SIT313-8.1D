// src/Pages/CreatePage.jsx
import React, { useState } from 'react';
import FormSelector from '../Components/FormSelector';
import QuestionForm from '../Components/QuestionForm';
import ArticleForm from '../Components/ArticleForm';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  postContent: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  infoText: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  inputLabel: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

const CreatePage = () => {
  const [postType, setPostType] = useState('question');

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>New Post</h1>
      <form>
        <FormSelector postType={postType} setPostType={setPostType} />

        <div style={styles.postContent}>
          <p>What do you want to ask or share?</p>
          <p style={styles.infoText}>
            This section is designed based on the type of the post. It could be developed by
            conditional rendering. For posting a {postType}, the following section would appear:
          </p>

          {postType === 'question' ? <QuestionForm /> : <ArticleForm />}

          <div style={styles.inputGroup}>
            <label htmlFor="tags" style={styles.inputLabel}>Tags</label>
            <input
              type="text"
              id="tags"
              placeholder={`Please add up to 3 tags to describe what your ${postType} is about e.g., Java`}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
