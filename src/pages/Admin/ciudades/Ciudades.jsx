import React, { useState } from "react";
import useFetch from "../../../hook/useFetch";
import { Input, Spin } from "antd";
import Crear from "../../../components/Admin/ciudades/crear/Crear";
import Tabla from "../../../components/Admin/ciudades/tabla/Tabla";
import { API_URL } from "../../../constants/api";

const Ciudades = () => {
  const [usuario, setUsuario] = useState("");
  const { data, reFetch, loading } = useFetch(
    `${API_URL}/admin_ver_ciudades_buscador?ciudad=${usuario}`
  );
  const registros = data ? data.ciudades : [];
  return (
    <div className="lista1">
      <div className="">
        <h1>Ciudades</h1>
        <div className="bnts">
          <Input
            type="text"
            className="inputTexts"
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Buscar usuario"
          />
          <Crear reFetch={reFetch} />
        </div>
        <Tabla registros={registros} reFetch={reFetch} />
      </div>
      {/* {
                loading ? (<div className="">
                <h1>Ciudades</h1>
                <div className="bnts">
                    <Input type="text" className="inputTexts" onChange={(e) => setUsuario(e.target.value)} placeholder='Buscar usuario' />
                    <Crear reFetch={reFetch} />
                </div>
                <Tabla registros={registros} reFetch={reFetch} />
            </div>) : (<Spin className='spin' size='large' />)
            } */}
    </div>
  );
};

export default Ciudades;
