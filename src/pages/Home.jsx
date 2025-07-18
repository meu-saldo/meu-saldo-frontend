import Logo from '@/components/Logo';
import Navbar from '@/components/Navbar';
import LogoutButton from '@/components/LogoutButton';
import ExpenseTable from '@/components/tables/ExpenseTable';
import Button from '@/components/Button';
import { Crosshair, Plus } from 'phosphor-react';
import { useState } from 'react';
import NewExpenseModal from '@/components/modals/NewExpenseModal';
import useExpenses from '@/hooks/useExpenses';


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { expenses, loading, error, carregarDespesas } = useExpenses();

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

                <NewExpenseModal
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    onCreated={carregarDespesas}
                />
                <div className="w-full mx-auto border-1 border-gray-400 rounded-md p-4">
                    <div className='flex justify-between mb-4'>
                        <h2 className='font-medium text-2xl'>Despesas</h2>
                        <Button
                            variant='outline'
                            iconLeft={<Plus className='text-gray-900' size={16} />}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Nova despesa
                        </Button>
                    </div>
                    <div className="overflow-hidden">
                        <div className="max-h-96 overflow-y-auto" >
                            <ExpenseTable expenses={expenses} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}