import React from 'react';
import "./navbar.css";

const NavBar = () => {
    return (
        <div className='nav-container'>
            <div className="links">
                <a href="#" className="ref">Inicio</a>
                <a href="#" className="ref">Patentes</a>
                <a href="#" className="ref">Historial</a>
                <a href="#" className="ref">Lista Negra</a>
            </div>
        </div>
    );
}

export default NavBar;
