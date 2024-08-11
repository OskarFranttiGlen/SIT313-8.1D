// src/Components/ArticleForm.jsx
import React from 'react';

const styles = {
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
};

const ArticleForm = () => {
  return (
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
        <textarea id="articleText" rows="5" placeholder="Enter the full article text" style={styles.textarea} />
      </div>
    </>
  );
};

export default ArticleForm;
