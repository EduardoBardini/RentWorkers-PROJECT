import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/GlobalContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useUserContext();

  console.log("Token:", token);

  // Se o usuário não está autenticado, redirecione para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se autenticado, renderize o conteúdo protegido
  return children;
};

export default ProtectedRoute;
