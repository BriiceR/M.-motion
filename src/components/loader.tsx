import Logo from '../assets/logo-loader.svg';


export const Loader = () => {

    return (
        <div className="flex justify-center items-center h-screen bg-zinc-50">
            <img className="" src={Logo} alt="loader" />
        </div >
    )
}