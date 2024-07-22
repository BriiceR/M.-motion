import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Configurer la persistance de l'état d'authentification
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('La persistance de l\'état d\'authentification a été configurée avec succès.');
  })
  .catch((error) => {
    console.error('Erreur lors de la configuration de la persistance de l\'état d\'authentification :', error);
  });

// Fonction pour créer une collection par utilisateur
const createUserCollection = async (userId: string) => {
  try {
    // Créer une référence à la collection de l'utilisateur
    const userCollectionRef = collection(db, 'users');

    // Créez un document dans la collection de l'utilisateur avec l'UID comme ID de document
    const userDocRef = doc(userCollectionRef, userId);

    // Ajoutez des données au document de l'utilisateur
    await setDoc(userDocRef, {
      // Ajoutez les données spécifiques de l'utilisateur ici
    });

    console.log('Collection utilisateur créée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création de la collection utilisateur :', error);
  }
};

export { app, db, createUserCollection, storage }; // Exporter l'application et la base de données Firebase ainsi que la fonction pour créer une collection utilisateur
