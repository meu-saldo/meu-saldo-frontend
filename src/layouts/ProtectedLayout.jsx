import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";

export default function ProtectedLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Navigate 
                to={"/login"}
                state={{ message: "você precisa estar logado para acessar esta área" }}
                replace
            />
        );
    }

    return <MainLayout />;
}