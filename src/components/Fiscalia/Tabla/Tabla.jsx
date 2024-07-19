import { Button, ConfigProvider, Input, Radio, message } from "antd";
import React, { useState } from "react";
import TablaHistorico from "../../tablaHistorico/TablaHistorico";
import useFetch from "../../../hook/useFetch";
import "./tabla.css";
import axios from "axios";
import { API_URL } from "../../../constants/api";

const Tabla = () => {
  const [patente, setPatente] = useState("");
  const [filtro, setFiltro] = useState("");
  const [datos, setDatos] = useState("");
  const res = useFetch(
    `${API_URL}/historial_fiscalia?patente=${patente}&filtro=${filtro}`
  );
  const { data } = res;
  const registros = data ? data.registros : [];
  const user = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const enviar = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/exportar_fiscalia/`,
        {
          patente: datos,
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
      setDatos("");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error al exportar los datos",
      });
      setDatos("");
    } finally {
      setLoading(false);
    }
  };

  const optionsWithDisabled = [
    {
      label: "Sin Filtro",
      value: "1",
    },
    {
      label: "Lista Negra",
      value: "2",
    },
    {
      label: "SEBV",
      value: "3",
    },
    {
      label: "Aseguradora",
      value: "4",
    },
  ];

  const handleChange = ({ target: { value } }) => {
    setFiltro(value);
  };
  return (
    <div className="historial-fisc">
      {contextHolder}
      <h1>Historial</h1>
      <div className="btns">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                activeBorderColor: "#ad0e0e",
                hoverBorderColor: "#ad0e0e",
              },
            },
          }}
        >
          <Input
            type="text"
            onChange={(e) => setPatente(e.target.value)}
            placeholder="Buscar patente"
            className="i-patente"
          />
        </ConfigProvider>
        <div className="exportar">
          <Input
            placeholder="Ingresar patente"
            value={datos}
            onChange={(e) => setDatos(e.target.value.toUpperCase())}
            maxLength={6}
            className="inputText text-hw"
          />
          <Button className="btn-h" onClick={enviar} loading={loading}>
            Exportar
          </Button>
        </div>

        <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonSolidCheckedActiveBg: "#ad0e0e",
                buttonSolidCheckedBg: "#ad0e0e",
                buttonSolidCheckedHoverBg: "#ad0e0e",
                colorText: "#ad0e0e",
                colorBgTextHover: "#ad0e0e",
                colorBorder: "#ad0e0e",
                colorInfoTextHover: "#ad0e0e",
              },
            },
          }}
        >
          <Radio.Group
            options={optionsWithDisabled}
            onChange={handleChange}
            value={filtro}
            optionType="button"
            buttonStyle="solid"
          />
        </ConfigProvider>
      </div>
      <div className="">
        <TablaHistorico registros={registros} user={user} />
      </div>
    </div>
  );
};

export default Tabla;
