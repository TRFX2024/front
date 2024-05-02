import React, { useState } from 'react';
import "./lista.css";
import ListaNegra from '../../components/Lista/ListaNegra/ListaNegra';
import { Input } from "antd";
import useFetch from '../../hook/useFetch';
import Crear from '../../components/Lista/Crear/Crear';
const Lista = () => {
    const [patente, setPatente] = useState('');
    const {data, reFetch} = useFetch(`https://teraflex.cl:9000/lista_negra?patente=${patente}`)
    const registros = data ? data.lista : [];

    return (
        <div className='lista'>
            <h1>Lista Negra</h1>
            <div className="bnts">
                <Input type="text" className="inputTexts" onChange={(e) => setPatente(e.target.value)} placeholder='Buscar patente' />
                <Crear reFetch={reFetch} />
            </div>
            <ListaNegra registros={registros} reFetch={reFetch} />
        </div>
    );
}

export default Lista;
