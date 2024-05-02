import React from 'react';
import './layout.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Admin/navbar/Navbar';
const LayoutAdmin = () => {
    return (
        <div className='layout'>
            <Navbar/>
            <div className="layout-content">
                <Outlet/>
            </div>
        </div>
    );
}

export default LayoutAdmin;
