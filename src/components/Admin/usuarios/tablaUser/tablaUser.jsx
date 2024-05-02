import { Button, Popconfirm, Space, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import Vincular from '../vincular/Vincular';

const TablaUser = ({registros, reFetch}) => {
    const onClose = async  (id) => {
        try {
            console.log(id);
            const res = await axios.post(`https://teraflex.cl:9000/admin_logout_usuarios?id=${id}`);
            console.log(res);
        } catch (error) {
            console.log(error); 
        }
    }
    const eliminar = async (id) => {
        try {
            console.log(id);
            const res = await axios.delete(`https://teraflex.cl:9000/eliminar_usuario?id=${id}`);
            console.log(res);
            reFetch();
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre Usuario',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Ciudad',
            dataIndex: 'ciudad',
            key: 'ciudad',
        },
        {
            title: 'Vincular',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Vincular id={record.id} nombre={record.nombre} reFetch={reFetch}/>
                </Space>
            ),
        },
        {
            title: 'Cerrar sesión',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Button className='btn-h' onClick={()=>onClose(record.id)}>Cerrar sesión</Button>
                </Space>
            ),
        },
        {
            title: 'Eliminar',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Eliminar usuario"
                        description="¿Estas seguro de que quieres eliminar el usuario?"
                        onConfirm={()=>eliminar(record.id)}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button danger>Eliminar</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

   

    return (
        <div>
             <Table columns={columns} dataSource={registros} />
        </div>
    );
}

export default TablaUser;
