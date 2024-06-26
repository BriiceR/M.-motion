import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { Validated } from '../components/validated';
import { Select } from '../components/select';
import TabBar from '../components/tabBar';

export const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth();
    const navigate = useNavigate();
    const [mood, setMood] = useState('');
    const [emotion, setEmotion] = useState('');
    const [description, setDescription] = useState('');
    const [, setUserData] = useState<any>(null);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const [category, setCategory] = useState('');

    const handleDataSubmitted = () => {
        console.log(mood, emotion, description, category);
        setMood('');
        setEmotion('');
        setDescription('');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                setUser(authUser);
                const userId = authUser.uid;
                const userCollectionRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userCollectionRef);
                console.log('lecture de la collection de l\'utilisateur');
                if (!userDoc.exists()) {
                }
                const userData = userDoc.data();
                setUserData(userData);
            } else {
                navigate('/');
            }
        });

        // Ajouter un gestionnaire d'événements sur le document pour détecter les clics en dehors des inputs
        const handleClickOutside = (event: MouseEvent) => {
            if (inputContainerRef.current && !inputContainerRef.current.contains(event.target as Node)) {
                // Cacher les inputs si l'utilisateur clique en dehors d'eux
                setMood('');
                setEmotion('');
                setDescription('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            unsubscribe();
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [auth, navigate]);



    return (
        <>
            <div className="text-center flex justify-between items-center mt-10">
                <button onClick={() => setMood('/emoji_1.svg')} className='text-5xl'>
                    <img src='/emoji_1.svg' className='w-16' alt="Sad" />
                </button>
                <button onClick={() => setMood('/emoji_2.svg')} className='text-5xl'>
                    <img src='/emoji_2.svg' className='w-16' alt="Unhappy" />
                </button>
                <button onClick={() => setMood('/emoji_3.svg')} className='text-5xl'>
                    <img src='/emoji_3.svg' className='w-16' alt="Neutral" />
                </button>
                <button onClick={() => setMood('/emoji_4.svg')} className='text-5xl'>
                    <img src='/emoji_4.svg' className='w-16' alt="Happy" />
                </button>
                <button onClick={() => setMood('/emoji_5.svg')} className='text-5xl'>
                    <img src='/emoji_5.svg' className='w-16' alt="Very Happy" />
                </button>
            </div>
            <div ref={inputContainerRef} className="mt-16">
                {mood ? (
                    <>
                        <div className="flex mb-4 items-center">
                            <img src={mood} className='w-12' alt="Selected Mood" />
                            <Select onCategorySelect={setCategory} />
                        </div>
                        <input
                            type="text"
                            placeholder="émotion"
                            value={emotion}
                            onChange={(e) => setEmotion(e.target.value)}
                            required={true}
                            className="py-3 p-5 rounded-md bg-zinc-50 w-full outline-orange-200 mb-4 focus:outline-orange-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        />
                        <textarea
                            placeholder="pourquoi ?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required={true}
                            className="h-40 py-3 p-5 rounded-md bg-zinc-50 w-full outline-orange-200 mb-4 focus:outline-orange-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        />
                        <div className="flex justify-end ">
                            <Validated mood={mood} emotion={emotion} description={description} userId={user?.uid ?? ''} onDataSubmitted={handleDataSubmitted} category={category} />
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-auto mt-36 ">
                        <h2 className="text-6xl font-bold text-orange-300/40">Comment vous sentez-vous aujourd'hui ?</h2>
                    </div>
                )}
            </div>
            <TabBar />

        </>
    );
};
