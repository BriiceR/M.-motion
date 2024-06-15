import list from '/list.svg'

export const ListLink = () => {


    return (

        <a href="/list" className="py-0 px-4 bg-orange-300 text-white rounded-md text-sm flex justify-center items-center">
            <img src={list} alt="list" />
        </a>

    );
}

export default ListLink;
