// src/store/useStore.ts
import { create } from 'zustand';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { decryptData } from '../utils/decrypt';

// Define the types for your store
interface StoreState {
  user: User | null;
  userData: any | null;
  personalData: any | null;
  fetchUserData: () => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  userData: null,
  personalData: null,

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

          // Decrypt the main user data
          let decryptedData = [];
          if (userData.data) {
            decryptedData = userData.data.map((item: { mood: string | CryptoJS.lib.CipherParams; category: string | CryptoJS.lib.CipherParams; emotion: string | CryptoJS.lib.CipherParams; description: string | CryptoJS.lib.CipherParams; }) => ({
              ...item,
              mood: decryptData(item.mood),
              category: decryptData(item.category),
              emotion: decryptData(item.emotion),
              description: decryptData(item.description),
            }));
          }

          // Decrypt personal data
          const decryptedPersonalData = {
            firstName: decryptData(userData.personalData?.firstName || ''),
            lastName: decryptData(userData.personalData?.lastName || ''),
            phone: decryptData(userData.personalData?.phone || ''),
            notifications: userData.personalData?.notifications ? decryptData(userData.personalData.notifications.toString()) : '',
            dateOfBirth: decryptData(userData.personalData?.dateOfBirth || ''),
            profilePicture: decryptData(userData.personalData?.profilePicture || ''),
            professionals: userData.personalData?.professionals?.map(decryptData) || [],
            exercises: userData.personalData?.exercises?.map(decryptData) || [],
            invoices: userData.personalData?.invoices?.map(decryptData) || [],
            userMail: userData.personalData?.userMail || '',
          };

          set({ userData: { data: decryptedData }, personalData: decryptedPersonalData });
        } else {
          set({ userData: null, personalData: null });
        }
      } else {
        set({ user: null, userData: null, personalData: null });
      }
    });
  },
}));