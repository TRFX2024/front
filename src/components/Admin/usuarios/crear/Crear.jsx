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
import axios from "axios";
import { API_URL } from "../../../../constants/api";

const Crear = ({ reFetch }) => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPass] = useState();
  const [rePass, setRePass] = useState();
  const [grupo, setGrupo] = useState();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const agregar = async () => {
    if (password !== rePass) {
      messageApi.open({
        type: "error",
        content: "Las contraseñas no coinciden!",
      });
    } else {
      try {
        setLoading(true);
        const res = await axios.post(`${API_URL}/admin_crear_usuario/`, {
          username: username,
          password: password,
          grupo: grupo,
        });
        messageApi.open({
          type: "success",
          content: "Usuario creado correctamente!",
        });
        form.resetFields();
        setOpen(false);
        reFetch();
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Error al crear usuario!",
        });
      } finally {
        setLoading(false);
      }
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
        Crear usuario
      </Button>
      <Drawer
        title="Crear nuevo usuario"
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
                name="username"
                label="Nombre de usuario"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese Nombre de usuario",
                  },
                ]}
              >
                <Input
                  placeholder="Por favor ingrese nombre de usuario"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="inputText"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="grupo"
                label="Ciudad"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese nombre de grupo",
                  },
                ]}
              >
                <Input
                  placeholder="Por favor ingrese nombre de grupo"
                  onChange={(e) => setGrupo(e.target.value)}
                  value={grupo}
                  className="inputText"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresar contraseña",
                  },
                ]}
              >
                <Input
                  placeholder="Por favor ingresar contraseña"
                  onChange={(e) => setPass(e.target.value)}
                  value={password}
                  className="inputText"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="rePass"
                label="Repetir contraseña"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresar contraseña",
                  },
                ]}
              >
                <Input
                  placeholder="Por favor ingresar contraseña"
                  onChange={(e) => setRePass(e.target.value)}
                  value={rePass}
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
