import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logout from '/logout.svg'


export const Logout = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSignOut = async () => {
        setError('');
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/');
        }).catch(() => {
            // An error happened.
        });
    };

    return (
        <div>
            <button onClick={handleSignOut} className="py-2 px-4 bg-orange-300 text-white rounded-md text-sm">
                <img src={logout} alt="logout" />
            </button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Logout;
