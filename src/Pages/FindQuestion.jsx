import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this path correctly points to your Firebase config
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './FindQuestion.css';

const FindQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState({ title: '', tag: '', date: '' });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'questions'));
        const questionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionsData);
        setFilteredQuestions(questionsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError('Failed to load questions. Please try again.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter, questions]);

  const applyFilters = () => {
    let filtered = [...questions];
  
    if (filter.title) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(filter.title.toLowerCase())
      );
    }
  
    if (filter.tag) {
      filtered = filtered.filter(q =>
        q.tags && q.tags.includes(filter.tag)
      );
    }
  
    if (filter.date) {
      filtered = filtered.filter(q => {
        const questionDate = new Date(q.createdAt.seconds * 1000);
        const localQuestionDate = questionDate.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
        return localQuestionDate === filter.date;
      });
    }
  
    setFilteredQuestions(filtered);
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      setQuestions(questions.filter(question => question.id !== id));
    } catch (err) {
      console.error("Error deleting document:", err);
      setError('Failed to delete the question. Please try again.');
    }
  };

  const handleExpand = (question) => {
    setSelectedQuestion(selectedQuestion?.id === question.id ? null : question);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(filteredQuestions);
    const [movedQuestion] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedQuestion);

    setFilteredQuestions(reorderedQuestions);
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="questions-container">
      <h2>All Questions</h2>

      <div className="filters">
        <input
          type="text"
          name="title"
          placeholder="Filter by title"
          value={filter.title}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="tag"
          placeholder="Filter by tag"
          value={filter.tag}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Filter by date"
          value={filter.date}
          onChange={handleFilterChange}
        />
      </div>

      {filteredQuestions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="question-list"
              >
                {filteredQuestions.map((question, index) => {
                  const title = question.title || 'Untitled';
                  const problem = question.problem || 'No description provided';
                  const tags = question.tags || [];
                  const createdAt = question.createdAt
                    ? new Date(question.createdAt.seconds * 1000).toLocaleString()
                    : 'Unknown date';

                  return (
                    <Draggable key={question.id} draggableId={question.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="question-card"
                        >
                          <div className="question-summary" onClick={() => handleExpand(question)}>
                            <h3>{title}</h3>
                            <p>{problem}</p>
                            <span className="tags">{tags.join(', ')}</span>
                            <small>Posted on: {createdAt}</small>
                          </div>
                          {selectedQuestion?.id === question.id && (
                            <div className="question-details">
                              <p>{problem}</p>
                              <button onClick={() => handleDelete(question.id)}>Delete</button>
                            </div>
                          )}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default FindQuestion;
