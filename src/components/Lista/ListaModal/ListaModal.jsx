import React, { useState } from 'react';
import { Table } from 'antd';

const ListaModal = ({detalle, patente}) => {
    const columns = [
        {
            title: 'Camara',
            dataIndex: 'nombre_camara',
            key: 'nombre_camara',
        },
        {
            title: 'Ubicacion',
            dataIndex: 'ubicacion_carpeta',
            key: 'ubicacion_carpeta',
        },
        {
            title: 'Fecha Hora',
            dataIndex: 'fecha_hora',
            key: 'fecha_hora',
        },
        {
            title: 'Observacion',
            dataIndex: 'observacion',
            key: 'observacion',
        },
    ];
    return (
        <div className='listamodal'>
            <h1>Registro de patente: {patente}</h1>
            <Table columns={columns} dataSource={detalle} />
        </div>
    );
}

export default ListaModal;
