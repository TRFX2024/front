import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/home/Home";
import Layout from "./layout/Layout";
import "./App.css";


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
