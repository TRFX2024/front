import React, { useState } from 'react';
import useFetch from '../../../hook/useFetch';
import { Input } from 'antd';
import Crear from '../../../components/Admin/ciudades/crear/Crear';
import Tabla from '../../../components/Admin/ciudades/tabla/Tabla';

const Ciudades = () => {
    const [usuario, setUsuario] = useState('');
    const { data, reFetch } = useFetch(`https://teraflex.cl:9000/admin_ver_ciudades_buscador?ciudad=${usuario}`)
    const registros = data ? data.ciudades : [];
    return (
        <div className='lista'>
            <h1>Ciudades</h1>
            <div className="bnts">
                <Input type="text" className="inputTexts" onChange={(e) => setUsuario(e.target.value)} placeholder='Buscar usuario' />
                <Crear reFetch={reFetch} />
            </div>
            <Tabla registros={registros} reFetch={reFetch} />
        </div>
    );
}

export default Ciudades;
