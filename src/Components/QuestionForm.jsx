// src/Components/QuestionForm.jsx
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

const QuestionForm = () => {
  return (
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
        <textarea id="problem" rows="5" placeholder="Describe your problem in detail" style={styles.textarea} />
      </div>
    </>
  );
};

export default QuestionForm;
