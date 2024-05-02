import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import axios from 'axios';

const Crear = ({ reFetch }) => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState();

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const agregar = async () => {


        try {
            setLoading(true);
            const res = await axios.post(`https://teraflex.cl:9000/admin_crear_ciudades/`, {
                nombre: nombre,
            });
            messageApi.open({
                type: 'success',
                content: 'Ciudad creada con exito!!',
            });
            console.log(res);
            form.resetFields();
            setOpen(false);
            reFetch();
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Error al crear ciudad!!',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }


    }
    return (
        <div>
            {contextHolder}
            <Button className='btn-crear' onClick={showDrawer} icon={<PlusOutlined />}>
                Crear ciudad
            </Button>
            <Drawer
                title="Crear nueva ciudad"
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
                        <Button onClick={onClose} className='btn-h' loading={loading}>Cancelar</Button>
                        <Button onClick={agregar} className='btn-c' loading={loading}>
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
                                label="Nombre de la ciudad"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese nombre de la ciudad',
                                    },
                                ]}
                            >
                                <Input placeholder="Por favor ingrese nombre de la ciudad" onChange={(e) => setNombre(e.target.value)} value={nombre} className='inputText' />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Drawer>
        </div>
    );
}

export default Crear;
