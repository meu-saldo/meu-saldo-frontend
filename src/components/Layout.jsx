import { GithubLogo } from "phosphor-react";

export default function Layout({ children }) {
    return (
        <div className="bg-neutral-950 text-neutral-100">
            <header className="bg-neutral-900 border-b border-neutral-800 p-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GithubLogo size={22} className="text-white" />
                        <span className="font-semibold text-white/90">Meu Saldo</span>
                    </div>
                </div>
            </header>
            <main className="max-w-5xl mx-auto px-4 py-10">
                {children}
            </main>
        </div>
    );
}