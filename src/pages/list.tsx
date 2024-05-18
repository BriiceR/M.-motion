import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Loader } from "../components/loader";
import Logout from "../components/logOut";
import PdfGenerator from '../components/pdfGenerator';
import ChartLink from '../components/chartLink';
import { useNavigate } from 'react-router-dom';

export const List = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [showMore, setShowMore] = useState(true); // État pour afficher plus de résultats
    const [showingResults, setShowingResults] = useState<any[]>([]); // État pour stocker les résultats à afficher
    const navigate = useNavigate();

    const formatDate = (dateTimeString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateTimeString));
    };

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
                    // Initialisation des résultats à afficher (5 premiers)
                    setShowingResults(userData.data.slice(Math.max(userData.data.length - 5, 0)));
                    // Vérifier si tous les résultats ont été affichés
                    if (userData.data.length <= 5) {
                        setShowMore(false);
                    }
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

    const handleShowMore = () => {
        // Affichage de 5 résultats supplémentaires à chaque fois
        setShowingResults(prevResults => {
            const startIndex = prevResults.length;
            const endIndex = Math.min(startIndex + 5, userData.data.length);
            return [...prevResults, ...userData.data.slice(startIndex, endIndex)];
        });
        // Vérifier si tous les résultats ont été affichés
        if (showingResults.length + 5 >= userData.data.length) {
            setShowMore(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex justify-center">
            <div className="w-screen px-6 h-auto rounded-3xl xl:shadow-xl mb-4">
                <div className="text-center flex justify-between items-center mt-2">
                    <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-violet-700">M.</h1>
                    <div className='flex gap-4'>
                        <ChartLink />
                        {userData && <PdfGenerator data={userData.data} />}
                        <Logout />
                    </div>
                </div>

                <hr />
                <div className="flex flex-col justify-center gap-4 py-10">
                    {showingResults
                        .sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime())
                        .map((data: any, index: number) => (
                            <div key={index}>
                                <div className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-3xl">{data.mood}</p>
                                        <p className="text-sm">{formatDate(data.time)}</p>
                                    </div>
                                    <p className="mt-2">{data.emotion} </p>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                        ))}
                </div>

                {showMore && (
                    <div className="flex justify-center mb-4">
                        <button onClick={handleShowMore} className="py-3 px-6 bg-orange-300 text-white rounded-md text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)]">Afficher 5 résultats supplémentaires</button>
                    </div>
                )}

                <div className="flex justify-center">
                    <a href="/dashboard" className="py-3 px-6 bg-orange-300 text-white rounded-md text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)]">Retour</a>
                </div>
            </div>
        </div>
    );
};
