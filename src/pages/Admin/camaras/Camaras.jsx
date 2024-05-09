import React, { useState } from 'react';
import useFetch from '../../../hook/useFetch';
import { Input, Spin } from 'antd';
import Crear from '../../../components/Admin/camaras/Crear/Crear';
import Tabla from '../../../components/Admin/camaras/Tabla/Tabla';
import './camaras.css';
const Camaras = () => {
    const [camaras, setCamaras] = useState('');
    const { data, reFetch, loading, setLoading } = useFetch(`https://teraflex.cl:9000/admin_ver_camaras?camara=${camaras}`)
    const registros = data ? data.carpetas : [];
    const [carga, setCarga] = useState(false);
    console.log(loading);
    
    return (

        <div className='lista1'>
            {/* {loading || carga ? (<div className="">
                <h1>Camaras</h1>
                <div className="bnts">
                    <Input type="text" className="inputTexts" onChange={(e) => setCamaras(e.target.value)} placeholder='Buscar camara' />
                    <Crear reFetch={reFetch} setLoading={setCarga} />
                </div>
                <Tabla registros={registros} reFetch={reFetch} setLoading={setCarga} />
            </div>) : (<Spin className='spin' size='large' />)
            } */}
            <div className="">
                <h1>Camaras</h1>
                <div className="bnts">
                    <Input type="text" className="inputTexts" onChange={(e) => setCamaras(e.target.value)} placeholder='Buscar camara' />
                    <Crear reFetch={reFetch} setLoading={setCarga} />
                </div>
                <Tabla registros={registros} reFetch={reFetch} setLoading={setCarga} />
            </div>

        </div >
    );
}

export default Camaras;
