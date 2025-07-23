import { ArrowsClockwise, CalendarBlank, House, List, X } from "phosphor-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom"
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Início", path: "/home", icon: <House size={24} /> },
        { name: "Transações", path: "/transactions", icon: <ArrowsClockwise size={24} /> },
        { name: "Calendário", path: "/calendar", icon: <CalendarBlank size={24} /> }
    ];

    const activeLinkClass = "bg-gray-700 text-white";
    const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

    const menuContent = (
        <div className="flex flex-col h-full">
            <div className="p-4 mb-4">
                <Link to={"/home"}>
                    <Logo />
                </Link>
            </div>
            <nav className="flex-1 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}
                        `}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );

    return (
        <>
            {/* Sidebar Desktop */}
            <aside className="hidden md:fixed md:top-4 md:left-4 md:bottom-4 md:flex md:w-64 md:flex-col bg-gray-900 z-30 rounded-xl shadow-lg">
                {menuContent}
                <div className="p-4 mt-auto">
                    <LogoutButton 
                        variant="danger-outline"
                        size="default"
                        className="w-full"
                    />
                </div>
            </aside>

            {/* Sidebar Mobile e Botão Hamburguer */}
            <header className="md:hidden sticky top-0 bg-white shadow-md z-20 h-16 flex items-center px-4">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-gray-600"
                    aria-label="Abrir menu"
                >
                    <List size={28} />
                </button>
                <div className="flex-1 text-center">
                    <Logo />
                </div>
            </header>

            {/* Painel do Menu Mobile(DRAWER)  */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-gray-900 z-50 md:hidden flex flex-col p-4">
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-gray-300"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 flex flex-col items-center justify-center">
                        <ul className="space-y-6 text-center">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `
                                            flex items-center gap-4 text-2xl font-semibold transition-colors duration-200 
                                            ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                                        `}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-8 mb-4">
                        <LogoutButton 
                            variant="danger-outline"
                            size="lg"
                            iconSize={22}
                            className="w-full"
                        />
                    </div>
                </div>
            )}
        </>
    );
}