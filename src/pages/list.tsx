import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import PdfGenerator from '../components/pdfGenerator';

export const List = () => {
    const [, setLoading] = useState(false);
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

    useEffect(() => {
        setLoading(true);
        if (userData && userData.data) {
            setShowingResults(userData.data);
        }
        setLoading(false);
    }, [userData]);

    const options = [
        { value: 'Famille', color: 'bg-red-500' },
        { value: 'Couple', color: 'bg-blue-300' },
        { value: 'Santé', color: 'bg-green-300' },
        { value: 'Travail', color: 'bg-yellow-300' },
    ];

    return (


        < div className="flex flex-col justify-center gap-4 pb-24" >
            <PdfGenerator data={showingResults} />
            {
                showingResults
                    .sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime())
                    .map((data: any, index: number) => (
                        <div key={index} className="p-4 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-50">
                            <div className="flex justify-between items-center">
                                <img src={data.mood} className='w-12' alt="Selected Mood" />
                                {data.category &&
                                    <p className={`${options.find(opt => opt.value === data.category)?.color} text-white py-1 px-2 rounded-md`}>{data.category}</p>
                                }
                                <p className="text-sm">{formatDate(data.time)}</p>
                            </div>

                            <p className="mt-2">{data.emotion}</p>
                            <p>{data.description}</p>
                        </div>
                    ))
            }
        </div >


    );
};
