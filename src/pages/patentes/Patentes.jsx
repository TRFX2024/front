import { useState } from 'react';
import React, { useEffect } from 'react';
import "./patentes.css";
import axios from 'axios';
import io from "socket.io-client";
import Websockets from '../../components/websocket/Websockets';

const Patentes = () => {

    const [patentes, setPatentes] = useState(null);

    useEffect(() => {

        axios.get('https://teraflex.cl:9000/monitoreo_camaras/', {
            withCredentials: true,
        }).then(res => {
            console.log(res.data);
            setPatentes(true);

        }).catch(err => {
            setPatentes(false)
            console.log(err);
        });


    }, []);
  
    return (
        <div className='sistema'>
            <h1>Sistema de monitoreo</h1>
            <Websockets/>
        </div>
    );
}

export default Patentes;
