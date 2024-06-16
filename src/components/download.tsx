
import download from '/download.svg';

export const Download = () => {

    return (
        <div>
            <button className="py-2 px-4 bg-orange-300 text-white rounded-md text-sm">
                <img src={download} alt="download" />
            </button>
        </div>
    );
};

export default Download;
