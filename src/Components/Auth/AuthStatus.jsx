import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 

const AuthStatus = () => {
  const [user, setUser] = useState(null); // State to hold the current user

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser); // Update the user state when the auth state changes
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    // Display the user's email if logged in, otherwise show "Not logged in"
    <div>
      {user ? `Logged in as ${user.email}` : 'Not logged in'}
    </div>
  );
};

export default AuthStatus;
