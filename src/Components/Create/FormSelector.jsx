// src/Components/FormSelector.jsx
import React from 'react';

const styles = {
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

const FormSelector = ({ postType, setPostType }) => {
  return (
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
  );
};

export default FormSelector;
