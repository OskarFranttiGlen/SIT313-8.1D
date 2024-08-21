import React from 'react';
import { Input } from '@nextui-org/react';

const Filters = ({ filter, handleFilterChange }) => {
  return (
    // Container div for the filter inputs, styled with padding, background color, rounded corners, shadow, and margin-bottom
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4">
      
      {/* Input field for filtering by title */}
      <Input
        clearable
        underlined
        placeholder="Filter by title" // Placeholder text for the input field
        name="title" // The name attribute identifies the filter type
        value={filter.title} // The current value of the title filter
        onChange={handleFilterChange} // Function to handle changes to the filter input
        className="flex-1 mx-2" // Flex properties and margin for spacing
      />

      {/* Input field for filtering by tag */}
      <Input
        clearable
        underlined
        placeholder="Filter by tag" // Placeholder text for the input field
        name="tag" // The name attribute identifies the filter type
        value={filter.tag} // The current value of the tag filter
        onChange={handleFilterChange} // Function to handle changes to the filter input
        className="flex-1 mx-2" // Flex properties and margin for spacing
      />

      {/* Input field for filtering by date */}
      <Input
        clearable
        underlined
        type="date" // The input type is set to 'date' for date filtering
        name="date" // The name attribute identifies the filter type
        value={filter.date} // The current value of the date filter
        onChange={handleFilterChange} // Function to handle changes to the filter input
        className="flex-1 mx-2" // Flex properties and margin for spacing
      />
    </div>
  );
};

export default Filters;
