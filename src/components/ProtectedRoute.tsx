import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    // se não tiver usuário logado, volta pro login
    return <Navigate to="/" replace />;
  }

  // se tiver, mostra a rota protegida (Dashboard, etc.)
  return <Outlet />;
};

export default ProtectedRoute;
