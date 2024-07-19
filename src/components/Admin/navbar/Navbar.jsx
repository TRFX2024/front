import React from "react";
import {
  CarOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FrownTwoTone,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  SmileTwoTone,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import logo3 from "../../../imgs/logo7.jpg";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants/api";

const Navbar = () => {
  const navigate = useNavigate();
  const onClose = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/logout/`);
      localStorage.clear();
      if (res) {
        navigate("/");
      }
    } catch (error) {}
  };

  const admin = localStorage.getItem("user");

  return (
    <div className="nav-container-ad">
      <img src={logo3} alt="" className="logoNav1" />
      <div className="links-ad">
        <div className="profile">
          <SmileTwoTone twoToneColor="#ad0e0e" className="icon-profile" />
          <div className="detalle-ad">
            <div className="">
              <p className="text-ad">Bienvenido {admin}</p>
            </div>
            <div className="">
              <p className="email-ad">email@gmail.com</p>
            </div>
          </div>
        </div>

        {/* <div className="link">
                    <HomeOutlined className='icon' />
                    <a href="#" className="ref">Inicio</a>
                </div> */}

        <div className="link-ad">
          <div className="links-ad-top">
            <Link className="link-path" to={""}>
              <div className="link-in">
                <DashboardOutlined className="icon-ad" />
                <a className="ref-ad">Dashboard</a>
              </div>
            </Link>
            <Link className="link-path" to={"usuarios"}>
              <div className="link-in">
                <UsergroupAddOutlined className="icon-ad" />
                <a className="ref-ad">Usuarios</a>
              </div>
            </Link>
            <Link className="link-path" to={"ciudades"}>
              <div className="link-in">
                <DatabaseOutlined className="icon-ad" />
                <a className="ref-ad">Ciudades</a>
              </div>
            </Link>
            <Link className="link-path" to={"camaras"}>
              <div className="link-in">
                <VideoCameraAddOutlined className="icon-ad" />
                <a className="ref-ad">Camaras</a>
              </div>
            </Link>
          </div>
          <div className="logout" onClick={onClose}>
            <div className="logout-ad">
              <LogoutOutlined className="icon-ad" />
              <a className="ref-ad">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
