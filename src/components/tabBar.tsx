import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TabBar = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        { to: '/app/list', icon: '/list.svg', alt: 'list' },
        { to: '/app/chart', icon: '/chart.svg', alt: 'chart' },
        { to: '/app/dashboard', icon: '/home.svg', alt: 'dashboard' },
        { to: '/app/idea', icon: '/idea.svg', alt: 'idea' },
        { to: '/app/profil', icon: '/profil.svg', alt: 'profil' },
    ];

    useEffect(() => {
        const index = tabs.findIndex(tab => tab.to === location.pathname);
        setActiveIndex(index);
    }, [location.pathname]);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
            <div className="relative flex justify-around p-4 mb-2">
                <div
                    className="absolute top-[-0px] h-1 bg-orange-300 transition-all duration-300"
                    style={{ left: `${(100 / tabs.length) * activeIndex}%`, width: `${100 / tabs.length}%` }}
                ></div>
                {tabs.map((tab, index) => (
                    <NavLink
                        key={index}
                        to={tab.to}
                        className={`flex items-center relative ${location.pathname === tab.to ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
                            }`}
                    >
                        <img
                            src={tab.icon}
                            alt={tab.alt}
                            className={`w-8 h-8 ${tab.to === '/app/dashboard'
                                ? 'bg-orange-300 rounded-full'
                                : ''
                                }`}
                        />
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default TabBar;
