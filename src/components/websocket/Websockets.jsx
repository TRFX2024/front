import React, { useEffect, useState } from 'react';
import './websockets.css';

const Websockets = () => {
    const [datas, setData] = useState(new Set());
    const [base64, setBase64] = useState();
    const [patentes, setPatentes] = useState();
    const [ubicacion, setUbicacion] = useState();
    const [infracciones, setInfracciones] = useState();
    const [currentData, setCurrentData] = useState(null);
    const [contadorPatentes, setContadorPatentes] = useState(0);
    useEffect(() => {
        // Establece la conexión WebSocket
        const socket = new WebSocket('wss://teraflex.cl:9000/ws/porticos/');

        // Maneja el evento de apertura de la conexión
        socket.onopen = () => {
            console.log('Conexión WebSocket abierta');

            // Envía un mensaje al servidor

        };

        // Maneja el evento de recepción de mensajes
        socket.onmessage = (event) => {
            console.log(event.data);
            try {
                const { data } = JSON.parse(event.data);
                const { image } = JSON.parse(event.data);
                const {ubicacion} = JSON.parse(event.data);
                const {total_patentes} = JSON.parse(event.data);
                const {total_infracciones} = JSON.parse(event.data);
                console.log(image);
                if (!datas.has(data)) {
                    setCurrentData(data);
                    setBase64(image);
                    setUbicacion(ubicacion);
                    setPatentes(total_patentes);
                    setInfracciones(total_infracciones);
                    setData(prevSet => new Set(prevSet.add(data)));
                    setContadorPatentes(prevContador => prevContador + 1)
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
    }, []);

    return (
        <div className='web'>
            <h1>Patentes</h1>
            <div className="web-content">
                {
                    currentData ? <div className="data">
                        <img src={`data:image/jpeg;base64,${base64}`} className='image-socket' alt="Imagen" />
                        <div className="pat">
                            <p>Pantente</p>
                            <p>{currentData}</p>
                        </div>
                        <div className="pat">
                            <p>Ubicacion</p>
                            <p>{ubicacion}</p>
                        </div>

                    </div> : <p>Cargando...</p>  // Muestra el mensaje de carga o el mensaje recibido del servidor según sea necesario.
                }
                <div className="data-r">
                    <h1>Graficos</h1>
                    <div className="cantidad-pat">
                        <p>Cantidad de patentes</p>
                        <p>{patentes}</p>
                    </div>
                    <div className="cantidad-pat">
                        <p>Cantidad de Infracciones</p>
                        <p>{infracciones}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Websockets;
