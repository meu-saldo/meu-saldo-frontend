import { LuLogOut } from "react-icons/lu";
import Button from "./Button";
import { logout } from "../service/auth";

export default function LogoutButton() {
    function handleLogout() {
        logout();
        window.location.href = '/login';
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