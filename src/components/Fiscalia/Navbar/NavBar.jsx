import React from "react";
import "./navbar.css";
import { LuUserCircle } from "react-icons/lu";
import { Button, Input } from "antd";
import logo from "../../../imgs/logo7.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../constants/api";
const NavBar = () => {
  const navigate = useNavigate();
  const onClose = async (e) => {
    e.preventDefault();
    console.log("cerrar sesion");
    try {
      const res = await axios.post(`${API_URL}/logout/`);
      localStorage.clear();
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const user = localStorage.getItem("user");
  return (
    <div className="nav-fis">
      <div className="nav-content">
        <div className="icons-fis">
          <LuUserCircle className="icon-fis" />
          <p>Bienvenido: {user.toUpperCase()}</p>
        </div>
        <div className="search-fis">
          <img src={logo} alt="" className="img-fisc" />
        </div>
        <div className="icons-fis">
          <Button onClick={onClose} className="btn-h">
            Cerrar Sesion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
