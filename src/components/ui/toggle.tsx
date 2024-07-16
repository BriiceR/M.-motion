import { useState } from "react";

interface ToggleProps {
    onToggle: (value: string) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ onToggle }) => {
    const [selectedOption, setSelectedOption] = useState("Toute la liste");

    const handleToggle = (newOption: string) => {
        setSelectedOption(newOption);
        onToggle(newOption);
    };

    const getLeftPosition = () => {
        switch (selectedOption) {
            case "Toute la liste":
                return "0%";
            case "Positive":
                return "50%";
            default:
                return "0%";
        }
    };

    return (
        <div className="flex justify-center relative rounded-full text-black border border-gray-100 mx-8 mb-2">
            <p
                onClick={() => handleToggle("Toute la liste")}
                className={`z-10 px-4 py-1 cursor-pointer w-full text-center`}
            >
                Toute la liste
            </p>
            <p
                onClick={() => handleToggle("Positive")}
                className={`z-10 px-4 py-1 cursor-pointer w-full text-center`}
            >
                Positive
            </p>
            <div
                style={{ left: getLeftPosition() }}
                className={`bg-orange-300/50 rounded-full w-1/2 h-8 absolute z-0 transition-all duration-200`}
            ></div>
        </div>
    );
};
