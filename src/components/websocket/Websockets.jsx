import React, { useEffect, useRef, useState } from 'react';
import './websockets.css';
import { CarOutlined, EnvironmentOutlined, SmileOutlined } from '@ant-design/icons';
import ListaCamaras from '../listacamaras/ListaCamaras';
import { Skeleton, notification } from 'antd';
import axios from 'axios';
import not from '../../imgs/notFound.png';
import sonido from '../../imgs/sonido1.mp3'
let cont = 0;

const Websockets = ({ grupo1 }) => {
    console.log(grupo1)
    const [datas, setData] = useState(new Set());
    const [api, contextHolder] = notification.useNotification();
    const [base64, setBase64] = useState();
    const [patentes, setPatentes] = useState();
    const [ubicacion, setUbicacion] = useState();
    const [infracciones, setInfracciones] = useState();
    const [currentData, setCurrentData] = useState(null);
    const [id, setId] = useState();
    const [prueba, setPrueba] = useState(0);
    const [contador, setContador] = useState(0);
    const [registros, setRegistros] = useState([]);
    const [contadorPatentes, setContadorPatentes] = useState(0);
    const audioRef = useRef(null);




    useEffect(() => {
        // Establece la conexión WebSocket
        const socket = new WebSocket('wss://teraflex.cl:9000/ws/porticos/');
        audioRef.current.load();

        // Maneja el evento de apertura de la conexión
        socket.onopen = () => {
            console.log('Conexión WebSocket abierta');
        };

        // Maneja el evento de recepción de mensajes
        socket.onmessage = (event) => {
            console.log(event.data);
            const { type } = JSON.parse(event.data);
            const { destino } = JSON.parse(event.data);
            const { patente } = JSON.parse(event.data);
            const { origen } = JSON.parse(event.data);
            console.log(origen);
            console.log(destino);
            console.log(grupo1)
            if (type === "notificacion") {
                console.log("hola")
                console.log(grupo1);
                console.log(destino);
                if (destino === grupo1) {
                    console.log("grupo", grupo1);
                    console.log("destino", destino);
                    api.open({
                        message: 'Alerta ciudad vecina',
                        description:
                            `La ciudad ${origen} informa que la patente ${patente} se dirige posiblemente a tu ciudad `,
                        icon: (
                            <SmileOutlined
                                style={{
                                    color: '#d91111',
                                }}
                            />
                        ),
                    });
                    audioRef.current.play();

                }
            }
            try {
                const { data } = JSON.parse(event.data);
                const { image } = JSON.parse(event.data);
                const { ubicacion } = JSON.parse(event.data);
                const { total_patentes } = JSON.parse(event.data);
                const { total_infracciones } = JSON.parse(event.data);
                const { infraccion } = JSON.parse(event.data);


                if (!datas.has(data)) {
                    setCurrentData(data);
                    setBase64(image);
                    setUbicacion(ubicacion);
                    setPatentes(total_patentes);
                    setInfracciones(total_infracciones);
                    setId(infraccion);
                    setData(prevSet => new Set(prevSet.add(data)));
                    setContadorPatentes(prevContador => prevContador + 1)
                    if (infraccion === 2) {
                        audioRef.current.play();
                        console.log(cont);
                        cont = cont + 1;
                    }
                }
            } catch (error) {
                console.error('Error al procesar el mensaje:', error);
            }


        };

        // Maneja el evento de cierre de la conexión
        socket.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };

        // Maneja el evento de error en la conexión
        socket.onerror = (error) => {
            console.error('Error en la conexión WebSocket:', error);
        };

        // Limpia la conexión al desmontar el componente
        return () => {
            socket.close();
        };
    }, [grupo1]);

    useEffect(() => {
        const obtener = async () => {
            try {
                const { data } = await axios.get("https://teraflex.cl:9000/notificacion_infraccion/");
                setContador(data.registros.length);
                console.log(data.registros);
                setRegistros(data.registros);
            } catch (error) {
                console.log(error);
            }
        }
        obtener();

    }, [cont, prueba]);
    return (
        <div className='web'>
            {contextHolder}
            <div className="web-content">
                {
                    console.log(prueba)
                }
                <audio ref={audioRef}>
                    <source src={sonido} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>{currentData}</p>
                </Modal> */}
                {
                    currentData ? <div className="data">
                        {
                            base64 ? <img src={`data:image/jpeg;base64,${base64}`} className='image-socket' alt="Imagen" /> : <img src={not} className='image-socket' />
                        }

                        <div className="pat">
                            <CarOutlined />
                            <div className="pat-icon">
                                <p>Pantente:</p>
                                <p>{currentData}</p>
                            </div>

                        </div>
                        <div className="pat">
                            <EnvironmentOutlined />
                            <div className="pat-icon">
                                <p>Ubicacion:</p>
                                <p>{ubicacion}</p>
                            </div>
                        </div>

                    </div> : <Skeleton active className='carga' />
                    // Muestra el mensaje de carga o el mensaje recibido del servidor según sea necesario.
                }
                <div className="data-r">
                    <div className="data-g">
                        <div className="cantidad-pat">
                            <p className='cant'>Cantidad de patentes</p>
                            {
                                patentes ? <p className='num'>{patentes}</p> : <Skeleton active />
                            }
                        </div>
                        <div className="cantidad-pat">
                            <p className='cant'>Cantidad de Infracciones</p>
                            {
                                infracciones ? <p className='num'>{infracciones}</p> : <Skeleton active />
                            }
                        </div>
                    </div>
                    <ListaCamaras registros={registros} contador={contador} setPrueba={setPrueba} />
                </div>
            </div>
        </div>
    );
}

export default Websockets;
