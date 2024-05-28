import Logout from '../../components/logOut';
import ListLink from '../../components/listLink';
import ChartLink from '../../components/chartLink';

export const Header = () => {
    return (
        <div className="text-center flex justify-between items-center mt-2">
            <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">M:É</h1>
            <div className='flex gap-4'>
                <ListLink />
                <ChartLink />
                <Logout />
            </div>
        </div>
    );
};

