import React, { useState } from 'react';
import { Input, Button, Chip } from '@nextui-org/react';

const Filters = ({ filter, handleFilterChange, applyFilters }) => {
  // State for managing the tags input and selected tags
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  // Handle tag input change
  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  // Handle adding a new tag
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      e.preventDefault();
      setTags(prevTags => [...prevTags, tagInput.trim()]);
      setTagInput('');
      handleFilterChange({ target: { name: 'tag', value: tagInput.trim() } });
    }
  };

  // Handle removing a tag
  const handleCloseTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    handleFilterChange({ target: { name: 'tag', value: '' } });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <Input
        name="title"
        label="Filter by title"
        value={filter.title}
        onChange={handleFilterChange}
        className="flex-1 mx-2 mb-2 md:mb-0"
      />

      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <Chip
            key={index}
            onClose={() => handleCloseTag(tag)}
            color="secondary"
            variant="flat"
          >
            {tag}
          </Chip>
        ))}
        <Input
          type="text"
          label="Enter tags"
          value={tagInput}
          onChange={handleTagInput}
          onKeyDown={handleAddTag}
          className="flex-1 mx-2 mb-2 md:mb-0"
        />
      </div>

      <Input
        name="date"
        type="date"
        label="Date"
        value={filter.date}
        onChange={handleFilterChange}
        className="flex-1 mx-2 mb-2 md:mb-0"
      />

      <Button onClick={applyFilters} auto className="mx-2 mt-2 md:mt-0">
        Apply Filters
      </Button>
    </div>
  );
};

export default Filters;
