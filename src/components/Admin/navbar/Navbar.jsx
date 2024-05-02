import React from 'react';
import { CarOutlined, DashboardOutlined, DatabaseOutlined, HistoryOutlined, HomeOutlined, LogoutOutlined, UnorderedListOutlined, UsergroupAddOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const onClose = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://teraflex.cl:9000/logout/");
            localStorage.clear();
            if (res) {
                navigate("/");
            }
        } catch (error) {

        }
    }

    const admin = localStorage.getItem("user");
    console.log(admin);

    return (
        <div className='nav-container'>
            <div className="links">
                <h1 className='textad'>Bienvenido {admin}</h1>
                {/* <div className="link">
                    <HomeOutlined className='icon' />
                    <a href="#" className="ref">Inicio</a>
                </div> */}
                <Link className='link' to={""}>
                    <div className="link">
                        <DashboardOutlined className='icon' />
                        <a className="ref">Dashboard</a>
                    </div>
                </Link>
                <Link className='link' to={"usuarios"}>
                    <div className="link">
                        <UsergroupAddOutlined className='icon' />
                        <a className="ref">Usuarios</a>
                    </div>
                </Link>
                <Link className='link' to={"ciudades"}>
                    <div className="link">
                        <DatabaseOutlined className='icon' />
                        <a className="ref">Ciudades</a>
                    </div>
                </Link>
                <Link className='link' to={"camaras"}>
                    <div className="link">
                        <VideoCameraAddOutlined className='icon' />
                        <a className="ref">Camaras</a>
                    </div>
                </Link>
                <div className="link" onClick={onClose} >
                    <LogoutOutlined className='icon' />
                    <a className='ref'>Logout</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
