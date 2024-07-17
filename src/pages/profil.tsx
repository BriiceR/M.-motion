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
        <div className="flex flex-col justify-center gap-4 py-10">
            <p className="text-center text-orange-300">Prochainement...profil</p>
            <Logout />

            {personalData && (
                <div>
                    <h2 className="text-center text-2xl">Données Personnelles</h2>
                    <ul className="list-disc list-inside">
                        <li>Nom: {personalData.lastName || "Non spécifié"}</li>
                        <li>Prénom: {personalData.firstName || "Non spécifié"}</li>
                        <li>Téléphone: {personalData.phone || "Non spécifié"}</li>
                        <li>Liste de professionnels: {personalData.professionals && personalData.professionals.length > 0 ? personalData.professionals.join(', ') : "Aucun"}</li>
                        <li>Liste d'exercices: {personalData.exercises && personalData.exercises.length > 0 ? personalData.exercises.join(', ') : "Aucun"}</li>
                        <li>Notifications push: {personalData.notifications ? "Oui" : "Non"}</li>                        <li>Facture: {personalData.invoice || "Non spécifié"}</li>
                        <li>Date de naissance: {personalData.dateOfBirth || "Non spécifié"}</li>
                        <li>Photo de profil: {personalData.profilePicture || "Non spécifié"}</li>
                        <li>Mail: {personalData.userMail || "Non spécifié"}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};