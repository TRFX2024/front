import React, { useEffect, useState } from 'react';
import './tablahistorico.css';
import { Image, Modal, Space, Table, Tag, Button } from 'antd';
import axios from 'axios';

const TablaHistorico = ({ registros }) => {
    const [img, setimg] = useState({});
    const [alertas, setAlertas] = useState([]);
    const [comentario, setComentario] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenC, setIsModalOpenC] = useState(false);
    useEffect(() => {
        const data = async()=>{
            try {
                const res = await axios.get('https://teraflex.cl:9000/alerta_ciudades/');
                console.log(res.data.alertas);
                setAlertas(res.data.alertas);
            } catch (error) {
                console.log(error);
            }
        }
        data();
        
    }, []);
    const obtenerImg = async (id) => {
        try {
            const resp = await axios.get(`https://teraflex.cl:9000/ver_imagen?id=${id}`, { responseType: 'blob' });
            const url = URL.createObjectURL(resp.data);
            setimg(url);
        } catch (error) {
            console.log(error);
        }

    }
    const obtenerCom = async (id) => {
        try {
            const resp = await axios.get(`https://teraflex.cl:9000/comentario_infraccion?id=${id}`);
            console.log(resp.data.comentario);
            setComentario(resp.data.comentario.observacion);
        } catch (error) {
            console.log(error);
        }

    }
   
    const showModal = (id) => {
        obtenerImg(id);
        setIsModalOpen(true);
    };
    const verComentario = (id) => {
        obtenerCom(id);
        setIsModalOpenC(true);
    }
      
    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalOpenC(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenC(false);
    };
    
    const columnsAlert = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ciudad que envia',
            dataIndex: 'ciudad_envia__nombre',
            key: 'ciudad_envia__nombre',
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            estado: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        },
        {
            title: 'Patente',
            dataIndex: 'patente',
            key: 'patente',
        },
        {
            title: 'Comentario',
            dataIndex: 'comentario',
            key: 'comentario',
        }
    ]

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
            title: 'Fecha Hora',
            dataIndex: 'fecha_hora',
            key: 'fecha_hora',
        },
        {
            title: 'Infraccion',
            dataIndex: 'infraccion__descripcion',
            key: 'infraccion__descripcion',
        },
        {
            title: 'Ver imagen',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Button className='btn-h' onClick={() => showModal(record.id)}>Ver Imagen</Button>
                </Space>
            ),
        },
        {
            title: 'Comentario',
            key: 'comentario',
            render: (_, record) => (
                <Space size="middle">
                    {
                        record.infraccion__descripcion ? <Button className='btn-h' onClick={()=> verComentario(record.id)}>Comentario</Button> : <p> </p>
                    }
                </Space>
            ),
        }

    ];

    return (
        <div>
            <Table columns={columns} dataSource={registros} className='table-h' />
            <Table columns={columnsAlert} dataSource={alertas} />
            <Modal title="Imagen" open={isModalOpen} onCancel={handleCancel} img={img} className='modal' footer={[
                <Button className='btn-h' onClick={handleCancel}>Cerrar</Button>
            ]}>
                <Image src={img} alt="" className='imgModal'/>
                
            </Modal>
            <Modal title="Comentario" open={isModalOpenC} onOk={handleOk} onCancel={handleCancel} img={img} className='modals' footer={[
                <Button className='btn-h' onClick={handleCancel}>Cerrar</Button>
            ]}>
                <p>{comentario}</p>
            </Modal>

        </div>
    );
}

export default TablaHistorico;
