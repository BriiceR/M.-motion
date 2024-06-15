// src/store/useStore.ts
import create from 'zustand';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// Define the types for your store
interface StoreState {
  user: User | null;
  userData: any | null;
  fetchUserData: () => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  userData: null,

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

