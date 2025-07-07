import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate
        to="/login"
        state={{ message: "Você precisa estar logado para acessar essa página" }}
        replace
        />;
    }

    return children;
}