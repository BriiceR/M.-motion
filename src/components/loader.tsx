import { useEffect, useState } from 'react';
import Logo from '../assets/logo-loader.svg';

export const Loader = ({ loading }: { loading: boolean }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setIsFading(true);
            }, 100); // Delay to ensure fade-out happens after loading is set to false
        }
    }, [loading]);

    return (
        <div className={`flex justify-center items-center h-screen bg-zinc-50 transition-opacity duration-700 ease-in ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <img className="" src={Logo} alt="loader" />
        </div>
    );
};
