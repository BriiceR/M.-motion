import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Logout from '../components/logOut';

export const Profil = () => {
    const { personalData, fetchUserData } = useStore();
    const navigate = useNavigate();

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

    // console.log(userData);
    // console.log(personalData);

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
                            <img src="/pen.svg" alt="Modifier votre profil" className="w-8 h-8 rounded-md " />
                        </div>
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
                    </div>
                    <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
                        <p>Liste de professionnels: {personalData.professionals && personalData.professionals.length > 0 ? personalData.professionals.join(', ') : "Aucun"}</p>
                    </div>
                    <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
                        <p>Facture: {personalData.invoice || "Non spécifié"}</p>
                    </div>
                    {/* <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50 mb-8">
                        <p>Liste d'exercices: {personalData.exercises && personalData.exercises.length > 0 ? personalData.exercises.join(', ') : "Aucun"}</p>
                    </div>
                    <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50 mb-8">
                        <p>Notifications push: {personalData.notifications ? "Oui" : "Non"}</p>
                    </div> */}
                </>
            )}

            <Logout />
        </div>
    );
};