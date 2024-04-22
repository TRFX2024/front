import React, { useState } from 'react';
import './listanegra.css';
import { Table, Space, Modal } from 'antd';
import axios from 'axios';
import ListaModal from '../ListaModal/ListaModal';
import { Button, message } from 'antd';
import { Popconfirm } from 'antd';


const ListaNegra = ({ registros }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patente, setPatente] = useState();
    const [detalle, setDetalle] = useState([]);
    const obtenerRegistro = async (patente) => {
        try {
            const resp = await axios.get(`https://teraflex.cl:9000/detalles_lista_negra?patente=${patente}`)
            const { data } = resp;
            const { lista } = data;
            console.log(lista);
            setDetalle(lista);

        } catch (error) {
            console.log(error);
        }
    }
    const elimnar = async (id) => {
        try {
            await axios.delete(`https://teraflex.cl:9000/eliminar_lista_negra?id=${id}`)
            messageApi.open({
                type: 'success',
                content: 'This is a success message',
            });
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'This is an error message',
            });
            console.log(error);
        }
    }

    const handleOk = () => {
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);

    };
    const showModal = (patente) => {
        console.log(patente);
        obtenerRegistro(patente);
        setPatente(patente);
        setIsModalOpen(true);
    };
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
            title: 'Motivo',
            dataIndex: 'motivo',
            key: 'motivo',
        },
        {
            title: 'Ciudad',
            dataIndex: 'ciudad',
            key: 'ciudad',
        },
        {
            title: 'Usuario',
            dataIndex: 'usuario__username',
            key: 'usuario__username',
        },
        {
            title: 'Ver registro',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Button className='btn-h' onClick={() => showModal(record.patente)}>Detalles</Button>
                </Space>
            ),
        },
        {
            title: 'Eliminar Patente',
            key: "delete",
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Eliminar patente de lista negra"
                        description="¿Estas seguro de que quieres eliminar la patente?"
                        onConfirm={()=>elimnar(record.id)}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button danger>Eliminar</Button>
                    </Popconfirm>
                </Space>
            )
        }

    ];
    return (
        <div className='listanegra'>
            {contextHolder}
            <Table columns={columns} dataSource={registros} />
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                className='modal' footer={[
                    <Button className='btn-h' onClick={handleCancel}>Cerrar</Button>
                ]}>
                <ListaModal detalle={detalle} patente={patente} />
            </Modal>
        </div>
    );
}

export default ListaNegra;