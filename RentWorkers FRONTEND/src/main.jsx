import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'

import PaginaHome from './componentes/TelaHome/PaginaHome.jsx';
import TelaLogin from './componentes/TelaLogin/TelaLogin.jsx';
import TelaCadastro from './componentes/TelaCadastro/TelaCadastro.jsx';
import TelaPrincipal from './componentes/TelaPrincipal/TelaPrincipal.jsx';
import Perfil from './componentes/TelaPerfil/Perfil.jsx';

import CardTrabalhador from './componentes/TelaPrincipal/CardTrabalhador.jsx';


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
  path: "/CardTrabalhador.",
  element: <CardTrabalhador/>
},

{
  path: "/login",
  element: <TelaLogin />
},
{
  path: "/cadastro",
  element: <TelaCadastro />
}, 

{
  path: "/perfil",
  element: <Perfil />
}, 


// PROJETO C OU SEM , AQUA365 -- VER
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
