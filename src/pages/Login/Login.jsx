import React, { useEffect, useState } from 'react';
import video from '../../video/videoFondo.mp4';
import "./login.css"
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        // Fetch CSRF token from Django
        axios.get('http://teraflex.cl:90/csrf_endpoint/').then(response => {
            console.log(response);
            setCsrfToken(response.data.csrf_token);
        }).catch(error => {
            console.error('Failed to fetch CSRF token:', error);
        });
    }, []);

    const handleSubmit = (e) => {
        console.log(e.target.value, e.target.id)
        setCredentials((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    }


    const onClick = async (e) => {
        e.preventDefault();
        console.log(csrfToken);
        try {
            const res = await axios.post("http://teraflex.cl:90/login/", credentials, {
                headers: {
                    "X-CSRFToken" : csrfToken
                }
            });
            console.log(res.data);
            if(res.data.r){
                navigate('/home');
            }else{
                alert("Usuario o contraseña, incorrecta")
            }
            
        } catch (error) {
            
            console.log(error);
        }
    }

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
                                id='username'
                                onChange={handleSubmit}
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
                            <Input.Password id='password' onChange={handleSubmit} className='texts' placeholder="Escribir contraseña" />
                        </div>
                        <Link to={"/home"}><button onClick={onClick} className='btn-login'>Login</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
