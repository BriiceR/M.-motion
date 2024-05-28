import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Logout from "../components/logOut";
import { useNavigate } from 'react-router-dom';
import ListLink from '../components/listLink';


export const Chart = () => {
    const [, setLoading] = useState(true);
    const [, setUserData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userId = authUser.uid;
                const userCollectionRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userCollectionRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserData(userData);
                } else {
                    console.log("Aucune donnée d'utilisateur trouvée pour l'utilisateur actuel.");
                }
            } else {
                console.log("L'utilisateur n'est pas connecté.");
                navigate('/')
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div className="flex justify-center">
            <div className="w-screen px-6 h-screen rounded-3xl xl:shadow-xl">
                <div className="text-center flex justify-between items-center mt-2">
                    <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">M:É</h1>
                    <div className='flex gap-4'>
                        <ListLink />
                        <ListLink />
                        {/* {userData && <PdfGenerator data={userData.data} />} */}
                        <Logout />
                    </div>
                </div>


                <hr />
                <div className="flex flex-col justify-center gap-4 py-10">
                    <p className="text-center text-orange-300">Prochainement...</p>

                    <div className="flex justify-center mb-4">
                        <a href="/dashboard" className="py-3 px-6 bg-orange-300 text-white rounded-md text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)]">Retour</a>
                    </div>
                </div>
            </div>
        </div>
    );
}