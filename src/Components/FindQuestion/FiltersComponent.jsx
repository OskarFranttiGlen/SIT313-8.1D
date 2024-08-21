import React from 'react';
import { Input } from '@nextui-org/react';

const Filters = ({ filter, handleFilterChange }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <Input
        clearable
        underlined
        placeholder="Filter by title"
        name="title"
        value={filter.title}
        onChange={handleFilterChange}
        className="flex-1 mx-2"
      />
      <Input
        clearable
        underlined
        placeholder="Filter by tag"
        name="tag"
        value={filter.tag}
        onChange={handleFilterChange}
        className="flex-1 mx-2"
      />
      <Input
        clearable
        underlined
        type="date"
        name="date"
        value={filter.date}
        onChange={handleFilterChange}
        className="flex-1 mx-2"
      />
    </div>
  );
};

export default Filters;
