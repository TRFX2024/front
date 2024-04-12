import React, { useEffect, useState } from 'react';
import './listacamaras.css';
import axios from 'axios';
import { Table, Space, Button, Badge, Modal, Checkbox, Input } from 'antd';

const ListaCamaras = ({ registros, contador, setPrueba }) => {
    // const [camaras, setCamaras] = useState([]);
    // useEffect(() => {
    //     const obtener = async () => {
    //         try {
    //             const { data } = await axios.get("https://teraflex.cl:9000/porticos_monitoreo/");
    //             setCamaras(data.camaras);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     obtener();
    // }, []);
    const [comentarios, setComentarios] = useState();
    const [ciudades, setCiudades] = useState([]);
    const [id, setId]= useState();
    const [ciudad, setCiudad] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const checkValues = (c) =>{
        console.log(c);
        setCiudades(c);
    }
    useEffect(() => {
        const obtener = async () => {
            try {
                const { data } = await axios.get("https://teraflex.cl:9000/ciudades_vecinas/");
                console.log(data.data);
                setCiudad(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        obtener();

    }, []);

    const enviar = async() =>{
        try {
            const res = await axios.post("https://teraflex.cl:9000/ingresar_comentario/", {
                id: id,
                comentario: comentarios,
                ciudades: ciudades,
            } );
            console.log(res);
            setIsModalOpen(false);
            setPrueba(prev => prev + 1)
        } catch (error) {
            console.log(error); 
        }
    }

    const showModal = (id) => {
        console.log(id);
        setId(id);
        setIsModalOpen(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const options = ciudad.map(ciu => ({
        label: ciu.destino__nombre,
        value: ciu.destino__nombre,
    }))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Patente',
            dataIndex: 'patente',
            key: 'patente',
        },
        {
            title: 'Infraccion',
            dataIndex: 'nombre_infraccion',
            key: 'nombre_infraccion',
        }, {
            title: 'Ver imagen',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={()=> showModal(record.id)}   className='btn-h'>Agregar Comentario</Button>
                </Space>
            ),
        },
    ]

    return (
        <Badge count={contador} className='badge'>
            <div className='camera-list'>
                <h1>Notificación de infracción</h1>
                <div className="cam">
                    <div className="camera-cont">
                        {/* {
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
                    } */}
                        <Table columns={columns} dataSource={registros} />
                        <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleOk} footer={[
                            <Button onClick={handleCancel} className='btn-h'>Cerrar</Button>,
                            <Button onClick={enviar} className='btn-c'>Enviar</Button>
                        ]}>
                            <h1>Agregar comentario y enviar</h1>
                            <div className="coment">
                                <p>Agregar Comentario</p>
                                <Input.TextArea placeholder="Ingresa tu comentario" className='coment-text' onChange={(e) => setComentarios(e.target.value)} />
                            </div>
                            <div className="enviar">
                                <p>Ciudades para enviar notificacion</p>
                                <Checkbox.Group options={options} className='check' onChange={checkValues} />
                            </div>
                        </Modal>
                    </div>
                </div>

            </div>
        </Badge>
    );
}

export default ListaCamaras;
