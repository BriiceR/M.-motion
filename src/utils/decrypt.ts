import CryptoJS from 'crypto-js';

// Get the encryption key from environment variable
const encryptionKey = import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY;

// Function to decrypt data
export const decryptData = (ciphertext: string | CryptoJS.lib.CipherParams) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return ciphertext; // Return the original ciphertext if decryption fails
  }
};