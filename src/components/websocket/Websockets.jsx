import React, { useEffect, useRef, useState } from "react";
import "./websockets.css";
import {
  CameraOutlined,
  CarOutlined,
  EnvironmentOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import ListaCamaras from "../listacamaras/ListaCamaras";
import {
  Skeleton,
  Space,
  Button,
  notification,
  Table,
  Modal,
  Image,
} from "antd";
import axios from "axios";
import not from "../../imgs/notFound.png";
import sonido from "../../imgs/sonido1.mp3";
let cont = 0;
let idA = 0;
let idB = 0;
import ReactPlayer from "react-player";
import { API_URL, SOCKET_URL } from "../../constants/api";

const Websockets = ({ grupo1 }) => {
  console.log(grupo1);
  const [datas, setData] = useState(new Set());
  const [api, contextHolder] = notification.useNotification();
  const [base64, setBase64] = useState();
  const [detalle, setDetalle] = useState();
  const [patentes, setPatentes] = useState();
  const [ubicacion, setUbicacion] = useState();
  const [camara, setCamara] = useState();
  const [infracciones, setInfracciones] = useState();
  const [currentData, setCurrentData] = useState(null);
  const [id, setId] = useState();
  const [img, setimg] = useState();
  const [ayuda, setAyuda] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idAlerta, setAlerta] = useState("");
  const [prueba, setPrueba] = useState(0);
  const [contador, setContador] = useState(0);
  const [registros, setRegistros] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [contadorPatentes, setContadorPatentes] = useState(0);
  const audioRef = useRef(null);
  const [reproducir, setRepro] = useState(false);
  const [reproducir2, setRepro2] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
      title: "Ciudad envia",
      dataIndex: "ciudad_envia__nombre",
      key: "ciudad_envia__nombre",
    },
    {
      title: "Comentario",
      dataIndex: "comentario",
      key: "comentario",
    },
    {
      title: "Ver imagen",
      key: "ver",
      render: (_, record) => (
        <Space size="middle">
          <Button className="btn-h" onClick={() => showModal(record.id)}>
            Ver Imagen
          </Button>
        </Space>
      ),
    },
  ];

  const obtenerDetalle = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/detalles_patentes/`);
      setDetalle(data.respuesta);
    } catch (error) {
      console.log(error);
    }
  };
  const closeMod = () => {
    setOpenModal(false);
  };
  const openMod = () => {
    obtenerDetalle();
    setOpenModal(!openModal);
  };
  const enviarId = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/visto_alerta?id=${id}`);
      api.destroy();

      setAyuda(!ayuda);
      setRepro(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const cerrar = () => {
    api.destroy();
    setRepro2(false);
  };
  const obtenerImg = async (id) => {
    try {
      const resp = await axios.get(`${API_URL}/ver_imagen_alerta?id=${id}`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(resp.data);
      setimg(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Establece la conexión WebSocket
    const socket = new WebSocket(`${SOCKET_URL}/ws/porticos/`);
    audioRef.current.load();

    // Maneja el evento de apertura de la conexión
    socket.onopen = () => {
      console.log("Conexión WebSocket abierta");
    };

    // Maneja el evento de recepción de mensajes
    socket.onmessage = (event) => {
      const { type, destino, patente, origen } = JSON.parse(event.data);
      if (type === "notificacion") {
        const { id_alerta } = JSON.parse(event.data);
        setAlerta(id_alerta);
        if (destino === grupo1) {
          api.open({
            message: "Alerta ciudad vecina",
            duration: 0,
            description: `La ciudad ${origen} informa que la patente ${patente} se dirige posiblemente a tu ciudad `,
            icon: (
              <SmileOutlined
                style={{
                  color: "#d91111",
                }}
              />
            ),
            btn: btnC,
          });
          setRepro(true);
        }
      }
      try {
        const {
          data,
          image,
          ubicacion,
          total_patentes,
          total_infracciones,
          infraccion,
          carpeta,
        } = JSON.parse(event.data);
        setCurrentData(data);
        setBase64(image);
        setCamara(carpeta);
        setUbicacion(ubicacion);
        setPatentes(total_patentes);
        setInfracciones(total_infracciones);
        setId(infraccion);
        setData((prevSet) => new Set(prevSet.add(data)));
        setContadorPatentes((prevContador) => prevContador + 1);
        if (infraccion === 2) {
          api.open({
            message: "Alerta infracción",
            duration: 0,
            description: `La patente ${data} tiene infracción `,
            icon: (
              <SmileOutlined
                style={{
                  color: "#d91111",
                }}
              />
            ),
            btn: botonCerrar,
          });
          setRepro2(true);

          cont = cont + 1;
        }
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
      }
    };

    // Maneja el evento de cierre de la conexión
    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada");
    };

    // Maneja el evento de error en la conexión
    socket.onerror = (error) => {
      console.error("Error en la conexión WebSocket:", error);
    };

    // Limpia la conexión al desmontar el componente
    return () => {
      socket.close();
    };
  }, [grupo1]);

  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/notificacion_infraccion/`);
        setContador(data.registros.length);
        setRegistros(data.registros);
      } catch (error) {
        console.log(error);
      }
    };
    obtener();
  }, [cont, prueba]);
  //Obtener notificacion alertar
  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/alerta_ciudades_noti/`);
        setAlertas(data.alertas);
      } catch (error) {
        console.log(error);
      }
    };
    obtener();
  }, [ayuda]);

  const btnC = (
    <Space>
      <Button type="primary" size="small" onClick={() => enviarId(idA)}>
        Confirmar
      </Button>
    </Space>
  );
  const botonCerrar = (
    <Space>
      <Button type="primary" size="small" onClick={cerrar}>
        Confirmar
      </Button>
    </Space>
  );
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (id) => {
    obtenerImg(id);
    setIsModalOpen(true);
  };

  idA = idAlerta;
  return (
    <div className="web">
      {contextHolder}
      <div className="web-content">
        <audio ref={audioRef} autoPlay>
          <source src={sonido} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <ReactPlayer
          style={{ position: "absolute" }}
          url={sonido}
          playing={reproducir}
          loop={true}
        />
        <ReactPlayer
          style={{ position: "absolute" }}
          url={sonido}
          playing={reproducir2}
          loop={true}
        />
        {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>{currentData}</p>
                </Modal> */}
        {
          currentData ? (
            <div className="data">
              {base64 ? (
                <img
                  src={`data:image/jpeg;base64,${base64}`}
                  className="image-socket"
                  alt="Imagen"
                />
              ) : (
                <img src={not} className="image-socket" />
              )}

              <div className="pat">
                <CarOutlined />
                <div className="pat-icon">
                  <p>Patente:</p>
                  <p>{currentData}</p>
                </div>
              </div>
              <div className="pat">
                <CameraOutlined />
                <div className="pat-icon">
                  <p>Camara:</p>
                  <p>{camara}</p>
                </div>
              </div>
              <div className="pat">
                <EnvironmentOutlined />
                <div className="pat-icon">
                  <p>Ubicacion:</p>
                  <p>{ubicacion}</p>
                </div>
              </div>
            </div>
          ) : (
            <Skeleton active className="carga" />
          )
          // Muestra el mensaje de carga o el mensaje recibido del servidor según sea necesario.
        }
        <div className="data-r">
          <div className="data-g">
            <div className="cantidad-pat">
              <p className="cant">Cantidad de Infracciones</p>
              {infracciones ? (
                <p className="num">{infracciones}</p>
              ) : (
                <Skeleton
                  active
                  paragraph={{
                    rows: 2,
                  }}
                />
              )}
            </div>
            <div className="cantidad-pat" onClick={openMod}>
              <p className="cant">Cantidad de patentes</p>
              {patentes ? (
                <p className="num">{patentes}</p>
              ) : (
                <Skeleton
                  active
                  paragraph={{
                    rows: 2,
                  }}
                />
              )}
              <Modal
                title="Detalles patentes tomadas por portico"
                open={openModal}
                onCancel={closeMod}
                className="modPor"
                footer={[
                  <Button className="btn-h" onClick={closeMod}>
                    Cerrar
                  </Button>,
                ]}
              >
                {detalle ? (
                  detalle.map((de) => (
                    <div className="detalle">
                      <h1>{de.carpeta}: </h1>
                      <h1>{de.cantidad_registros}</h1>
                    </div>
                  ))
                ) : (
                  <Skeleton active />
                )}
              </Modal>
            </div>
          </div>
          <ListaCamaras
            registros={registros}
            contador={contador}
            setPrueba={setPrueba}
          />
          <div className="camera-list">
            <h1>Alertas</h1>
            <div className="cam">
              <div className="camera-cont">
                <Table columns={columns} dataSource={alertas} />
                <Modal
                  title="Imagen"
                  open={isModalOpen}
                  onCancel={handleCancel}
                  className="modal"
                  footer={[
                    <Button className="btn-h" onClick={handleCancel}>
                      Cerrar
                    </Button>,
                  ]}
                >
                  {img && <Image src={img} fallback={not} />}
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Websockets;
