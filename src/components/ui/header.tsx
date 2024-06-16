import Logout from '../../components/logOut';

export const Header = () => {
    return (
        <div className="text-center flex justify-between items-center mt-2">
            <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">M:É</h1>
            <div className='flex gap-4'>
                <Logout />
            </div>
        </div>
    );
};

