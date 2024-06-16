import { create } from 'zustand';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const useStore = create((set) => ({
  user: null, // Initial state for user
  userData: null, // Initial state for user data

  // Function to fetch user data
  fetchUserData: async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        set({ user: authUser });
        const userId = authUser.uid;
        const userCollectionRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userCollectionRef);
        if (userDoc.exists()) {
          set({ userData: userDoc.data() });
        } else {
          set({ userData: null });
        }
      } else {
        set({ user: null, userData: null });
      }
    });
  }
}));

