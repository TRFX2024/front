import { Space, Table } from 'antd';
import React from 'react';
import Editar from '../editar/Editar';
import Vincular from '../Vincular/Vincular';

const Tabla = ({ registros, reFetch }) => {
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre ciudad',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Editar',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Editar id={record.id} reFetch={reFetch} />
                </Space>
            ),
        },
        {
            title: 'Vincular ciudad(es) vecinas',
            key: 'ver',
            render: (_, record) => (
                <Space size="middle">
                    <Vincular id={record.id} nombre={record.nombre} reFetch={reFetch}/>
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
