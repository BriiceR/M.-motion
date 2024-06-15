import React from 'react';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface ValidatedProps {
    mood: string;
    category: string;
    emotion: string;
    description: string;
    userId: string;
    onDataSubmitted: () => void;
}

export const Validated: React.FC<ValidatedProps> = ({ mood, category, emotion, description, userId, onDataSubmitted }) => {
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log('Submitted to database');

        try {
            const newData = {
                time: new Date().toISOString(),
                mood,
                category,
                emotion,
                description
            };
            const userCollectionRef = doc(db, 'users', userId);
            await updateDoc(userCollectionRef, {
                data: arrayUnion(newData)
            });
            console.log('Data sent to Firestore successfully');
            onDataSubmitted(); // Appel de la fonction de rappel pour réinitialiser les états
        } catch (error) {
            console.error('Error sending data to Firestore:', error);
        }
    }

    return (
        <div className="w-full">
            <button type="submit" onClick={handleSubmit} className="py-3 bg-orange-300 text-white w-full rounded-md font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                C'est OK
            </button>
        </div>
    );
}
