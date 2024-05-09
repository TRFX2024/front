import React, { useEffect, useState } from 'react';
import './dashboard.css';
import axios from 'axios';
import PieBar from '../../../components/Admin/dashboard/PieBar/PieBar';
import { Button, Modal, Select, Spin } from 'antd'
import Bar from '../../../components/Admin/dashboard/Bar/Bar';
import Exportar from '../../../components/Admin/dashboard/Exportar/Exportar';
const Dashboard = () => {

  const [datos1, setDatos1] = useState();
  const [id, setId] = useState(0);
  const [ayuda, setAyuda] = useState(false);
  const [datos3, setDatos3] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const obtener = async () => {
      try {
        console.log(id);
        const { data } = await axios.get(`https://teraflex.cl:9000/admin_conteo_datos?id=${id}`);
        console.log(data);
        setAyuda(!ayuda);
        // setDatos2(data.datos2);
        setDatos1(data.datos1);
        setDatos3(data.datos3);
        // setDatos4(data.datos4);

      } catch (error) {
        console.log(error);
      }
    }
    obtener();
  }, [id]);

  const handleChange = (value) => {
    console.log(value);
    setId(value)
  }

  return (
    <div className='dash'>
      {
        datos1 ? (<div className="dash-cont">
          <div className="datos">
            <h1>Dashboard</h1>
            <Button className='btn-h' onClick={showModal}>Exportar Datos</Button>
            <Modal title="Exportar Datos" open={isModalOpen} className='modal1' footer={[]}>
              <Exportar setIsModalOpen={setIsModalOpen} />
            </Modal>
            <div className="cont">
              <Select options={datos3} style={{
                width: "40%",

              }} placeholder='Selecciones ciudad' onChange={handleChange} />
            </div>
          </div>
          <div className="pieBar">
            <PieBar ayuda={ayuda} id={id} />
          </div>
          <div className="contadores">
            <div className="cantidad-pat1">
              {
                datos1.arreglo.map((item) => (
                  <div className="cant-pat1">
                    <p>{item.name}</p>
                    <p className='number'>{item.value}</p>
                  </div>

                ))
              }
            </div>
          </div>
          <div className="">
            <Bar ayuda={ayuda} id={id} />
          </div>
        </div>) : (<Spin className='spin' size='large' />)
      }

    </div>
  );
}

export default Dashboard;
