// src/Components/AuthStatus.jsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Ensure this path is correct

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? `Logged in as ${user.email}` : 'Not logged in'}
    </div>
  );
};

export default AuthStatus;
    