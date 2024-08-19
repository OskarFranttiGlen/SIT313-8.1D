import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth'; // Import Firebase auth to get current user
import './forms.css';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await addDoc(collection(db, 'questions'), {
        title,
        problem,
        createdAt: new Date(),
        userId: user ? user.uid : 'anonymous', // Store user ID or 'anonymous' if no user is logged in
        userEmail: user ? user.email : 'anonymous', // Optionally store user email
      });
      setSuccess(true);
      setTitle('');
      setProblem('');
    } catch (err) {
      console.error("Error adding document:", err);
      setError('Failed to submit the question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Start your question with how, what, why, etc."
            required
          />
        </div>
        <div>
          <label htmlFor="problem">Describe your problem</label>
          <textarea
            id="problem"
            rows="5"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your problem in detail"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {success && <p>Your question has been submitted successfully!</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default QuestionForm;
