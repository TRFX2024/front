import React, { useEffect, useState } from 'react';
import { Transfer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import axios from 'axios';
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
            console.log(id);
            try {
                const res = await axios.get(`https://teraflex.cl:9000/admin_vincular_camaras?id=${id}`);
                const data = res.data;
                console.log(data);
                setMockData(data.carpetas);
            } catch (error) {
                console.log(error);
            }
        }
        obtener();
    }, []);
    useEffect(() => {
        const initialTargetKeys = mockData.filter(item => Number(item.description) == 1).map(item => item.key);
        setTargetKeys(initialTargetKeys);
    }, [mockData]);

    const enviar = async () => {
        try {
            setLoading(true);
            console.log(id);
            console.log(datos);
            const res = await axios.post(`https://teraflex.cl:9000/admin_recibir_camaras/`, {
                id: id,
                datos: datos
            });
            messageApi.open({
                type: 'success',
                content: 'Se ha vinculado correctamente',
            });
            form.resetFields();
            setOpen(false);
            reFetch();
            console.log(res);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Error al vincular las camaras',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const [targetKeys, setTargetKeys] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);
    console.log(mockData);

    const onChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys);
        setDatos(nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        setTargetKeys(nextTargetKeys);
    };
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
    const onScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };
    return (
        <div>
            {contextHolder}
            <Button className='btn-crear' onClick={showDrawer} icon={<PlusOutlined />}>
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
                        <Button onClick={onClose} className='btn-h' loading={loading}>Cancelar</Button>
                        <Button className='btn-c' onClick={enviar} loading={loading}>
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
                                        message: 'Por favor seleccionar camara o camaras',
                                    },
                                ]}
                            >
                                <Transfer
                                    dataSource={mockData}
                                    titles={['Camaras disponibles', 'Camaras asignadas']}
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
}

export default Vincular;
