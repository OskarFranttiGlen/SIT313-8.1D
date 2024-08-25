import React from 'react';
import {RadioGroup, Radio} from "@nextui-org/react";

const FormSelector = ({ postType, setPostType }) => {
  return (
    // Container div for the radio buttons, with flexbox centering and margin at the bottom
    <div className="flex justify-center mb-5">




    <RadioGroup
      orientation="horizontal"
      defaultValue="question">
        
      <Radio 
    value="question"
  
    onChange={() => setPostType('question')} // Set postType to 'question' when selected
    className="mr-2" // Margin to the right of the radio button
    
    >Question</Radio>
      <Radio 
      value="article"
          onChange={() => setPostType('article')} // Set postType to 'article' when selected
          className="mr-2" // Margin to the right of the radio button
      
      
      >Article
      
      
      
      </Radio>
    </RadioGroup>



    </div>
  );
};

export default FormSelector;
