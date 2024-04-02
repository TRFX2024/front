import React from 'react';
import './tablahistorico.css';
import { Space, Table, Tag } from 'antd';
const TablaHistorico = ({registros}) => {
    console.log(registros);
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
        }
        
    ];
   
    return (
        <div>
            <Table columns={columns}  dataSource={registros} />
        </div>
    );
}

export default TablaHistorico;
