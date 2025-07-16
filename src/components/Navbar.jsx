import { useLocation, Link } from "react-router-dom"

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { name: "Início", path: "/home" },
        { name: "Transações", path: "/transactions" },
        { name: "Calendário", path: "/calendar" }
    ];

    return (
        <nav className="flex items-center bg-gray-200 text-gray-900 rounded-full w-md h-12 p-0.5">
            <ul className="flex justify-between items-center w-full h-full gap-5">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li 
                            key={item.path}
                            className={`flex items-center justify-center rounded-full h-full w-full transition-all duration-400 ease-in-out ${isActive ? "bg-gray-900 text-white" : "text-gray-900 hover:bg-gray-300"} `}
                        >
                            <Link
                                to={item.path} 
                                className="flex items-center justify-center w-full h-full rounded-full" 
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}