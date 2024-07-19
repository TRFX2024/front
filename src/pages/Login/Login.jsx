import React, { useEffect, useState } from "react";
import video from "../../video/videoPortada.mp4";
import "./login.css";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../imgs/Logo2.jpg";
import { API_URL } from "../../constants/api";

axios.defaults.withCredentials = true;

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    // Fetch CSRF token from Django
    axios
      .get(`${API_URL}/csrf_endpoint/`)
      .then((response) => {
        setCsrfToken(response.data.csrf_token);
      })
      .catch((error) => {
        console.error("Failed to fetch CSRF token:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/login/`,
        credentials,
        {
          withCredentials: true,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
      localStorage.setItem("admin", res.data.admin);
      localStorage.setItem("user", res.data.user);
      localStorage.setItem("token", csrfToken);
      if (res.data.r && res.data.admin) {
        navigate("/admin");
      } else if (res.data.r && !res.data.admin) {
        if (res.data.user === "fiscalia") {
          navigate("/fiscalia");
        } else {
          navigate("/home");
        }
      } else {
        alert("Usuario o contraseña, incorrecta");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-cont">
        <video src={video} className="camara" autoPlay loop muted />
        <div className="log-cont">
          <div className="parrafo">
            <p>Sistema Centralizado Porticos Lectores de Patentes</p>
          </div>
          <div className="login-content">
            <div className="login-t">
              <img src={logo} alt="" />
              <h1 className="">Iniciar Sesion</h1>
              <div className="username">
                <p>Nombre</p>
                <Input
                  className="texts"
                  id="username"
                  onChange={handleSubmit}
                  placeholder="Ingresar nombre de usuario"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Información adicional">
                      <InfoCircleOutlined
                        style={{
                          color: "rgba(0,0,0,.45)",
                        }}
                      />
                    </Tooltip>
                  }
                />
              </div>
              <div className="password">
                <p>Contraseña</p>
                <Input.Password
                  id="password"
                  onChange={handleSubmit}
                  className="texts"
                  placeholder="Escribir contraseña"
                />
              </div>
              <Link to={"/home"}>
                <button onClick={onClick} className="btn-login">
                  Login
                </button>
              </Link>
              <div className="recuperar">
                <p>
                  En caso de perdidad de contraseña o tener acceso al sistema
                  contactar a:{" "}
                  <a href="mailto:sistemas@teraflex.cl" className="color-a">
                    sistemas@teraflex.cl
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
