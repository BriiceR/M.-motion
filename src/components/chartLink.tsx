import chart from '/chart.svg'

export const ChartLink = () => {


    return (

        <a href="/chart" className="py-0 px-4 bg-orange-300 text-white rounded-md text-sm flex justify-center items-center">
            <img src={chart} alt="chart" />
        </a>

    );
}

export default ChartLink;
