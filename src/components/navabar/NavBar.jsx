import React from "react";
import "../Admin/navbar/navbar.css";
import {
  CarOutlined,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  SmileTwoTone,
  UnorderedListOutlined,
} from "@ant-design/icons";
// import axios from 'axios';
import logo3 from "../../imgs/logo7.jpg";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  // const onClose = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const res = await axios.post("${API_URL}/logout/");
  //         localStorage.clear();
  //         if (res) {
  //             navigate("/");
  //         }
  //     } catch (error) {

  //     }
  // }

  const admin = localStorage.getItem("user");
  console.log(admin);

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
        <div className="links-ad">
          <div className="links-ad-top">
            <Link className="link-path" to={""}>
              <div className="link-in">
                <CarOutlined className="icon-ad" />
                <a className="ref-ad">Patentes</a>
              </div>
            </Link>
            <Link className="link-path" to={"historial"}>
              <div className="link-in">
                <HistoryOutlined className="icon-ad" />
                <a className="ref-ad">Historial</a>
              </div>
            </Link>
            <Link className="link-path" to={"lista"}>
              <div className="link-in">
                <UnorderedListOutlined className="icon-ad" />
                <a className="ref-ad">Lista Negra</a>
              </div>
            </Link>
          </div>
        </div>

        {/* <div className="link" onClick={onClose} >
                    <LogoutOutlined className='icon' />
                    <a className='ref'>Logout</a>
                </div> */}
      </div>
    </div>
  );
};

export default NavBar;
