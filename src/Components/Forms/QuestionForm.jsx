import React from 'react';
import './forms.css'; // Ensure you import the CSS file

const QuestionForm = () => {
  return (
    <div className="form-container">
      <h2>Ask a Question</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Start your question with how, what, why, etc." />
      </div>
      <div>
        <label htmlFor="problem">Describe your problem</label>
        <textarea id="problem" rows="5" placeholder="Describe your problem in detail" />
      </div>
      <button type="submit">Submit</button>
    </div>
  );
};

export default QuestionForm;
