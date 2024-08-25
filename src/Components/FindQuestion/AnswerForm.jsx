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
  // Determine if the question has been answered
  const isAnswered = questionStatus === 'Answered';

  return (
    // Wrapper for the answer form with event propagation handling
    <div onClick={stopPropagation} className="flex flex-col items-start">
      {isAnswered ? (
        // If the question is already answered, display a message
        <p className="text-red-500 ml-3">
          This question has been answered. You cannot add more answers.
        </p>
      ) : (
        <>
          {/* Input field for the new answer */}
          <Input
            type="input"
            label="Type your answer here"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="ml-3 w-full"
            disabled={isAnswered} // Disable input if the question is answered
          />
          
          {/* Checkbox to toggle code attachment */}
          <div className="flex items-center mt-4 ml-3">
            <Checkbox
              checked={isAttachingCode}
              onChange={() => setIsAttachingCode(!isAttachingCode)}
              disabled={isAnswered} // Disable checkbox if the question is answered
            >
              Attach Code
            </Checkbox>
          </div>

          {/* CodeMirror editor for attaching code */}
          {isAttachingCode && (
            <div
              className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden mt-3 ml-3 mr-3 w-full"
              onClick={(e) => e.preventDefault()}
            >
              <CodeMirror
                value={newAnswerCode}
                options={{
                  lineNumbers: true,    // Line numbers for code
                  mode: 'javascript',   // Set the language mode to JavaScript
                  theme: 'default',     // Set the theme for CodeMirror
                  tabSize: 2,           // Set tab size
                  indentWithTabs: true, // Indent with tabs
                  lineWrapping: true,   // Wrap lines to fit the container
                }}
                onBeforeChange={(editor, data, value) => setNewAnswerCode(value)}
                disabled={isAnswered} // Disable CodeMirror if question is answered
              />
            </div>
          )}

          {/* Submit button for the answer */}
          <Button
            color="primary"
            className="mt-4 ml-3"
            onClick={handleAnswerSubmit}
            isLoading={isLoading} // Display loading indicator if the form is being submitted
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
