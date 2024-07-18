import CryptoJS from 'crypto-js';

// Get the encryption key from environment variable
const encryptionKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;

// Function to encrypt data
export const encryptData = (data: string | CryptoJS.lib.WordArray) => {
  try {
    return CryptoJS.AES.encrypt(data, encryptionKey).toString();
  } catch (error) {
    console.error('Error encrypting data:', error);
    return data; // Return the original data if encryption fails
  }
};