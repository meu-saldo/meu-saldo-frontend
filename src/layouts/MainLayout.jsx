import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="bg-gray-100">
            <Sidebar />

            <main className="md:pl-[17rem] h-screen flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}