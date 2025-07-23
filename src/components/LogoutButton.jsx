import { LuLogOut } from "react-icons/lu";
import Button from "./Button";
import { logout } from "../service/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ iconSize = 16, ...props }) {
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login")
    }

    return (
        <Button
            onClick={handleLogout}
            iconLeft={<LuLogOut size={iconSize} />}
            {...props}
        >
            Sair
        </Button>

    );
}