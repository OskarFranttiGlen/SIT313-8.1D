import React from 'react';
import { Card, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from '@nextui-org/react';
import { Controlled as CodeMirror } from 'react-codemirror2';

const Answer = ({ answer, handleMarkAsSolution, handleUnmarkAsSolution, handleDeleteAnswer }) => {
  return (
    <Card key={answer.id} className="p-3 mb-2 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
        {answer.isSolution && (
        <Chip size="sm" color="success" variant="flat" className="mt-2 mb-2">
          Solution
        </Chip>
      )}
          <p>{answer.answer}</p>
          {answer.code && (
            <div className="border border-gray-300 rounded-lg overflow-hidden mt-2">
              <CodeMirror
                value={answer.code}
                options={{
                  mode: 'javascript',
                  theme: 'dracula',
                  lineNumbers: true,
                  readOnly: true,
                }}
              />
            </div>
          )}
          <small className="text-gray-500">Answered by {answer.userEmail || 'anonymous'} on {new Date(answer.createdAt.seconds * 1000).toLocaleString()}</small>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button auto variant="ghost" color="primary">
              Options
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Answer Options">
            {answer.isSolution ? (
              <DropdownItem key="unmarkAsSolution" onClick={() => handleUnmarkAsSolution(answer.id)}>
                Unmark as Solution
              </DropdownItem>
            ) : (
              <DropdownItem key="markAsSolution" onClick={() => handleMarkAsSolution(answer.id)}>
                Mark as Solution
              </DropdownItem>
            )}
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
