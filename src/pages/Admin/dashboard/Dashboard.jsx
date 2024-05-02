import React, { useEffect, useState } from 'react';
import './dashboard.css';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import axios from 'axios';
const Dashboard = () => {

    const [datos, setDatos] = useState();

    useEffect(() => {
        const obtener = async() =>{
            try {
                const resp = await axios.get('https://teraflex.cl:9000/admin_conteo_datos/');
                console.log(resp.data);
                setDatos(resp.data)
            } catch (error) {
                console.log(err);
            }
        }
        obtener();
    }, []);


    const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: datos
          }
        ]
      };
    return (
        <div>
            <ReactECharts
                echarts={echarts}
                option={option}
                style={{ height: '400px', width: '100%' }}
            />
        </div>
    );
}

export default Dashboard;
