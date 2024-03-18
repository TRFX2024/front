import React, { useState } from 'react';
import video from '../../video/videoFondo.mp4';
import "./login.css"
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div className='login-container'>
            <div className="login-cont">
                <video src={video} className='camara' autoPlay loop />
                <div className="parrafo">
                    <p>
                        Inicia sesión para poder ver las camaras en tiempo real
                    </p>
                </div>
                <div className="login-content">
                    <div className="login-t">
                        <h1 className=''>Iniciar Sesion</h1>
                        <div className="username">
                            <p>Nombre</p>
                            <Input
                                className='texts'
                                placeholder="Ingresar nombre de usuario"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined
                                            style={{
                                                color: 'rgba(0,0,0,.45)',
                                            }}
                                        />
                                    </Tooltip>
                                }
                            />
                        </div>
                        <div className="password">
                            <p>Contraseña</p>
                            <Input.Password className='texts' placeholder="Escribir contraseña" />
                        </div>
                        <button className='btn-login'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
