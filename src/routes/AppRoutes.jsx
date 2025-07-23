import { Navigate, Route, Router, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EmBreve from "../pages/EmBreve";
import AdminRoute from "./AdminRoute";
import Logado from "../pages/Logado";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import OAuth2RedirectHandler from "../pages/OAuth2RedirectHandler";
import TransactionsTable from "@/components/tables/TransactionsTable";
import MainLayout from "@/layouts/MainLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path="/logado" element={<Logado />} />

            <Route element={<ProtectedLayout />}>
                <Route path="/home"element={<Home />}/>
                <Route path="/transactions" element={<TransactionsTable />}/>
                <Route path="/calendar" element={<Home />}/>
                <Route path="/em-breve" element={<EmBreve />}/>
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}