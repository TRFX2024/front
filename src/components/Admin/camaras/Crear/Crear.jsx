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

const Crear = ({ reFetch, setLoading }) => {
  const [loading, setLoadings] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState();
  const [ubicacion, setUbicacion] = useState();
  const [ciudad, setCiudad] = useState([]);
  const [selectC, setSelectC] = useState();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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

  const agregar = async () => {
    try {
      setLoadings(true);
      const res = await axios.post(`${API_URL}/admin_crear_camaras/`, {
        nombre: nombre,
        ubicacion: ubicacion,
        ciudad: selectC,
      });
      messageApi.open({
        type: "success",
        content: "Camara creada con exito!!",
      });
      form.resetFields();
      setOpen(false);
      reFetch();
      setLoading(true);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error al crear la camara",
      });
    } finally {
      setLoadings(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <Button
        className="btn-crear"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Crear camara
      </Button>
      <Drawer
        title="Crear nueva camara"
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
            <Button onClick={agregar} className="btn-c" loading={loading}>
              Crear
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

export default Crear;
