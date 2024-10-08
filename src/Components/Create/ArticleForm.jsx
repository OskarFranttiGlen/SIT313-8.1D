import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig'; 
import { getAuth } from 'firebase/auth'; 
import { Input, Textarea, Button, Card, Spacer, Chip } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown'; 

const initialTags = []; // Initial tags state

const ArticleForm = () => {
  // State hooks to manage form data and UI states
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState(initialTags);
  const [tagInput, setTagInput] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth(); // Get the current user
  const user = auth.currentUser;

  // Handle image file selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      let imageUrl = '';

      // Upload image to Firebase Storage
      if (image) {
        const imageRef = ref(storage, `articles/${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
        setImageUrl(imageUrl);
      }

      // Add article document to Firestore
      await addDoc(collection(db, 'articles'), {
        title,
        abstract,
        articleText,
        tags, // Save tags as an array
        imageUrl, // Store the image URL
        createdAt: new Date(),
        userId: user ? user.uid : 'anonymous', // Store user ID or 'anonymous' if no user is logged in
        userEmail: user ? user.email : 'anonymous', // Optionally store user email
      });

      // Reset form state on successful submission
      setSuccess(true);
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags([]);
      setTagInput('');
      setImage(null);
      setImageUrl('');
    } catch (err) {
      console.error("Error adding document:", err);
      setError('Failed to submit the article. Please try again.');
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
        <h2 className="text-2xl font-bold mb-4">Submit an Article</h2>
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className="mb-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isRequired
              type="input"
              label="Title"
            />
          </div>
          {/* Abstract input field */}
          <div className="mb-4">
            <Textarea
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              isRequired
              label="Abstract"
            />
          </div>
          {/* Article text input field */}
          <div className="mb-4">
            <Textarea
              rows={10}
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              isRequired
              type="input"
              label="Article Text"
            />
          </div>
          {/* Preview of the article using ReactMarkdown */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Preview of Markdown</label>
            <Card className="p-4 bg-gray-100 rounded-lg">
              <ReactMarkdown>{articleText}</ReactMarkdown>
            </Card>
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
                label="Enter tags"
                value={tagInput}
                onChange={handleTagInput}
                onKeyDown={handleAddTag}
              />
            </div>
          </div>
          {/* Image upload field */}
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 text-gray-700 font-semibold">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="mb-4 w-full"
            />
          </div>
          {/* Submit button */}
          <Button type="submit" disabled={loading} auto className="w-full">
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Spacer y={1} />
          {/* Success message */}
          {success && <p className="text-green-500">Your article has been submitted successfully!</p>}
          {/* Error message */}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default ArticleForm;
