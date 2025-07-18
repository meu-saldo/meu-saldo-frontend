import { Navigate, Route, Router, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EmBreve from "../pages/EmBreve";
import AdminRoute from "./AdminRoute";
import Logado from "../pages/Logado";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import OAuth2RedirectHandler from "../pages/OAuth2RedirectHandler";
import TransactionsTable from "@/components/TransactionsTable";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/logado" element={<Logado />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />

            <Route
                path="/transactions"
                element={
                    <PrivateRoute>
                        <TransactionsTable />
                    </PrivateRoute>
                }
            />
            <Route
                path="/calendar"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />

            <Route
                path="/em-breve"
                element={
                    <AdminRoute>
                        <EmBreve />
                    </AdminRoute>
                }
            />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}