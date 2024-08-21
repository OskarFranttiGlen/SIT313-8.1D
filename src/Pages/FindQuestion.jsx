import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, deleteDoc, query, where, notEqual } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; 
import Filters from '../Components/FindQuestion/FiltersComponent'; 
import QuestionList from '../Components/FindQuestion/QuestionList'; 
import QuestionToggle from '../Components/FindQuestion/QuestionToggle'; 
import { Spinner } from '@nextui-org/react'; 
import { onAuthStateChanged } from 'firebase/auth'; 

const FindQuestion = () => {
  const [questions, setQuestions] = useState([]); // State to hold all questions fetched from Firestore
  const [filteredQuestions, setFilteredQuestions] = useState([]); // State to hold filtered questions based on filters
  const [filter, setFilter] = useState({ title: '', tag: '', date: '' }); // State to hold filter criteria
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to hold the currently selected question for expansion
  const [loading, setLoading] = useState(true); // State to manage loading spinner visibility
  const [error, setError] = useState(''); // State to hold any error messages
  const [selectedView, setSelectedView] = useState('all'); // State to toggle between viewing all questions or only the user's questions
  const [user, setUser] = useState(null); // State to track the current logged-in user

  // Effect to set the page title and track user authentication state
  useEffect(() => {
    document.title = "Find Question";

    // Track user authentication state
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser); // Update the user state when authentication state changes
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, []);

  // Effect to fetch questions from Firestore based on selected view and user authentication state
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let queryRef = collection(db, 'questions'); // Reference to the 'questions' collection in Firestore

        if (selectedView === 'mine' && user) {
          // Fetch only questions created by the logged-in user
          queryRef = query(queryRef, where('userEmail', '==', user.email));
        } else if (selectedView === 'all' && user) {
          // Fetch all questions except those created by the logged-in user
          queryRef = query(queryRef, where('userEmail', '!=', user.email));
        }

        const querySnapshot = await getDocs(queryRef); // Fetch documents based on the query
        const questionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionsData); // Set the questions state with the fetched data
        setFilteredQuestions(questionsData); // Initialize filteredQuestions with the fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching questions:", err); // Log any errors
        setError('Failed to load questions. Please try again.'); // Set error message if fetching fails
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    if (user) {
      fetchQuestions(); // Fetch questions only if user is authenticated
    }
  }, [selectedView, user]); // Dependencies to refetch questions when selected view or user changes

  // Function to apply filters to the list of questions
  const applyFilters = useCallback(() => {
    let filtered = [...questions]; // Create a copy of the questions array

    if (filter.title) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(filter.title.toLowerCase()) // Filter by title
      );
    }

    if (filter.tag) {
      filtered = filtered.filter(q =>
        q.tags && q.tags.includes(filter.tag) // Filter by tag
      );
    }

    if (filter.date) {
      filtered = filtered.filter(q => {
        const questionDate = new Date(q.createdAt.seconds * 1000); // Convert Firestore timestamp to Date
        const localQuestionDate = questionDate.toLocaleDateString('en-CA'); // Format date to YYYY-MM-DD
        return localQuestionDate === filter.date; // Filter by date
      });
    }

    setFilteredQuestions(filtered); // Update the filteredQuestions state with the filtered data
  }, [questions, filter]); // Dependencies to reapply filters when questions or filter criteria change

  // Effect to apply filters when the filter state or questions array changes
  useEffect(() => {
    applyFilters();
  }, [filter, questions, applyFilters]); // Dependencies to reapply filters

  // Function to handle deletion of a question
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id)); // Delete the document from Firestore
      const updatedQuestions = questions.filter(question => question.id !== id); // Remove the deleted question from the list
      setQuestions(updatedQuestions); // Update the questions state
      setFilteredQuestions(updatedQuestions); // Update the filteredQuestions state
      applyFilters(); // Reapply filters after deletion
    } catch (err) {
      console.error("Error deleting document:", err); // Log any errors during deletion
      setError('Failed to delete the question. Please try again.'); // Set error message if deletion fails
    }
  };

  // Function to handle expanding/collapsing a question
  const handleExpand = (question) => {
    setSelectedQuestion(selectedQuestion?.id === question.id ? null : question); // Toggle the selected question
  };

  // Function to handle changes in the filter input fields
  const handleFilterChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the input event
    setFilter(prevFilter => ({ ...prevFilter, [name]: value })); // Update the filter state
  };

  // Function to handle the drag-and-drop reordering of questions
  const onDragEnd = (result) => {
    if (!result.destination) return; // Exit if there is no destination (item was not dropped in a valid location)

    const reorderedQuestions = Array.from(filteredQuestions); // Create a copy of the filteredQuestions array
    const [movedQuestion] = reorderedQuestions.splice(result.source.index, 1); // Remove the dragged question
    reorderedQuestions.splice(result.destination.index, 0, movedQuestion); // Insert the dragged question at the new position

    setFilteredQuestions(reorderedQuestions); // Update the filteredQuestions state with the new order
  };

  // Function to handle view change between 'all' and 'mine'
  const handleViewChange = (view) => {
    setSelectedView(view); // Update the selectedView state
  };

  // Show a loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="primary" />
      </div>
    );
  }

  // Show an error message if there was an error fetching data
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="questions-container p-6">
      <h2 className="text-2xl font-bold mb-4">Find Question</h2>
      <QuestionToggle selectedView={selectedView} handleViewChange={handleViewChange} />
      <Filters filter={filter} handleFilterChange={handleFilterChange} />
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
