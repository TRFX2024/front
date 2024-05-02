import React, { useState } from 'react';
import useFetch from '../../../hook/useFetch';
import { Input } from 'antd';
import Crear from '../../../components/Admin/camaras/Crear/Crear';
import Tabla from '../../../components/Admin/camaras/Tabla/Tabla';
const Camaras = () => {
    const [camaras, setCamaras] = useState('');
    const { data, reFetch } = useFetch(`https://teraflex.cl:9000/admin_ver_camaras?camara=${camaras}`)
    const registros = data ? data.carpetas : [];
    return (
        <div className='lista'>
            <h1>Camaras</h1>
            <div className="bnts">
                <Input type="text" className="inputTexts" onChange={(e) => setCamaras(e.target.value)} placeholder='Buscar camara' />
                <Crear reFetch={reFetch} />
            </div>
            <Tabla registros={registros} reFetch={reFetch} />
        </div>
    );
}

export default Camaras;
