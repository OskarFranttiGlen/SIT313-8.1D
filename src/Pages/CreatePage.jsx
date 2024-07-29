// src/Pages/CreatePage.jsx
import React, { useState } from 'react';

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
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    resize: 'vertical',
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

        <div style={styles.postContent}>
          <p>What do you want to ask or share</p>
          <p style={styles.infoText}>
            This section is designed based on the type of the post. It could be developed by
            conditional rendering. For post a {postType}, the following section would be appeared:
          </p>

          {postType === 'question' ? (
            <>
              <div style={styles.inputGroup}>
                <label htmlFor="title" style={styles.inputLabel}>Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Start your question with how, what, why, etc."
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="problem" style={styles.inputLabel}>Describe your problem</label>
                <textarea id="problem" rows="5" style={styles.textarea} />
              </div>
            </>
          ) : (
            <>
              <div style={styles.inputGroup}>
                <label htmlFor="title" style={styles.inputLabel}>Title</label>
                <input type="text" id="title" placeholder="Enter a descriptive title" style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="abstract" style={styles.inputLabel}>Abstract</label>
                <textarea id="abstract" rows="3" placeholder="Enter a 1-paragraph abstract" style={styles.textarea} />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="articleText" style={styles.inputLabel}>Article Text</label>
                <textarea id="articleText" rows="5" placeholder="Enter the article text" style={styles.textarea} />
              </div>
            </>
          )}

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
