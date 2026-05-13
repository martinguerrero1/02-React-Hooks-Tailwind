import {createBrowserRouter, RouterProvider} from 'react-router-dom' //PARA CREAR Y RENDERIZAR LA RUTA
import { createRoot } from 'react-dom/client' //CREA LA RAIZ ATRAPANDO EL DOM DEL index.html
import './index.css'

//LAYOUT PRINCIPAL (CON HEADER)
import MainLayout from "./layouts/MainLayout";

//PAGINAS
import Home from "./pages/Home";
import Login from './pages/Login';
import NotFound from './pages/NotFound';

//RUTEO DE LA APP

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {index: true, element: <Home />},
      {path: '/login', element: <Login />},
    ]
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
])


//CREACION DEL DOM VIRTUAL Y LINK AL RUTEO DE LA APP
createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}/>
)
