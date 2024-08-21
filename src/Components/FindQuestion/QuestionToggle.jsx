import React from 'react';
import { Button } from '@nextui-org/react';

const QuestionToggle = ({ selectedView, handleViewChange }) => {
  return (
    <div className="mb-6 flex space-x-4">
      <Button
        flat={selectedView === 'all'}
        onClick={() => handleViewChange('all')}
        color={selectedView === 'all' ? 'primary' : 'default'}
      >
        Find Questions
      </Button>
      <Button
        flat={selectedView === 'mine'}
        onClick={() => handleViewChange('mine')}
        color={selectedView === 'mine' ? 'primary' : 'default'}
      >
        My Questions
      </Button>
    </div>
  );
};

export default QuestionToggle;
