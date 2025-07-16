import TransactionsTable from '@/components/TransactionsTable';
import Logo  from '@/components/Logo';
import Navbar from '@/components/Navbar';
import LogoutButton from '@/components/LogoutButton';

export default function Home() {
    return (
        <main className="flex flex-col items-center min-h-screen">
            <header className="flex justify-between items-center py-4 px-8 sm:px-26 mb-2 w-full">
                <Logo />
                <Navbar />
                <LogoutButton />
            </header>

            <div className="flex flex-col w-6xl">
                <h1 className="text-3xl font-bold mb-2">Bem-vindo, Nathan!</h1>
                <p className="text-muted-foreground mb-8">Aqui está um resumo de suas atividades do mês atual.</p>

                <div className="w-full mx-auto">
                    <div className="bg-background rounded-lg border shadow-lg overflow-hidden">
                        <div className="max-h-96 overflow-y-auto" >
                            <TransactionsTable />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}