import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-loader.svg';

export const Loader = () => {
    const [isFading, setIsFading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Afficher le loader pendant 10 secondes
        setTimeout(() => {
            setIsFading(true); // Commencer l'animation de fondu
        }, 3000);
    }, [navigate]);

    return (
        <div className={`flex justify-center items-center h-screen bg-zinc-50 transition-opacity duration-2000 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <img src={Logo} alt="loader" />
        </div>
    );
};
