import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

//App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4qR7UTi6d8lT351lAlM-LrtZKhdKNmJ4",
  authDomain: "devdeakin-c47f2.firebaseapp.com",
  projectId: "devdeakin-c47f2",
  storageBucket: "devdeakin-c47f2.appspot.com",
  messagingSenderId: "536243932552",
  appId: "1:536243932552:web:5a62827346784c24d37e3d",
  measurementId: "G-4QGRQL7LXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize Firebase Storage

export { auth, analytics, db, storage };
