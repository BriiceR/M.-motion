import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/ui/layout';
import { useStore } from '../store/useStore';

export const Profil = () => {
    const { userData, fetchUserData } = useStore();
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

    console.log(userData)

    return (
        <Layout>
            <div className="flex flex-col justify-center gap-4 py-10">
                <p className="text-center text-orange-300">Prochainement...profil</p>
            </div>
        </Layout>
    );
};
