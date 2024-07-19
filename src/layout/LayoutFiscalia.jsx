import React from 'react';
import NavBar from '../components/Fiscalia/Navbar/NavBar';
import { Outlet } from 'react-router-dom';
import './layout.css';
const LayoutFiscalia = () => {
    return (
        <div className=''>
            <NavBar/>
            <div className="layout-fisc">
                <Outlet/>
            </div>
        </div>
    );
}

export default LayoutFiscalia;
