import React, { useState } from "react";
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
const { Option } = Select;
import axios from "axios";
import { API_URL } from "../../../constants/api";

const Crear = ({ reFetch }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [patente, setPatente] = useState();
  const [motivo, setMotivo] = useState();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const agregar = async () => {
    try {
      const res = await axios.post(`${API_URL}/agregar_patente_negra/`, {
        patente: patente,
        motivo: motivo,
      });
      form.resetFields();
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "Se ha agregado correctamente!!",
      });
      reFetch();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error al querer agregar!!",
      });
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
        Agregar patente
      </Button>
      <Drawer
        title="Agregar nueva patente"
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
            <Button onClick={onClose} className="btn-h">
              Cancelar
            </Button>
            <Button onClick={agregar} className="btn-c">
              Ingresar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="patente"
                label="Patente"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese patente",
                  },
                ]}
              >
                <Input
                  placeholder="Por favor ingrese patente"
                  onChange={(e) => setPatente(e.target.value)}
                  value={patente}
                  className="inputText"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="motivo"
                label="Motivo"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresar motivo",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Por favor ingresar motivo"
                  onChange={(e) => setMotivo(e.target.value)}
                  value={motivo}
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

export default Crear;
