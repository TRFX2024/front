import React from 'react';
import "./navbar.css";
import { CarOutlined, HistoryOutlined, HomeOutlined, LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const onClose = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://teraflex.cl:90/logout/");
            if(res){
                navigate("/");
            }
        } catch (error) {
            
        }
    }

    return (
        <div className='nav-container'>
            <div className="links">
                <h1 className='textad'>Bienvenido Usuario</h1>
                <div className="link">
                    <HomeOutlined className='icon' />
                    <a href="#" className="ref">Inicio</a>
                </div>
                <div className="link">
                    <CarOutlined className='icon' />
                    <a href="#" className="ref">Patentes</a>
                </div>
                <div className="link">
                    <HistoryOutlined className='icon' />
                    <a href="#" className="ref">Historial</a>
                </div>
                <div className="link">
                    <UnorderedListOutlined className='icon' />
                    <a href="#" className="ref">Lista Negra</a>
                </div>
                <div className="link">
                    <UnorderedListOutlined className='icon' />
                    <a href="#" className="ref">Lista Negra</a>
                </div>
                <div className="link">
                    <LogoutOutlined className='icon' />
                    <a className='' >Logout</a>
                </div>
                <div className="link">
                    <LogoutOutlined className='icon' />
                    <a className='' onClick={onClose} >Logout</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
