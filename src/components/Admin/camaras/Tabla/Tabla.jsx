import React from 'react';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import axios from 'axios';
import Editar from '../Editar/Editar';

const Tabla = ({registros, reFetch, setLoading}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const eliminar = async (id) => {
        try {
            console.log(id);
            const res = await axios.delete(`https://teraflex.cl:9000/eliminar_camaras?id=${id}`);
            messageApi.open({
                type: 'success',
                content: 'Camara eliminada con exito!!',
            });
            console.log(res);
            reFetch();
            setLoading(true);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Error al eliminar la camara',
            });
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
            {contextHolder}
             <Table columns={columns} dataSource={registros} />
        </div>
    );
}

export default Tabla;
