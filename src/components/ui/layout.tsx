import React from 'react';
import { Header } from './header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-center">
            <div className="w-screen h-screen">
                <Header />

                <div className='px-6 pt-10 mt-8'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
