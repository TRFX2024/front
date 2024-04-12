import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/home/Home";
import Layout from "./layout/Layout";
import "./App.css";
import Patentes from "./pages/patentes/Patentes";
import Historial from "./pages/historial/Historial";
import Lista from "./pages/lista/Lista";


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
    ]
  );

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
