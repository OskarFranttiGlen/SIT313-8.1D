import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { Button, Card, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import StatusChip from './StatusChip'; 
import AnswerList from './AnswerList'; 
import AnswerForm from './AnswerForm'; 
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Chip } from '@nextui-org/react';

const QuestionCard = ({ question, selectedQuestion, handleExpand, handleDelete }) => {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [newAnswerCode, setNewAnswerCode] = useState('');
  const [isAttachingCode, setIsAttachingCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(question.status || 'Open');
  const auth = getAuth();
  const user = auth.currentUser;

  // Status options and corresponding colors for the status chip
  const statusOptions = ['Open', 'Answered', 'In Progress', 'Closed'];
  const statusColors = {
    Open: 'primary',
    Answered: 'success',
    'In Progress': 'warning',
    Closed: 'danger',
  };

  // Fetch answers from Firestore when the question is selected
  useEffect(() => {
    const fetchAnswers = async () => {
      if (selectedQuestion?.id === question.id) {
        const q = query(collection(db, 'answers'), where('questionId', '==', question.id));
        const querySnapshot = await getDocs(q);
        let answersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort answers so that the solution (if any) is at the top
        answersData = answersData.sort((a, b) => b.isSolution - a.isSolution);

        setAnswers(answersData);
      }
    };

    fetchAnswers();
  }, [selectedQuestion, question.id]);

  // Handle submitting a new answer
  const handleAnswerSubmit = async (e) => {
    e.stopPropagation();
    if (newAnswer.trim()) {
      setIsLoading(true);
      try {
        const newAnswerRef = await addDoc(collection(db, 'answers'), {
          answer: newAnswer.trim(),
          questionId: question.id,
          userId: user ? user.uid : 'anonymous',
          userEmail: user ? user.email : 'anonymous',
          createdAt: serverTimestamp(),
          isSolution: false,
        });

        // If code is attached, update the document with the code
        if (isAttachingCode && newAnswerCode.trim()) {
          await updateDoc(doc(db, 'answers', newAnswerRef.id), {
            code: newAnswerCode.trim(),
          });
        }

        // Refetch and sort answers
        const q = query(collection(db, 'answers'), where('questionId', '==', question.id));
        const querySnapshot = await getDocs(q);
        let answersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort answers so that the solution (if any) is at the top
        answersData = answersData.sort((a, b) => b.isSolution - a.isSolution);

        setAnswers(answersData);

        // Reset form fields after successful submission
        setNewAnswer('');
        setNewAnswerCode('');
        setIsAttachingCode(false);
      } catch (err) {
        console.error("Error adding answer:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle card click to expand or collapse details
  const handleCardClick = () => {
    handleExpand(question);
  };

  // Stop event propagation to prevent unwanted triggering of parent click events
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Handle status change for the question
  const handleStatusChange = async (newStatus) => {
    try {
      const questionRef = doc(db, 'questions', question.id);
      await updateDoc(questionRef, {
        status: newStatus,
      });
      setCurrentStatus(newStatus); 
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Handle marking an answer as the solution
  const handleMarkAsSolution = async (answerId) => {
    try {
      await updateDoc(doc(db, 'answers', answerId), {
        isSolution: true,
      });

      // Update the local answers array to reflect the change
      const updatedAnswers = answers.map(answer =>
        answer.id === answerId ? { ...answer, isSolution: true } : { ...answer, isSolution: false }
      );

      // Sort answers so that the solution is at the top
      updatedAnswers.sort((a, b) => b.isSolution - a.isSolution);

      setAnswers(updatedAnswers);
    } catch (err) {
      console.error("Error marking as solution:", err);
    }
  };

  // Handle unmarking an answer as the solution
  const handleUnmarkAsSolution = async (answerId) => {
    try {
      await updateDoc(doc(db, 'answers', answerId), {
        isSolution: false,
      });

      // Update the local answers array to reflect the change
      const updatedAnswers = answers.map(answer =>
        answer.id === answerId ? { ...answer, isSolution: false } : answer
      );

      // Sort answers so that the solution (if any) is at the top
      updatedAnswers.sort((a, b) => b.isSolution - a.isSolution);

      setAnswers(updatedAnswers);
    } catch (err) {
      console.error("Error unmarking as solution:", err);
    }
  };

  // Handle deleting an answer
  const handleDeleteAnswer = async (answerId) => {
    try {
      await deleteDoc(doc(db, 'answers', answerId));
      setAnswers(answers.filter(answer => answer.id !== answerId));
    } catch (err) {
      console.error("Error deleting answer:", err);
    }
  };

  return (
    // List item for each question card, with hover effects and click event to expand details
    <li onClick={handleCardClick} className="hover:shadow-lg transition-shadow cursor-pointer mt-3">
      <Card 
        className={`${selectedQuestion?.id === question.id ? 'mb-0 rounded-b-none' : ''}`}
        css={{
          borderBottomLeftRadius: selectedQuestion?.id === question.id ? '0' : '',
          borderBottomRightRadius: selectedQuestion?.id === question.id ? '0' : '',
        }}
      >
        {/* Question title and status chip */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold ml-3 pt-3">{question.title}</h3>
          <StatusChip status={currentStatus} statusColors={statusColors} />
        </div>
        {/* Display tags and user information */}
        <div className="ml-3 mt-2">
          <div className="flex flex-wrap gap-2">
            {question.tags?.map((tag, index) => (
              <Chip key={index} size="sm" color="secondary" variant="flat">
                {tag}
              </Chip>
            ))}
          </div>
          <User 
            className="mt-4"  // Adds margin-top to create space between the chips and User component
            name={question.userEmail || 'anonymous'}
            description={`Posted on: ${new Date(question.createdAt.seconds * 1000).toLocaleString()}`}
            size="sm"
            src={user?.photoURL || undefined} // Optional: use user's profile picture if available
          />
        </div>
      </Card>

      {/* Render additional details if the question is selected */}
      {selectedQuestion?.id === question.id && (
        <Card 
          className="p-4 pt-0 rounded-t-none"
          css={{
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
          }}
        >
          {/* Problem description and code display */}
          <p className="ml-3 mt-3 mb-3">{question.problem}</p>
          <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden ml-3 mr-3">
            <CodeMirror
              value={question.code || ''}
              options={{
                mode: 'javascript',
                theme: 'dracula',
                readOnly: true, // Ensure the code is read-only
                lineNumbers: true,
              }}
            />
          </div>

          {/* Answer list and form for adding new answers */}
          <AnswerList 
            answers={answers}
            handleMarkAsSolution={handleMarkAsSolution}
            handleUnmarkAsSolution={handleUnmarkAsSolution}
            handleDeleteAnswer={handleDeleteAnswer}
          />
          <AnswerForm 
            newAnswer={newAnswer}
            setNewAnswer={setNewAnswer}
            isAttachingCode={isAttachingCode}
            setIsAttachingCode={setIsAttachingCode}
            newAnswerCode={newAnswerCode}
            setNewAnswerCode={setNewAnswerCode}
            handleAnswerSubmit={handleAnswerSubmit}
            isLoading={isLoading}
            stopPropagation={stopPropagation}
            questionStatus={currentStatus} // Pass current status to the form
          />

          {/* Dropdown for changing the status of the question and a delete button */}
          <div className="flex items-center mt-4 ml-3">
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="ghost">
                  Change Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Change Status">
                {statusOptions.map((status) => (
                  <DropdownItem key={status} onClick={() => handleStatusChange(status)}>
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button 
              className="ml-3 mr-3" 
              color="danger" 
              variant="ghost" 
              auto 
              onClick={(e) => { e.stopPropagation(); handleDelete(question.id); }}
              css={{ alignSelf: 'center' }}  // Center the button vertically
            >
              Delete
            </Button>
          </div>
        </Card>
      )}
    </li>
  );
};

export default QuestionCard;
