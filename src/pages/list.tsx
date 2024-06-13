import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebaseConfig';
import { Loader } from "../components/loader";
import { useNavigate } from 'react-router-dom';
import Layout from '../components/ui/layout';
import { useStore } from '../store/useStore';


export const List = () => {
    const [loading,] = useState(false);
    // const [userData, setUserData] = useState<any>(null);
    const [showMore, setShowMore] = useState(true);
    const [showingResults, setShowingResults] = useState<any[]>([]);
    const navigate = useNavigate();
    const { userData, fetchUserData } = useStore();


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

    const handleShowMore = () => {
        setShowingResults(prevResults => {
            const startIndex = prevResults.length;
            const endIndex = Math.min(startIndex + 5, userData.data.length);
            return [...prevResults, ...userData.data.slice(startIndex, endIndex)];
        });
        if (showingResults.length + 5 >= userData.data.length) {
            setShowMore(false);
        }
    };

    return (
        <Layout>

            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col justify-center gap-4 py-10">
                    {showingResults
                        .sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime())
                        .map((data: any, index: number) => (
                            <div key={index} className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-3xl">{data.mood}</p>
                                    {data.category &&
                                        <p className="bg-blue-300 text-white p-1 rounded-md">{data.category}</p>
                                    }
                                    <p className="text-sm">{formatDate(data.time)}</p>
                                </div>

                                <p className="mt-2">{data.emotion}</p>
                                <p>{data.description}</p>
                            </div>
                        ))}
                </div>
            )}

            {showMore && !loading && (
                <div className="flex justify-center mb-4" style={{ minHeight: '50px' }}>
                    <button onClick={handleShowMore} className="py-3 px-6 bg-orange-300 text-white rounded-md text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)]">Afficher 5 résultats supplémentaires</button>
                </div>
            )}

            <div className="flex justify-center">
                <a href="/dashboard" className="py-3 px-6 bg-orange-300 text-white rounded-md text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)]">Retour</a>
            </div>
        </Layout>
    );
};

