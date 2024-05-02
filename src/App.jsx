import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/home/Home";
import Layout from "./layout/Layout";
import "./App.css";
import Patentes from "./pages/patentes/Patentes";
import Historial from "./pages/historial/Historial";
import Lista from "./pages/lista/Lista";
import LayoutAdmin from "./layout/LayoutAdmin";
import Usuarios from "./pages/Admin/usuarios/Usuarios";
import Ciudades from "./pages/Admin/ciudades/Ciudades";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import Camaras from "./pages/Admin/camaras/Camaras";


function App() {

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Login/>
      },
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
      ,
      {
        path: "/admin",
        element: <LayoutAdmin/>,
        children: [
          {
            path: "",
            element: <Dashboard/>
          },
          {
            path: "usuarios",
            element: <Usuarios/>
          },
          {
            path: "ciudades",
            element: <Ciudades/>
          },
          {
            path: "camaras",
            element: <Camaras/> 
          }
        ]
      }
    ]
  );

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
