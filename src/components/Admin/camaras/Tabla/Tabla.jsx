import React from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import axios from 'axios';
import Editar from '../Editar/Editar';

const Tabla = ({registros, reFetch}) => {
    const eliminar = async (id) => {
        try {
            console.log(id);
            const res = await axios.delete(`https://teraflex.cl:9000/eliminar_camaras?id=${id}`);
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
            title: 'Nombre camara',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Ciudad',
            dataIndex: 'ciudad',
            key: 'ciudad',
        },
        {
            title: 'Ubicacion',
            dataIndex: 'ubicacion',
            key: 'ubicacion',
        },
        {
            title: 'Eliminar',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Eliminar camara"
                        description="¿Estas seguro de que quieres eliminar la camara?"
                        onConfirm={()=>eliminar(record.id)}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button danger>Eliminar</Button>
                    </Popconfirm>
                </Space>
            ),
        },
        {
            title: 'Editar',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Editar id={record.id} reFetch={reFetch}/>
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

export default Tabla;
