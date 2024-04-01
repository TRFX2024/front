import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/home/Home";
import Layout from "./layout/Layout";
import "./App.css";
import Patentes from "./pages/patentes/Patentes";


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
            element: <Home/>
          },
          {
            path: "patentes",
            element: <Patentes/>
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
