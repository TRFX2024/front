import React from 'react';
import './layout.css';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/navabar/NavBar';

const Layout = () => {
    return (
        <div className='layout'>
            <NavBar/>
            <div className="layout-content-ad">
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;
