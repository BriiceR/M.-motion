
export const Header = () => {
    return (
        <div className="w-full fixed bg-white">
            <div className="text-center flex justify-between items-center px-6 ">
                <img src='/favicon.svg' className='w-12 h-12' alt="logo" />
                <button className="py-1 px-3 ">
                    <img className='w-8 h-8 ' src='/dots.svg' alt="plus" />
                </button>
            </div>
            <hr className="" />
        </div>
    );
};

