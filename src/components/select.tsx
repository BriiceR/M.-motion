import { useState, useEffect, useRef, SetStateAction, RefObject } from 'react';

export const Select = () => {
    const [selectedOption, setSelectedOption] = useState('Catégorie');
    const [selectedColor, setSelectedColor] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const selectRef: RefObject<HTMLDivElement> = useRef(null);

    const options = [
        { value: 'Famille', color: 'bg-red-500' },
        { value: 'Couple', color: 'bg-blue-300' },
        { value: 'Travail', color: 'bg-green-300' }
    ];

    const handleOptionClick = (value: SetStateAction<string>, color: SetStateAction<string>) => {
        setSelectedOption(value);
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
                className="appearance-none p-2 pe-6 flex items-center w-30 rounded-md bg-zinc-50 outline-orange-200 focus:outline-orange-200 mx-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedColor && (
                    <span className={`w-3 h-3 rounded-full ${selectedColor} mr-2`}></span>
                )}
                {selectedOption}
            </div>
            {isOpen && (
                <ul className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                    <li
                        className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                        onClick={() => handleOptionClick('Catégorie', '')}
                    >
                        Catégorie
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
