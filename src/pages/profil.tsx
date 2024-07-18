import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { encryptData } from '../utils/encrypt'; // Assurez-vous que ce chemin est correct
import Logout from '../components/logOut';

export const Profil = () => {
    const { personalData, fetchUserData } = useStore();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '',
        profilePicture: ''
    });

    useEffect(() => {
        if (personalData) {
            setFormData({
                firstName: personalData.firstName || '',
                lastName: personalData.lastName || '',
                phone: personalData.phone || '',
                dateOfBirth: personalData.dateOfBirth || '',
                profilePicture: personalData.profilePicture || ''
            });
        }
    }, [personalData]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                fetchUserData();
            } else {
                console.log("L'utilisateur n'est pas connecté.");
                navigate('/');
            }
        });
        return () => {
            unsubscribe();
        };
    }, [fetchUserData, navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        const encryptedData = {
            firstName: encryptData(formData.firstName),
            lastName: encryptData(formData.lastName),
            phone: encryptData(formData.phone),
            dateOfBirth: encryptData(formData.dateOfBirth),
            profilePicture: encryptData(formData.profilePicture),
        };

        try {
            const userCollectionRef = doc(db, 'users', userId);
            await updateDoc(userCollectionRef, {
                'personalData.firstName': encryptedData.firstName,
                'personalData.lastName': encryptedData.lastName,
                'personalData.phone': encryptedData.phone,
                'personalData.dateOfBirth': encryptedData.dateOfBirth,
                'personalData.profilePicture': encryptedData.profilePicture
            });
            setIsEditing(false);
            fetchUserData(); // Refresh the data
        } catch (error) {
            console.error('Error updating data in Firestore:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center gap-4 py-4">

            {personalData && (
                <>
                    <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
                        <div className='flex justify-between items-top mb-4'>
                            <img
                                src={personalData.profilePicture || '/profilDefault.svg'}
                                alt="Photo de profil"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <h2 className="text-xl font-bold text-orange-300">VOUS</h2>
                            <img
                                src="/pen.svg"
                                alt="Modifier votre profil"
                                className="w-8 h-8 rounded-md cursor-pointer"
                                onClick={handleEditClick}
                            />
                        </div>
                        {isEditing ? (
                            <>
                                <div className='flex justify-between items-top mb-4'>
                                    <div>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Nom"
                                            className="mb-2 p-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Prénom"
                                            className="mb-2 p-2 border rounded"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        placeholder="Date de naissance"
                                        className="mb-2 p-2 border rounded"
                                    />
                                </div>
                                <hr className='mb-4' />
                                <div>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Téléphone"
                                        className="mb-2 p-2 border rounded"
                                    />
                                    <p>Mail: {personalData.userMail || "Non spécifié"}</p>
                                </div>
                                <button
                                    onClick={handleSaveClick}
                                    className="mt-4 py-2 px-4 bg-green-500 text-white rounded-md"
                                >
                                    Enregistrer
                                </button>
                            </>
                        ) : (
                            <>
                                <div className='flex justify-between items-top mb-4'>
                                    <div>
                                        <p>Nom: {personalData.lastName || "Non spécifié"}</p>
                                        <p>Prénom: {personalData.firstName || "Non spécifié"}</p>
                                    </div>
                                    <p>Age: {personalData.dateOfBirth || "Non spécifié"}</p>
                                </div>
                                <hr className='mb-4' />
                                <div>
                                    <p>Téléphone: {personalData.phone || "Non spécifié"}</p>
                                    <p>Mail: {personalData.userMail || "Non spécifié"}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
                        <p>Liste de professionnels: {personalData.professionals && personalData.professionals.length > 0 ? personalData.professionals.join(', ') : "Aucun"}</p>
                    </div>
                    <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
                        <p>Facture: {personalData.invoice || "Non spécifié"}</p>
                    </div>
                </>
            )}

            <Logout />
        </div>
    );
};