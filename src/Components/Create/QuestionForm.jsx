import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth'; 
import { Controlled as CodeMirror } from 'react-codemirror2'; 
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { Button, Card, Spacer, Chip, CircularProgress, Input, Textarea } from '@nextui-org/react';

const initialTags = []; // Initial tags state

const QuestionForm = () => {
  // State hooks to manage form data and UI states
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState(initialTags);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth(); // Get the current user
  const user = auth.currentUser;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await addDoc(collection(db, 'questions'), {
        title,
        problem,
        code,
        tags,
        status: 'Open', // Set the initial status to 'Open'
        createdAt: new Date(),
        userId: user ? user.uid : 'anonymous', // Store user ID or 'anonymous' if no user is logged in
        userEmail: user ? user.email : 'anonymous', // Optionally store user email
      });
      setSuccess(true);
      setTitle('');
      setProblem('');
      setCode('');
      setTags([]);
      setTagInput('');
    } catch (err) {
      console.error("Error adding document:", err);
      setError('Failed to submit the question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  // Handle removing a tag
  const handleCloseTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    // Outer container for the form, with centered alignment and background
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <Card className="p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mt-10">
        {/* Form title */}
        <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Problem description textarea */}
          <div className="mb-4">
            <Textarea
              placeholder="Describe your problem"
              rows={5}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
            />
          </div>
          {/* Code input field with CodeMirror */}
          <div className="mb-4">
            <label htmlFor="code" className="block mb-2 text-gray-700 font-semibold">Code</label>
            <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
              <CodeMirror
                value={code}
                options={{
                  mode: 'javascript', // Set code mode to JavaScript
                  theme: 'material', // Set CodeMirror theme
                  lineNumbers: true, // Display line numbers
                }}
                onBeforeChange={(editor, data, value) => {
                  setCode(value);
                }}
                className="rounded-lg"
              />
            </div>
          </div>
          {/* Tags input and display */}
          <div className="mb-4">
            <label htmlFor="tags" className="block mb-2 text-gray-700 font-semibold">Tags</label>
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
                placeholder="Enter tags"
                value={tagInput}
                onChange={handleTagInput}
                onKeyDown={handleAddTag}
              />
            </div>
          </div>
          {/* Submit button with loading indicator */}
          <Button type="submit" disabled={loading} color="primary" variant="solid">
            {loading ? <CircularProgress size="sm" /> : 'Submit'}
          </Button>
          <Spacer y={1} />
          {/* Success message */}
          {success && <p className="text-green-500">Your question has been submitted successfully!</p>}
          {/* Error message */}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default QuestionForm;
