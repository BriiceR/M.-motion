import Logo from '../assets/logo-loader.svg';

export const Loader = ({ isFading }: { isFading: boolean }) => {
    return (
        <div className={`flex justify-center items-center h-screen bg-zinc-50 ${isFading ? 'animate-fadeOut' : ''}`}>
            <img src={Logo} alt="loader" />
        </div>
    );
};
