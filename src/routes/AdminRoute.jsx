import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminRoute({ children }) {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate
            to="/login"
            state={{ message: "Você precisa estar logado para acessar essa página" }}
            replace
        />;
    }

    if (role !== "ADMIN") {
        return <Navigate
            to="/login"
            state={{ message: "Você não tem permissão para acessar essa página" }}
            replace
        />;
    }   

    return children;
}