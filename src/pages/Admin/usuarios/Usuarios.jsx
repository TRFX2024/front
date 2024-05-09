import React, { useState } from 'react';
import './usuarios.css';
import TablaUser from '../../../components/Admin/usuarios/tablaUser/tablaUser';
import Crear from '../../../components/Admin/usuarios/crear/Crear';
import useFetch from '../../../hook/useFetch';
import { Input, Spin } from 'antd';
const Usuarios = () => {
    const [usuario, setUsuario] = useState('');
    const { data, reFetch, loading } = useFetch(`https://teraflex.cl:9000/admin_ver_usuarios?username=${usuario}`)
    const registros = data ? data.usuarios : [];
    return (
        <div className='lista1'>
            <div className="">
                <h1>Usuarios</h1>
                <div className="bnts">
                    <Input type="text" className="inputTexts" onChange={(e) => setUsuario(e.target.value)} placeholder='Buscar usuario' />
                    <Crear reFetch={reFetch} />
                </div>
                <TablaUser registros={registros} reFetch={reFetch} />
            </div>
            {/* {
                loading ?  (<div className="">
                <h1>Usuarios</h1>
                <div className="bnts">
                    <Input type="text" className="inputTexts" onChange={(e) => setUsuario(e.target.value)} placeholder='Buscar usuario' />
                    <Crear reFetch={reFetch} />
                </div>
                <TablaUser registros={registros} reFetch={reFetch} />
            </div>) : (<Spin className='spin' size='large' />)
            } */}
           
        </div>
    );
}

export default Usuarios;
