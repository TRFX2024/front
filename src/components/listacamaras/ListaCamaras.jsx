import React, { useEffect, useState } from "react";
import "./listacamaras.css";
import axios from "axios";
import { API_URL } from "../../constants/api";
import not from "../../imgs/notFound.png";

import {
  Table,
  Space,
  Button,
  Badge,
  Modal,
  Checkbox,
  Input,
  Image,
} from "antd";

const ListaCamaras = ({ registros, contador, setPrueba }) => {
  // const [camaras, setCamaras] = useState([]);
  // useEffect(() => {
  //     const obtener = async () => {
  //         try {
  //             const { data } = await axios.get("${API_URL}/porticos_monitoreo/");
  //             setCamaras(data.camaras);
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     }
  //     obtener();
  // }, []);
  const [comentarios, setComentarios] = useState();
  const [ciudades, setCiudades] = useState([]);
  const [id, setId] = useState();
  const [ciudad, setCiudad] = useState([]);
  const [img, setimg] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const checkValues = (c) => {
    console.log(c);
    setCiudades(c);
  };
  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/ciudades_vecinas/`);
        console.log(data.data);
        setCiudad(data.data);
        const todasMarcadas = data.data.map((ciu) => ciu.destino__nombre);
        setCiudades(todasMarcadas);
      } catch (error) {
        console.log(error);
      }
    };
    obtener();
  }, []);

  const enviar = async () => {
    try {
      const res = await axios.post(`${API_URL}/ingresar_comentario/`, {
        id: id,
        comentario: comentarios,
        ciudades: ciudades,
      });
      console.log(res);
      setIsModalOpen(false);
      setPrueba((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerImg = async (id) => {
    try {
      const resp = await axios.get(
        `${API_URL}/ver_imagen_infraccion?id=${id}`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(resp.data);
      setimg(url);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (id) => {
    console.log(id);
    setId(id);
    setIsModalOpen(true);
  };
  const showModal2 = (id) => {
    obtenerImg(id);
    setIsModalOpen2(true);
  };
  const handleOk = () => {
    setIsModalOpen2(false);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen2(false);
    setIsModalOpen(false);
  };

  const options = ciudad.map((ciu) => ({
    label: ciu.destino__nombre,
    value: ciu.destino__nombre,
  }));

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Patente",
      dataIndex: "patente",
      key: "patente",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Infraccion",
      dataIndex: "nombre_infraccion",
      key: "nombre_infraccion",
    },
    {
      title: "Agregar comentario",
      key: "ver",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record.id)} className="btn-h">
            Agregar Comentario
          </Button>
        </Space>
      ),
    },
    {
      title: "Ver imagen",
      key: "ver",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModal2(record.id)} className="btn-h">
            Ver imagen
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Badge count={contador} className="badge">
      <div className="camera-list">
        <h1>Infracciones</h1>
        <div className="cam">
          <div className="camera-cont">
            {/* {
                        camaras.map(camara => (
                            <div className="camera1">
                                <div className="cam1">
                                    <CameraOutlined />
                                    <p>CAMARA:</p>
                                    <p>{camara.camara}</p>
                                </div>
                                <div className="cam2">
                                    <EnvironmentOutlined />
                                    <p>UBICACION:</p>
                                    <p>{camara.ubicacion}</p>
                                </div>

                            </div>

                        ))
                    } */}
            <Table columns={columns} dataSource={registros} />
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              onOk={handleOk}
              footer={[
                <Button onClick={handleCancel} className="btn-h">
                  Cerrar
                </Button>,
                <Button onClick={enviar} className="btn-c">
                  Enviar
                </Button>,
              ]}
            >
              <h1>Agregar comentario y enviar</h1>
              <div className="coment">
                <p>Agregar Comentario</p>
                <Input.TextArea
                  placeholder="Ingresa tu comentario"
                  className="coment-text"
                  onChange={(e) => setComentarios(e.target.value)}
                />
              </div>
              <div className="enviar">
                <p>Ciudades para enviar notificacion</p>
                <Checkbox.Group
                  options={options}
                  className="check"
                  onChange={checkValues}
                />
              </div>
            </Modal>
            <Modal
              title="Imagen Infracción"
              open={isModalOpen2}
              onCancel={handleCancel}
              onOk={handleOk}
              className="modal"
              footer={[
                <Button onClick={handleCancel} className="btn-h">
                  Cerrar
                </Button>,
              ]}
            >
              {img && <Image src={img} fallback={not} />}
            </Modal>
          </div>
        </div>
      </div>
    </Badge>
  );
};

export default ListaCamaras;
