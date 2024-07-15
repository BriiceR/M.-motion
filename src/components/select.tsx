import { useState, useEffect, useRef, SetStateAction, RefObject } from 'react';

type SelectProps = {
    onCategorySelect: (value: string) => void;
};

export const Select = ({ onCategorySelect }: SelectProps) => {
    const [selectedOption, setSelectedOption] = useState('Catégories');
    const [selectedColor, setSelectedColor] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const selectRef: RefObject<HTMLDivElement> = useRef(null);

    const options = [
        { value: 'Famille', color: 'bg-red-300' },
        { value: 'Couple', color: 'bg-blue-300' },
        { value: 'Santé', color: 'bg-green-300' },
        { value: 'Travail', color: 'bg-yellow-300' },
        { value: 'Social', color: 'bg-purple-300' },
        { value: 'Autre', color: 'bg-gray-300' },
    ];

    const handleOptionClick = (value: string, color: SetStateAction<string>) => {
        setSelectedOption(value);
        onCategorySelect(value);
        setSelectedColor(color);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className="relative inline-block w-30">
            <div
                className="appearance-none p-2 pe-6 flex items-center w-30 rounded-md bg-zinc-50 outline-orange-200 focus:outline-orange-200 ml-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedColor && (
                    <span className={`w-3 h-3 rounded-full ${selectedColor} mr-2`}></span>
                )}
                {selectedOption}
                <img src='/arrow.svg' className='w-6' alt="Select" />
            </div>
            {isOpen && (
                <ul className="absolute mt-1 ml-4 rounded-md bg-zinc-50 shadow-lg z-10 w-32">
                    <li
                        className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                        onClick={() => handleOptionClick('Catégories', '')}
                    >
                        Categories
                    </li>

                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                            onClick={() => handleOptionClick(option.value, option.color)}
                        >
                            <span className={`w-3 h-3 rounded-full ${option.color} mr-2`}></span>
                            {option.value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

