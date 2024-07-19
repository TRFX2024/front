import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import axios from "axios";
import { Card } from "antd";
import { API_URL } from "../../../../constants/api";

const Bar = ({ ayuda, id }) => {
  const [datos, setDatos] = useState();

  useEffect(() => {
    const obtener = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/admin_ciudades_camaras?id=${id}`
        );
        const option = generateChartOption(data.arreglo);
        setDrilldownData(data.patentes_detalle);
        setChartOption(option);
        setDatos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtener();
  }, [ayuda]);

  const [chartOption, setChartOption] = useState(null);
  const [drilldownData, setDrilldownData] = useState(null);

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
          universalTransition: {
            enabled: true,
            divideShape: "clone",
          },
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
          arreglo = datos.patentes_detalle;
          break;
        case "Infracciones":
          arreglo = datos.infracciones_detalle;
          break;
        case "Fallos":
          arreglo = datos.fallos_detalle;
          break;
        default:
          break;
      }

      if (arreglo) {
        const option = generateDrilldownOption(category, arreglo);
        setChartOption({
          ...option,
          animationDurationUpdate: 500,
        });
      }
    }
  };
  const generateDrilldownOption = (category, data) => {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.Carpeta),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          itemStyle: {
            color: "#ad0e0e",
          },
          name: category,
          type: "bar",
          data: data.map((item) => item["Numero total de registros"]),
        },
      ],
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

export default Bar;
