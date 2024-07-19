import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import axios from "axios";
import { Card } from "antd";
import { API_URL } from "../../../../constants/api";

const PieBar = ({ ayuda, id }) => {
  const [datos, setDatos] = useState();
  const [chartOption, setChartOption] = useState(null);
  const [drilldownData, setDrilldownData] = useState(null);

  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/admin_ciudades_horas?id=${id}`
        );
        const option = generateChartOption(data.arreglo);
        setDrilldownData(data.registros);
        setChartOption(option);
        setDatos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtener();
  }, [ayuda]);

  const generateChartOption = (data) => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["Registros"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: data.map((item) => item.name),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          itemStyle: {
            color: "#ad0e0e",
          },
          name: "Registros",
          type: "bar",
          barWidth: "20%",
          data: data.map((item) => item.value),
        },
      ],
    };
  };

  const handleChartClick = (params) => {
    if (
      params.componentType === "series" &&
      params.seriesType === "bar" &&
      params.data &&
      drilldownData
    ) {
      const category = params.name;
      let arreglo = null;

      switch (category) {
        case "Patentes":
          arreglo = datos.registros;
          break;
        case "Infracciones":
          arreglo = datos.infracciones;
          break;
        case "Fallos":
          arreglo = datos.fallos;
          break;
        default:
          break;
      }

      if (arreglo) {
        const option = generateDrilldownOption(category, arreglo);
        setChartOption(option);
      }
    }
  };
  const generateDrilldownOption = (category, data) => {
    // Obtener las carpetas únicas
    const carpetasUnicas = [...new Set(data.map((item) => item.Carpeta))];

    // Generar series para cada carpeta
    const series = carpetasUnicas.map((carpeta) => {
      return {
        name: carpeta,
        type: "line",
        data: data
          .filter((item) => item.Carpeta === carpeta)
          .map((item) => [item.Hora, item.Cantidad]), // Formato [x, y]
      };
    });

    return {
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          // Obtener el valor de la categoría y la cantidad
          const carpeta = params.seriesName;
          const hora = params.name;
          const cantidad = params.data[1];
          // Formatear el texto del tooltip
          return `${carpeta}: ${hora} - Cantidad: ${cantidad}`;
        },
      },
      legend: {
        data: series.map((item) => item.name),
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [...Array(24).keys()], // Generar horas del día de 0 a 23
      },
      yAxis: {
        type: "value",
      },
      series: series,
    };
  };

  return (
    <div className="border">
      <Card className="box-shadow">
        {chartOption && (
          <ReactECharts
            echarts={echarts}
            option={chartOption}
            style={{ height: "250px", width: "100%" }}
            onEvents={{ click: handleChartClick }}
          />
        )}
      </Card>
    </div>
  );
};

export default PieBar;
