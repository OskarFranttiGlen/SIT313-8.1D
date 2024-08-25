import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; 
import Filters from '../Components/FindQuestion/FiltersComponent'; 
import QuestionList from '../Components/FindQuestion/QuestionList'; 
import QuestionToggle from '../Components/FindQuestion/QuestionToggle'; 
import { Spinner } from '@nextui-org/react'; 
import { onAuthStateChanged } from 'firebase/auth'; 

const FindQuestion = () => {
  const [questions, setQuestions] = useState([]); 
  const [filteredQuestions, setFilteredQuestions] = useState([]); 
  const [filter, setFilter] = useState({ title: '', tag: '', date: '' }); 
  const [selectedQuestion, setSelectedQuestion] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [selectedView, setSelectedView] = useState('all'); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    document.title = "Find Question";
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let queryRef = collection(db, 'questions');
        
        if (selectedView === 'mine' && user) {
          queryRef = query(queryRef, where('userEmail', '==', user.email)); // My Questions
        } else if (selectedView === 'all' && user) {
          queryRef = query(queryRef, where('userEmail', '!=', user.email)); // Find Questions (Others)
        }

        const querySnapshot = await getDocs(queryRef);
        const questionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched questions:', questionsData);
        setQuestions(questionsData);
        setFilteredQuestions(questionsData); // Initialize filteredQuestions with the fetched data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError('Failed to load questions. Please try again.');
        setLoading(false);
      }
    };

    if (user) {
      fetchQuestions();
    }
  }, [selectedView, user]); // Fetch questions when selectedView or user changes

  const applyFilters = useCallback(() => {
    console.log('Applying filters with:', filter);
    
    let filtered = [...questions];

    if (filter.title) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(filter.title.toLowerCase()) // Partial match for title
      );
    }

    if (filter.tag) {
      filtered = filtered.filter(q =>
        Array.isArray(q.tags) && q.tags.includes(filter.tag)
      );
    }

    if (filter.date) {
      filtered = filtered.filter(q => {
        if (q.createdAt && q.createdAt.seconds) {
          const questionDate = new Date(q.createdAt.seconds * 1000);
          const localQuestionDate = questionDate.toLocaleDateString('en-CA');
          return localQuestionDate === filter.date;
        }
        return false;
      });
    }

    console.log('Filtered questions:', filtered);
    setFilteredQuestions(filtered);
  }, [questions, filter]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      const updatedQuestions = questions.filter(question => question.id !== id);
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);
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
    console.log('Filter change:', { name, value });
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(filteredQuestions);
    const [movedQuestion] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedQuestion);

    setFilteredQuestions(reorderedQuestions);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="questions-container p-6">
      <h2 className="text-2xl font-bold mb-4">Find Question</h2>
      <QuestionToggle selectedView={selectedView} handleViewChange={handleViewChange} />
      <Filters 
        filter={filter} 
        handleFilterChange={handleFilterChange} 
        applyFilters={applyFilters} // Pass applyFilters as a prop
      />
      {filteredQuestions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <QuestionList
          filteredQuestions={filteredQuestions}
          selectedQuestion={selectedQuestion}
          handleExpand={handleExpand}
          handleDelete={handleDelete}
          onDragEnd={onDragEnd}
        />
      )}
    </div>
  );
};

export default FindQuestion;
