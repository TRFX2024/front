import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import axios from 'axios';

const Bar = ({ ayuda, id }) => {

    const [datos, setDatos] = useState();

    useEffect(() => {

        const obtener = async () => {
            try {
                const { data } = await axios.get(`https://teraflex.cl:9000/admin_ciudades_camaras?id=${id}`);
                console.log(data)
                const option = generateChartOption(data.arreglo);
                setDrilldownData(data.patentes_detalle);
                setChartOption(option);
                setDatos(data);
            } catch (error) {
                console.log(error)
            }
        }
        obtener();
    }, [ayuda]);
    console.log(datos);
    const [chartOption, setChartOption] = useState(null);
    const [drilldownData, setDrilldownData] = useState(null);

    const generateChartOption = (data) => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Registros']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: data.map(item => item.name),
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    itemStyle: {
                        color: '#ad0e0e',

                    },
                    name: 'Registros',
                    type: 'bar',
                    barWidth: '20%',
                    data: data.map(item => item.value)
                }
            ]

        };
    };
    const handleChartClick = (params) => {
        if (params.componentType === 'series' && params.seriesType === 'bar' && params.data && drilldownData) {
            const category = params.name;
            let arreglo = null;

            switch (category) {
                case 'Patentes':
                    arreglo = datos.patentes_detalle;
                    break;
                case 'Infracciones':
                    arreglo = datos.infracciones_detalle;
                    break;
                case 'Fallos':
                    arreglo = datos.fallos_detalle;
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
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: data.map(item => item.Carpeta)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    itemStyle: {
                        color: '#ad0e0e'
                    },
                    name: category,
                    type: 'bar',
                    data: data.map(item => item['Numero total de registros'])
                }
            ]
        };
    };



    return (
        <div>
            {chartOption && (
                <ReactECharts
                    echarts={echarts}
                    option={chartOption}
                    style={{ height: '320px', width: '100%' }}
                    onEvents={{ click: handleChartClick }}
                />
            )}
        </div>
    );
}

export default Bar;
