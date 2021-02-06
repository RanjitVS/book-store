import React from 'react';
import Menu from './Menu';
const Layout = ({ children, className }) => {
    return (
        <div>
            <Menu />

            <div className={className} >{children}</div>
        </div>
    )
}

export default Layout;