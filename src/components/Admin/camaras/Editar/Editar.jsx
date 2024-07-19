import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import axios from "axios";
import { API_URL } from "../../../../constants/api";

const Editar = ({ reFetch, id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState();
  const [ubicacion, setUbicacion] = useState();
  const [ciudad, setCiudad] = useState([]);
  const [selectC, setSelectC] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin_ver_ciudades/`);
        setCiudad(res.data.ciudades);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Error al obtener las ciudades",
        });
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/admin_enviar_datos?id=${id}`
        );
        const { camaras } = data;
        setNombre(camaras[0].nombre);
        setUbicacion(camaras[0].ubicacion);
        setSelectC(camaras[0].ciudad.label);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Error al obtener la camara",
        });
      }
    };
    fetchData();
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const editar = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/admin_editar_camaras/`, {
        id: id,
        nombre: nombre,
        ubicacion: ubicacion,
        ciudad: selectC,
      });
      messageApi.open({
        type: "success",
        content: "Camara editada con exito!!",
      });
      form.resetFields();
      setOpen(false);
      reFetch();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error al editar camara",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="btn-crear"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Editar camara
      </Button>
      <Drawer
        title="Editar camara"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose} className="btn-h" loading={loading}>
              Cancelar
            </Button>
            <Button className="btn-c" onClick={editar} loading={loading}>
              Editar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nombre"
                label="Nombre de la camara"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese nombre de la camara",
                  },
                ]}
              >
                <Input
                  placeholder="Por favor ingrese nombre de la camara"
                  defaultValue={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                  className="inputText"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ubicacion"
                label="Ubicación"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese nombre de la ubicación",
                  },
                ]}
              >
                <Input
                  placeholder="Por favor ingrese nombre de la ubicación"
                  defaultValue={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  value={ubicacion}
                  className="inputText"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ciudad"
                label="Ciudad"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresar ciudad",
                  },
                ]}
              >
                <Select
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => setSelectC(e)}
                  options={ciudad}
                  defaultValue={selectC}
                  placeholder="Por favor seleccionar ciudad"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Editar;
