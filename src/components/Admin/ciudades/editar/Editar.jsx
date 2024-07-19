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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/admin_enviar_datos_ciudad?id=${id}`
        );
        const { ciudades } = data;
        setNombre(ciudades[0].nombre);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Error al cargar datos!!",
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
      const { data } = await axios.post(`${API_URL}/admin_editar_ciudad/`, {
        id: id,
        nombre: nombre,
      });
      messageApi.open({
        type: "success",
        content: "Se ha editado correctamente!!",
      });
      form.resetFields();
      setOpen(false);
      reFetch();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error al editar ciudad!!",
      });
    } finally {
      setLoading(false);
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
        Editar ciudad
      </Button>
      <Drawer
        title="Editar ciudad"
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
                label="Nombre de la ciudad"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese nombre de la ciudad",
                  },
                ]}
              >
                <Input
                  placeholder="Por favor ingrese nombre de la ciudad"
                  defaultValue={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                  className="inputText"
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
