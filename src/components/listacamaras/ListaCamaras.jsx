import React, { useEffect, useState } from 'react';
import './listacamaras.css';
import axios from 'axios';
import { CameraOutlined, EnvironmentOutlined } from '@ant-design/icons';

const ListaCamaras = () => {
    const [camaras, setCamaras] = useState([]);
    useEffect(() => {
        const obtener = async () => {
            try {
                const { data } = await axios.get("https://teraflex.cl:9000/porticos_monitoreo/");
                setCamaras(data.camaras);
            } catch (error) {
                console.log(error);
            }
        }
        obtener();
    }, []);
    return (
        <div className='camera-list'>
            <h1>Camaras de monitoreo</h1>
            <div className="cam">
                <div className="camera-cont">
                    {
                        camaras.map(camara => (
                            <div className="camera1">
                                <div className="cam1">
                                    <CameraOutlined />
                                    <p>CAMARA:</p>
                                    <p>{camara.camara}</p>
                                </div>
                                <div className="cam2">
                                    <EnvironmentOutlined />
                                    <p>UBICACION:</p>
                                    <p>{camara.ubicacion}</p>
                                </div>

                            </div>

                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default ListaCamaras;
