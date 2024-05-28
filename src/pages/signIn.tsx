import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app); // Accès à la base de données Firestore
    const navigate = useNavigate();


    const handleSignIn = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Création du document utilisateur dans Firestore
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {}); // Création d'un document vide

            navigate('/dashboard');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[700px] px-10 h-[400px] rounded-3xl xl:shadow-xl">
                <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">Inscription</h1>
                <hr />
                <div className="flex justify-center mt-10">
                    <form onSubmit={handleSignIn} className="w-full md:w-[500px]">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="py-3 p-5 rounded-md bg-zinc-50 w-full outline-orange-200 mb-4 focus:outline-orange-200"
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="py-3 p-5 rounded-md bg-zinc-50 w-full outline-orange-200 mb-4 focus:outline-orange-200"
                        />
                        <input
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="py-3 p-5 rounded-md bg-zinc-50 w-full outline-orange-200 mb-4 focus:outline-orange-200"
                        />
                        {password !== confirmPassword && <p className="text-red-500 mt-1">Les mots de passe ne correspondent pas.</p>}
                        <button type="submit" className="py-3 bg-orange-300 text-white w-full rounded-md font-bold">S'inscrire</button>
                    </form>
                </div>
                <div className='flex justify-center mt-4'>
                    <a href='/' className="text-center text-sm mt-2 mb-2 text-emerald-400">Se connecter</a>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}

