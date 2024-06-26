import Logo from '../assets/logo-loader.svg';

export const Loader = () => {

    return (
        <div className={`flex justify-center items-center h-screen bg-zinc-50 animate-fadeOut`}>
            <img src={Logo} alt="loader" />
        </div>
    );
};
