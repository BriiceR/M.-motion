
export const Header = () => {
    return (
        <div className="text-center flex justify-between items-center mt-2">
            {/* <h1 className="text-center text-3xl font-bold mt-2 mb-2 text-emerald-400">M:É</h1> */}
            <img src='/favicon.svg' className='w-12 h-12' alt="logo" />
            <button className="py-1 px-3 ">
                <img className='w-8 h-8 ' src='/dots.svg' alt="plus" />
            </button>
        </div>
    );
};

