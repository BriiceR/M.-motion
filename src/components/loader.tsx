import { useEffect, useState } from 'react';
import Logo from '../assets/logo-loader.svg';

export const Loader = () => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Commencer l'animation de fondu immédiatement
        setIsFading(true);
    }, []);

    return (
        <div className={`flex justify-center items-center h-screen bg-zinc-50 ${isFading ? 'animate-fadeOut' : ''}`}>
            <img src={Logo} alt="loader" />
        </div>
    );
};
