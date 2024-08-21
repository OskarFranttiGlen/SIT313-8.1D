import React from 'react';
import { Button, Input, Checkbox } from '@nextui-org/react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'; 
import 'codemirror/mode/javascript/javascript'; 

const AnswerForm = ({
  newAnswer,
  setNewAnswer,
  isAttachingCode,
  setIsAttachingCode,
  newAnswerCode,
  setNewAnswerCode,
  handleAnswerSubmit,
  isLoading,
  stopPropagation,
  questionStatus, 
}) => {
  // Check if the question is marked as answered
  const isAnswered = questionStatus === 'Answered';

  return (
    // Wrapper div for the answer form, with click event to stop propagation
    <div onClick={stopPropagation} className="flex flex-col items-start">
      {/* Display a message if the question is already answered, preventing further answers */}
      {isAnswered ? (
        <p className="text-red-500 ml-3">This question has been answered. You cannot add more answers.</p>
      ) : (
        <>
          {/* Input field for typing the new answer */}
          <Input 
            clearable 
            underlined 
            placeholder="Type your answer here..." 
            value={newAnswer} 
            onChange={(e) => setNewAnswer(e.target.value)}
            className="ml-3 w-full"
            disabled={isAnswered} // Disable input if the question is answered
          />
          {/* Checkbox to toggle the attachment of code to the answer */}
          <div className="flex items-center mt-4 ml-3">
            <Checkbox 
              checked={isAttachingCode} 
              onChange={() => setIsAttachingCode(!isAttachingCode)}
              disabled={isAnswered} // Disable checkbox if the question is answered
            >
              Attach Code
            </Checkbox>
          </div>
          {/* Render the CodeMirror editor if the user decides to attach code */}
          {isAttachingCode && (
            <div
              className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden mt-3 ml-3 mr-3 w-full"
              onClick={(e) => {
                e.preventDefault();  // Prevent default behavior on the CodeMirror wrapper
              }}
            >
              <CodeMirror
                value={newAnswerCode}
                options={{
                  lineNumbers: true,    // Display line numbers for easier code navigation
                  mode: 'javascript',   // Set the syntax mode to JavaScript
                  theme: 'default',     // Set the theme, can be customized as needed
                  tabSize: 2,           // Set tab size to 2 spaces
                  indentWithTabs: true, // Enable tab indentation
                  lineWrapping: true,   // Enable line wrapping for better readability
                }}
                onBeforeChange={(editor, data, value) => setNewAnswerCode(value)}
                disabled={isAnswered} // Disable CodeMirror editor if the question is answered
              />
            </div>
          )}
          {/* Button to submit the new answer */}
          <Button 
            color="primary" 
            auto 
            className="mt-4 ml-3" 
            onClick={handleAnswerSubmit} 
            isLoading={isLoading} // Show loading state if the form is being submitted
            disabled={isAnswered} // Disable the submit button if the question is answered
          >
            Add Answer
          </Button>
        </>
      )}
    </div>
  );
};

export default AnswerForm;
