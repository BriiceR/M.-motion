import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TabBar = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        { to: '/app/list', icon: '/list.svg', alt: 'liste' },
        { to: '/app/chart', icon: '/chart.svg', alt: 'stat' },
        { to: '/app/dashboard', icon: '/emoji_4.svg', alt: '' },
        { to: '/app/idea', icon: '/idea.svg', alt: 'idée' },
        { to: '/app/profil', icon: '/profil.svg', alt: 'profil' },
    ];

    useEffect(() => {
        const index = tabs.findIndex(tab => tab.to === location.pathname);
        setActiveIndex(index);
    }, [location.pathname]);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
            <div className="relative flex justify-around px-4 pt-4 mb-4">
                <div
                    className="absolute top-0 h-1 bg-orange-300 transition-all duration-300"
                    style={{ left: `${(100 / tabs.length) * activeIndex}%`, width: `${100 / tabs.length}%` }}
                ></div>
                {tabs.map((tab, index) => (
                    <NavLink
                        key={index}
                        to={tab.to}
                        className={`flex flex-col items-center relative ${location.pathname === tab.to ? 'text-orange-300' : 'text-gray-600'
                            }`}
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={tab.icon}
                                alt={tab.alt}
                                className={`w-8 h-8 ${tab.to === '/app/dashboard'
                                    ? 'w-12 h-12 p-2 bg-orange-300/50 rounded-md'
                                    : ''
                                    }`}
                            />
                            <span className="text-xs mt-1">{tab.alt}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default TabBar;
