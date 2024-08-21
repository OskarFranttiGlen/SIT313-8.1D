import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig'; // Ensure you import your Firebase config
import { getAuth } from 'firebase/auth'; // Import Firebase auth to get current user
import { Input, Textarea, Button, Card, Spacer } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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
        tags: tags.split(',').map(tag => tag.trim()), // Convert tags string to array
        imageUrl, // Store the image URL
        createdAt: new Date(),
        userId: user ? user.uid : 'anonymous', // Store user ID or 'anonymous' if no user is logged in
        userEmail: user ? user.email : 'anonymous', // Optionally store user email
      });

      setSuccess(true);
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImage(null);
      setImageUrl('');
    } catch (err) {
      console.error("Error adding document:", err);
      setError('Failed to submit the article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <Card className="p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4">Submit an Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              clearable
              bordered
              labelPlaceholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <Textarea
              bordered
              labelPlaceholder="Abstract"
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              fullWidth
              required
              type="text"
              placeholder="Abstract"
            />
          </div>
          <div className="mb-4">
            <Textarea
              bordered
              labelPlaceholder="Article Text"
              rows={10}
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              fullWidth
              required
              type="text"
              placeholder="Article Text"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold">Preview</label>
            <Card className="p-4 bg-gray-100 rounded-lg">
              <ReactMarkdown>{articleText}</ReactMarkdown>
            </Card>
          </div>
          <div className="mb-4">
            <Input
              clearable
              bordered
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              fullWidth
              type="text"
              placeholder="Tags (comma separated)"
            />
          </div>
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
          <Button type="submit" disabled={loading} auto className="w-full">
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Spacer y={1} />
          {success && <p className="text-green-500">Your article has been submitted successfully!</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default ArticleForm;
