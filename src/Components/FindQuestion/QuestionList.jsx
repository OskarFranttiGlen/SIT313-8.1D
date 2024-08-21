import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuestionCard from './QuestionCard';

const QuestionList = ({ filteredQuestions, selectedQuestion, handleExpand, handleDelete, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="question-list"
          >
            {filteredQuestions.map((question, index) => (
              <Draggable 
                key={question.id} 
                draggableId={question.id} 
                index={index}
                isDragDisabled={selectedQuestion?.id === question.id} // Disable drag if question is expanded
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <QuestionCard
                      question={question}
                      selectedQuestion={selectedQuestion}
                      handleExpand={handleExpand}
                      handleDelete={handleDelete}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionList;
