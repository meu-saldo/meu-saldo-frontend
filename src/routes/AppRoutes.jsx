import { Navigate, Route, Router, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EmBreve from "../pages/EmBreve";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />

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