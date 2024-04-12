import React, { useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     navigate("/home/patentes");
    // });

    return (
        <div className='home-container'>
            <h1>Home</h1>
        </div>
    );
}

export default Home;
