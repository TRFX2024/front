import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from "../pages/Login/Login"
import Home from "../pages/home/Home";
import Layout from "../layout/Layout";
import Patentes from "../pages/patentes/Patentes";
import Historial from "../pages/historial/Historial";
import Lista from "../pages/lista/Lista";

const router = createBrowserRouter(
        [
          {
            path: "/home",
            element: <Layout/>,
            children: [
              {
                path: "",
                element: <Patentes/>
              },
              {
                path: "historial",
                element: <Historial/>
              },
              {
                path: "lista",
                element: <Lista/>
              }
            ]
          }
        ]
      );


export default router;
