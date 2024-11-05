import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'

import PaginaHome from './componentes/TelaHome/PaginaHome.jsx';
import TelaLogin from './componentes/TelaLogin/TelaLogin.jsx';
import TelaCadastro from './componentes/TelaCadastro/TelaCadastro.jsx';
import TelaPrincipal from './componentes/TelaPrincipal/TelaPrincipal.jsx';


const router = createBrowserRouter([
{
  path: "/",
  element: <PaginaHome />
},
{
  path: "/telaprincipal",
  element: <TelaPrincipal/>
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

import { UserProvider } from './context/GlobalContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
  
  ,
);
