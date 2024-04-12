import React, { useState } from 'react';
import "./lista.css";
import ListaNegra from '../../components/Lista/ListaNegra/ListaNegra';
import { Input } from "antd";
import useFetch from '../../hook/useFetch';
import Crear from '../../components/Lista/Crear/Crear';
const Lista = () => {
    const [patente, setPatente] = useState('');
    const res = useFetch(`https://teraflex.cl:9000/lista_negra?patente=${patente}`)
    console.log(res.data);
    const { data } = res;
    const registros = data ? data.lista : [];

    return (
        <div className='lista'>
            <h1>Lista Negra</h1>
            <div className="bnts">
                <Input type="text" className="inputTexts" onChange={(e) => setPatente(e.target.value)} placeholder='Buscar patente' />
                <Crear />
            </div>
            <ListaNegra registros={registros} />
        </div>
    );
}

export default Lista;
