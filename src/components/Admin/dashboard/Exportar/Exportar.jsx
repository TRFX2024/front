import { Button, Select, message } from "antd";
import axios from "axios";
import { DatePicker, Space } from "antd";
import "./exportar.css";
const { RangePicker } = DatePicker;

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../constants/api";

const Exportar = ({ setIsModalOpen }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fecha, setFecha] = useState("");
  const [idCiudad, setIdCiudad] = useState(0);
  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/admin_datos_exportar/`);
        setCiudades(data.ciudades);
      } catch (error) {
        console.log(error);
      }
    };
    obtener();
  }, []);

  const enviar = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/admin_exportar/`,
        {
          fecha: fecha,
          id: idCiudad,
        },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Datos.xlsx");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      messageApi.open({
        type: "success",
        content: "Archivo descargado",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error al querer exportar los datos",
      });
    } finally {
      setLoading(false);
    }

    setIsModalOpen(false);
  };
  const cerrar = () => {
    setIsModalOpen(false);
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf("day");
  };

  const handleDateChange = (dates, dateString) => {
    if (dates && dates.length === 2) {
      setFecha(dateString);
    }
  };

  const handleCiudad = (value) => {
    setIdCiudad(value);
  };

  return (
    <div>
      {contextHolder}
      <div className="opciones">
        <div className="fecha">
          <RangePicker
            className="range"
            onChange={handleDateChange}
            disabledDate={disabledDate}
          />
        </div>
        <Select
          options={ciudades}
          onChange={handleCiudad}
          placeholder="Seleccionar ciudad"
          defaultValue={0}
          style={{ width: "100%" }}
        />
      </div>
      <Button className="btn-h" onClick={enviar} loading={loading}>
        Exportar
      </Button>
      <Button className="btn-h" onClick={cerrar} loading={loading}>
        Cerrar
      </Button>
    </div>
  );
};

export default Exportar;
