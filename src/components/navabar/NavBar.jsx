import React from 'react';
import "./navbar.css";
import { CarOutlined, HistoryOutlined, HomeOutlined, LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
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
                        <CarOutlined className='icon' />
                        <a className="ref">Patentes</a>
                    </div>
                </Link>
                <Link className='link' to={"historial"}>
                    <div className="link">
                        <HistoryOutlined className='icon' />
                        <a className="ref">Historial</a>
                    </div>
                </Link>
                <Link className='link' to={"lista"}>
                    <div className="link">
                        <UnorderedListOutlined className='icon' />
                        <a className="ref">Lista Negra</a>
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

export default NavBar;
