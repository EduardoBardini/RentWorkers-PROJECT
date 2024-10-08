import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'

import PaginaHome from './componentes/TelaHome/PaginaHome.jsx'
import PaginaBusca from './componentes/TelaDeBusca/PaginaBusca.jsx'
import TelaLogin from './componentes/TelaLogin/TelaLogin.jsx'
import TelaCadastro from './componentes/TelaCadastro/TelaCadastro.jsx';

const router = createBrowserRouter([
{
  path: "/",
  element: <PaginaHome />
},
{
  path: "/buscarPerfil",
  element: <PaginaBusca />
},
{
  path: "/login",
  element: <TelaLogin />
},
{
  path: "/cadastro",
  element: <TelaCadastro />
}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
