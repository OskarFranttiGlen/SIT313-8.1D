import React from 'react';
import Answer from './AnswerComponent'; 

const AnswerList = ({ answers, handleMarkAsSolution, handleUnmarkAsSolution, handleDeleteAnswer }) => {
  return (
    // Container div for the answer list, with padding and rounded corners
    <div className="mt-4 p-3 rounded-lg">
      {/* Title for the answers section */}
      <h4 className="font-semibold">Answers:</h4>
      
      {/* Check if there are any answers */}
      {answers.length > 0 ? (
        // Map over the answers array to render each Answer component
        answers.map(answer => (
          <Answer 
            key={answer.id} // Unique key for each answer component
            answer={answer} 
            handleMarkAsSolution={handleMarkAsSolution} // Function to mark an answer as the solution
            handleUnmarkAsSolution={handleUnmarkAsSolution} // Function to unmark an answer as the solution
            handleDeleteAnswer={handleDeleteAnswer} // Function to delete an answer
          />
        ))
      ) : (
        // Message to display if there are no answers yet
        <p>No answers yet.</p>
      )}
    </div>
  );
};

export default AnswerList;
