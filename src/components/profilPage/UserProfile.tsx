import { useState, useEffect } from 'react';
import { encryptData } from '../../utils/encrypt';
import { updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';

interface UserProfileProps {
    personalData: any;
    fetchUserData: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ personalData, fetchUserData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '',
        profilePicture: '',
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleSaveClick = async () => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        let profilePictureUrl = formData.profilePicture;

        try {
            if (profileImage) {
                const storageRef = ref(storage, `profilePictures/${userId}/profilePicture.jpg`);
                await uploadBytes(storageRef, profileImage);
                profilePictureUrl = await getDownloadURL(storageRef);
            }

            const encryptedData = {
                firstName: encryptData(formData.firstName),
                lastName: encryptData(formData.lastName),
                phone: encryptData(formData.phone),
                dateOfBirth: encryptData(formData.dateOfBirth),
                profilePicture: encryptData(profilePictureUrl),
            };

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
            console.error('Error updating data in Firestore or uploading file to Firebase Storage:', error);
        }
    };

    return (
        <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
            <div className='relative flex justify-between items-center mb-4'>
                <div className='relative'>
                    <img
                        src={personalData.profilePicture || '/profilDefault.svg'}
                        alt="Photo de profil"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <button
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        Changer
                    </button>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
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
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Nom"
                                className="mb-2 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Prénom"
                                className="mb-2 p-2 border rounded w-full"
                            />
                        </div>
                        <input
                            type="text"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            placeholder="Date de naissance"
                            className="mb-2 p-2 border rounded w-full"
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
                            className="mb-2 p-2 border rounded w-full"
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
                    <div className='flex justify-between items-center mb-4'>
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
    );
};

export default UserProfile;