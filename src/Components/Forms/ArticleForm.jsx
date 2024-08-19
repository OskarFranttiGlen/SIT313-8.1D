import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig'; // Ensure you import your Firebase config
import { getAuth } from 'firebase/auth'; // Import Firebase auth to get current user
import './forms.css';

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
    <div className="form-container">
      <h2>Submit an Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            required
          />
        </div>
        <div>
          <label htmlFor="abstract">Abstract</label>
          <textarea
            id="abstract"
            rows="3"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Enter a 1-paragraph abstract"
            required
          />
        </div>
        <div>
          <label htmlFor="articleText">Article Text</label>
          <textarea
            id="articleText"
            rows="5"
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
            placeholder="Enter the full article text"
            required
          />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {success && <p>Your article has been submitted successfully!</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ArticleForm;
