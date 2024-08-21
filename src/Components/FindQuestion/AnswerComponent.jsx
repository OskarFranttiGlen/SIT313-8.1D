import React from 'react';
import { Card, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from '@nextui-org/react';
import { Controlled as CodeMirror } from 'react-codemirror2';

const Answer = ({ answer, handleMarkAsSolution, handleUnmarkAsSolution, handleDeleteAnswer }) => {
  return (
    // Card container for each answer
    <Card key={answer.id} className="p-3 mb-2 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          {/* Display 'Solution' chip if the answer is marked as the solution */}
          {answer.isSolution && (
            <Chip size="sm" color="success" variant="flat" className="mt-2 mb-2">
              Solution
            </Chip>
          )}
          {/* Render the answer text */}
          <p>{answer.answer}</p>
          {/* Render code block if the answer contains code */}
          {answer.code && (
            <div className="border border-gray-300 rounded-lg overflow-hidden mt-2">
              <CodeMirror
                value={answer.code}
                options={{
                  mode: 'javascript', // Set syntax highlighting mode
                  theme: 'dracula', // Set the theme for the code editor
                  lineNumbers: true, // Show line numbers
                  readOnly: true, // Make the editor read-only
                }}
              />
            </div>
          )}
          {/* Display the user who provided the answer and the date it was created */}
          <small className="text-gray-500">Answered by {answer.userEmail || 'anonymous'} on {new Date(answer.createdAt.seconds * 1000).toLocaleString()}</small>
        </div>

        {/* Dropdown menu for answer options */}
        <Dropdown>
          <DropdownTrigger>
            <Button auto variant="ghost" color="primary">
              Options
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Answer Options">
            {/* Conditionally render 'Unmark as Solution' or 'Mark as Solution' based on the answer's current state */}
            {answer.isSolution ? (
              <DropdownItem key="unmarkAsSolution" onClick={() => handleUnmarkAsSolution(answer.id)}>
                Unmark as Solution
              </DropdownItem>
            ) : (
              <DropdownItem key="markAsSolution" onClick={() => handleMarkAsSolution(answer.id)}>
                Mark as Solution
              </DropdownItem>
            )}
            {/* Option to delete the answer */}
            <DropdownItem key="delete" color="error" onClick={() => handleDeleteAnswer(answer.id)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Card>
  );
};

export default Answer;
