import React, { useState } from 'react';
import "./historial.css";
import { Select, Space } from 'antd';
import useFetch from '../../hook/useFetch';
import TablaHistorico from '../../components/tablaHistorico/TablaHistorico';
const Historial = () => {
    const [patente, setPatente] = useState("");
    const [filtro, setFiltro] = useState("");
    const res = useFetch(`https://teraflex.cl:9000/historial_patentes?patente=${patente}&filtro=${filtro}`);
    const { data } = res;
    const registros = data ? data.registros : [];
    

    const handleChange = (value) => {
        setFiltro(value);
        console.log(`${value}`);
      }
    return (
        <div className='historial'>
            <h1>Historial</h1>
            <input type="text" onChange={(e) => setPatente(e.target.value)} placeholder='' />
            <Space wrap>
                <Select
                    defaultValue="Sin Filtro"
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: '1',
                            label: 'Sin Filtro',
                        },
                        {
                            value: '2',
                            label: 'Lista Negra',
                        },
                        {
                            value: '3',
                            label: 'SEBV',
                        },
                        {
                            value: '4',
                            label: 'Aseguradora',
                        },
                    ]}
                />
            </Space>
            <div className="">
                <TablaHistorico registros={registros} />
            </div>
        </div>
    );
}

export default Historial;
