import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Signup from "./views/Signup";
import AdminLayout from "./layouts/AdminLayout";
import Ordenes from "./views/Ordenes";
import Productos from "./views/Productos";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Ordenes />,
      },
      {
        path: "/admin/productos",
        element: <Productos />,
      },
    ],
  },
]);

export default Router;
