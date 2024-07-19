import React, { useEffect, useState } from "react";
import { Transfer } from "antd";
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
const Vincular = ({ id, nombre, reFetch }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [datos, setDatos] = useState();
  const [open, setOpen] = useState(false);
  const [mockData, setMockData] = useState([]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const obtener = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/admin_vincular_camaras?id=${id}`
        );
        const data = res.data;
        setMockData(data.carpetas);
      } catch (error) {
        console.log(error);
      }
    };
    obtener();
  }, []);
  useEffect(() => {
    const initialTargetKeys = mockData
      .filter((item) => Number(item.description) == 1)
      .map((item) => item.key);
    setTargetKeys(initialTargetKeys);
  }, [mockData]);

  const enviar = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/admin_recibir_camaras/`, {
        id: id,
        datos: datos,
      });
      messageApi.open({
        type: "success",
        content: "Se ha vinculado correctamente",
      });
      form.resetFields();
      setOpen(false);
      reFetch();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error al vincular las camaras",
      });
    } finally {
      setLoading(false);
    }
  };
  const [targetKeys, setTargetKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setDatos(nextTargetKeys);
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  const onScroll = (direction, e) => {};
  return (
    <div>
      {contextHolder}
      <Button
        className="btn-crear"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Vincular
      </Button>
      <Drawer
        title="Vincular camaras"
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
            <Button className="btn-c" onClick={enviar} loading={loading}>
              Vincular
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="nombre"
                label={`Vincular camaras`}
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccionar camara o camaras",
                  },
                ]}
              >
                <Transfer
                  dataSource={mockData}
                  titles={["Camaras disponibles", "Camaras asignadas"]}
                  listStyle={{
                    width: 500,
                    height: 200,
                  }}
                  targetKeys={targetKeys}
                  selectedKeys={selectedKeys}
                  onChange={onChange}
                  onSelectChange={onSelectChange}
                  onScroll={onScroll}
                  render={(item) => item.title}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Vincular;
