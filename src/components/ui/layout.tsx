import React from 'react';
import { Header } from './header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-center">
            <div className="w-screen h-screen">
                <Header />


                {children}
            </div>
        </div>
    );
};

export default Layout;
