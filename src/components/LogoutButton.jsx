import { LuLogOut } from "react-icons/lu";
import Button from "./Button";
import { logout } from "../service/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login")
    }

    return (
        <Button
            onClick={handleLogout}
            variant="danger"
            size="sm"
            iconLeft={<LuLogOut size={16} />}
        >
            Sair
        </Button>

    );
}