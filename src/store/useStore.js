import { create } from 'zustand';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import CryptoJS from 'crypto-js';

// Get the encryption key from environment variable
const encryptionKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;

// Function to decrypt data
const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return ciphertext; // Return the original ciphertext if decryption fails
  }
};

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
          const userData = userDoc.data();
          // Decrypt the data
          const decryptedData = userData.data.map((item) => ({
            ...item,
            mood: decryptData(item.mood),
            category: decryptData(item.category),
            emotion: decryptData(item.emotion),
            description: decryptData(item.description),
          }));
          set({ userData: { data: decryptedData } });
        } else {
          set({ userData: null });
        }
      } else {
        set({ user: null, userData: null });
      }
    });
  }
}));