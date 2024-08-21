import React from 'react';
import Answer from './AnswerComponent'; // Ensure this import is correct

const AnswerList = ({ answers, handleMarkAsSolution, handleUnmarkAsSolution, handleDeleteAnswer }) => {
  return (
    <div className="mt-4 p-3 rounded-lg">
      <h4 className="font-semibold">Answers:</h4>
      {answers.length > 0 ? (
        answers.map(answer => (
          <Answer 
            key={answer.id} 
            answer={answer} 
            handleMarkAsSolution={handleMarkAsSolution}
            handleUnmarkAsSolution={handleUnmarkAsSolution}
            handleDeleteAnswer={handleDeleteAnswer}
          />
        ))
      ) : (
        <p>No answers yet.</p>
      )}
    </div>
  );
};

export default AnswerList;
