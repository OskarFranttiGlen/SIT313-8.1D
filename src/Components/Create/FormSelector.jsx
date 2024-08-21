import React from 'react';

const FormSelector = ({ postType, setPostType }) => {
  return (
    // Container div for the radio buttons, with flexbox centering and margin at the bottom
    <div className="flex justify-center mb-5">
      {/* Label and radio button for selecting "Question" post type */}
      <label className="mr-5 text-lg">
        <input
          type="radio"
          value="question"
          checked={postType === 'question'} // Check if the current postType is 'question'
          onChange={() => setPostType('question')} // Set postType to 'question' when selected
          className="mr-2" // Margin to the right of the radio button
        />
        Question
      </label>

      {/* Label and radio button for selecting "Article" post type */}
      <label className="text-lg">
        <input
          type="radio"
          value="article"
          checked={postType === 'article'} // Check if the current postType is 'article'
          onChange={() => setPostType('article')} // Set postType to 'article' when selected
          className="mr-2" // Margin to the right of the radio button
        />
        Article
      </label>
    </div>
  );
};

export default FormSelector;
