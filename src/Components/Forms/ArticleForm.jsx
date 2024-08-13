import React from 'react';
import './forms.css'; // Ensure you import the CSS file

const ArticleForm = () => {
  return (
    <div className="form-container">
      <h2>Submit an Article</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Enter a descriptive title" />
      </div>
      <div>
        <label htmlFor="abstract">Abstract</label>
        <textarea id="abstract" rows="3" placeholder="Enter a 1-paragraph abstract" />
      </div>
      <div>
        <label htmlFor="articleText">Article Text</label>
        <textarea id="articleText" rows="5" placeholder="Enter the full article text" />
      </div>
      <button type="submit">Submit</button>
    </div>
  );
};

export default ArticleForm;
