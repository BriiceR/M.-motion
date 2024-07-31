import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Logout from '../components/logOut';
import UserProfile from '../components/profilPage/UserProfile';

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

    return (
        <div className="flex flex-col justify-center gap-4 py-4">
            {personalData && (
                <>
                    <UserProfile personalData={personalData} fetchUserData={fetchUserData} />
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