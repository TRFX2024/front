import React, { useState } from "react";
import "./historial.css";
import { Input, ConfigProvider, Select, Space } from "antd";
import useFetch from "../../hook/useFetch";
import TablaHistorico from "../../components/tablaHistorico/TablaHistorico";
import { Radio } from "antd";
import { API_URL } from "../../constants/api";
const Historial = () => {
  const [patente, setPatente] = useState("");
  const [filtro, setFiltro] = useState("");
  const res = useFetch(
    `${API_URL}/historial_patentes?patente=${patente}&filtro=${filtro}`
  );
  const { data } = res;
  const registros = data ? data.registros : [];

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
    console.log(`${value}`);
  };
  return (
    <div className="historial">
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
        <TablaHistorico registros={registros} />
      </div>
    </div>
  );
};

export default Historial;
