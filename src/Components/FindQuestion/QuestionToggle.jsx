import React from 'react';
import { Button } from '@nextui-org/react';

const QuestionToggle = ({ selectedView, handleViewChange }) => {
  return (
    // Container div for the toggle buttons, styled with margin-bottom and horizontal spacing
    <div className="mb-6 flex space-x-4">
      {/* Button for switching to the 'all questions' view */}
      <Button
        flat={selectedView === 'all'} // Set button to flat style if 'all' view is selected
        onClick={() => handleViewChange('all')} // Trigger view change to 'all' on click
        color={selectedView === 'all' ? 'primary' : 'default'} // Set color to primary if selected, default otherwise
      >
        Find Questions
      </Button>

      {/* Button for switching to the 'my questions' view */}
      <Button
        flat={selectedView === 'mine'} // Set button to flat style if 'mine' view is selected
        onClick={() => handleViewChange('mine')} // Trigger view change to 'mine' on click
        color={selectedView === 'mine' ? 'primary' : 'default'} // Set color to primary if selected, default otherwise
      >
        My Questions
      </Button>
    </div>
  );
};

export default QuestionToggle;
