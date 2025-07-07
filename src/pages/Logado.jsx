import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logado() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      // 🔁 Redirecionar com atraso para permitir reatividade do useAuth
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/em-breve");
        } else {
          navigate("/home");
        }
      }, 100); // 100ms costuma ser suficiente
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Autenticado...</p>;
}
