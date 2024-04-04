import React from 'react';
// import Sidebar from './Sidebar.tsx';

// interface PageLayoutProps {
//     title: string;
//     children: React.ReactNode;
// }

const PageLayout = ({ title, children }) => {
    return (
        <div className="page-layout">
            {/* <Sidebar /> */}
            <div className="content">
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
