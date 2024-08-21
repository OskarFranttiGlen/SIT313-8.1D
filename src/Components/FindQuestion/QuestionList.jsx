import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuestionCard from './QuestionCard'; 

const QuestionList = ({ filteredQuestions, selectedQuestion, handleExpand, handleDelete, onDragEnd }) => {
  return (
    // DragDropContext is the top-level container that manages the drag-and-drop functionality
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Droppable area where draggable items can be placed */}
      <Droppable droppableId="questions">
        {(provided) => (
          // The ul element acts as the droppable container for the question list
          <ul
            {...provided.droppableProps} // Spread props to apply droppable behavior
            ref={provided.innerRef} // Attach ref to enable drag-and-drop
            className="question-list" // Add your custom styles here
          >
            {/* Map over the filtered questions and create a draggable item for each */}
            {filteredQuestions.map((question, index) => (
              <Draggable 
                key={question.id} // Unique key for each question
                draggableId={question.id} // Set draggable ID to the question ID
                index={index} // Index of the item within the list
                isDragDisabled={selectedQuestion?.id === question.id} // Disable drag if the question is expanded
              >
                {(provided) => (
                  // The li element acts as the draggable container for each question
                  <li
                    ref={provided.innerRef} // Attach ref to enable drag-and-drop
                    {...provided.draggableProps} // Spread props to apply draggable behavior
                    {...provided.dragHandleProps} // Spread props to apply drag handle behavior
                  >
                    {/* Render the QuestionCard component */}
                    <QuestionCard
                      question={question} // Pass the question data to the QuestionCard component
                      selectedQuestion={selectedQuestion} // Pass the selected question to highlight or expand
                      handleExpand={handleExpand} // Function to handle expanding the question
                      handleDelete={handleDelete} // Function to handle deleting the question
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {/* Placeholder element to ensure proper spacing during drag-and-drop */}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionList;
