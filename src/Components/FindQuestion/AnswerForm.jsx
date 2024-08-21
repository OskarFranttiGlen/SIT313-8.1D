import React from 'react';
import { Button, Input, Checkbox } from '@nextui-org/react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'; // Ensure you import the necessary CSS
import 'codemirror/mode/javascript/javascript'; // Import the mode you need

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
  questionStatus, // Add this prop to receive the question's status
}) => {
  const isAnswered = questionStatus === 'Answered';

  return (
    <div onClick={stopPropagation} className="flex flex-col items-start">
      {isAnswered ? (
        <p className="text-red-500 ml-3">This question has been answered. You cannot add more answers.</p>
      ) : (
        <>
          <Input 
            clearable 
            underlined 
            placeholder="Type your answer here..." 
            value={newAnswer} 
            onChange={(e) => setNewAnswer(e.target.value)}
            className="ml-3 w-full"
            disabled={isAnswered} // Disable the input if the question is answered
          />
          <div className="flex items-center mt-4 ml-3">
            <Checkbox 
              checked={isAttachingCode} 
              onChange={() => setIsAttachingCode(!isAttachingCode)}
              disabled={isAnswered} // Disable the checkbox if the question is answered
            >
              Attach Code
            </Checkbox>
          </div>
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
                  lineNumbers: true,
                  mode: 'javascript',  // Set the mode according to the code you're editing
                  theme: 'default',     // Set the theme, adjust as necessary
                  tabSize: 2,           // Customize the tab size
                  indentWithTabs: true, // Indent with tabs
                  lineWrapping: true,   // Enable line wrapping for better readability
                }}
                onBeforeChange={(editor, data, value) => setNewAnswerCode(value)}
                disabled={isAnswered} // Disable the CodeMirror editor if the question is answered
              />
            </div>
          )}
          <Button 
            color="primary" 
            auto 
            className="mt-4 ml-3" 
            onClick={handleAnswerSubmit} 
            isLoading={isLoading}
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
