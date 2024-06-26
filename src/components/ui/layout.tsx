// src/components/ui/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from '../tabBar';
import { Header } from './header';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow px-6 pt-10 mt-8">
                <Outlet />
                {children}
            </main>
            <TabBar />
        </div>
    );
};

export default Layout;
