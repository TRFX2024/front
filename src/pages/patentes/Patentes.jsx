import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useEffect } from "react";
import "./patentes.css";
import axios from "axios";
import io from "socket.io-client";
import Websockets from "../../components/websocket/Websockets";
import { API_URL } from "../../constants/api";

const Patentes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [patentes, setPatentes] = useState(null);
  const [grupo, setGrupo] = useState("");

  useEffect(() => {
    const datas = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/grupo_usuario/`, {
          withCredentials: true,
          credentials: "include",
        });
        console.log(data);
        console.log(data.ciudad);
        setGrupo(data.ciudad);
      } catch (error) {
        console.log(error);
      }
    };
    datas();
  }, []);

  const grupo1 = grupo;

  useEffect(() => {
    const users = localStorage.getItem("user");
    setUser(users);
    if (!users) {
      navigate("https://18.228.92.158:75");
    } else {
      axios
        .get(`${API_URL}/monitoreo_camaras/`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setPatentes(true);
        })
        .catch((err) => {
          setPatentes(false);
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="">
      {user ? (
        <div className="sistema">
          <h1>Sistema de monitoreo {grupo}</h1>
          <Websockets grupo1={grupo1} />
        </div>
      ) : (
        <h1>Usuario no autenticado</h1>
      )}
    </div>
  );
};

export default Patentes;
