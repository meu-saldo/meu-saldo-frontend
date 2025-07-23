import Logo from '@/components/Logo';
import Navbar from '@/components/Sidebar';
import LogoutButton from '@/components/LogoutButton';
import ExpenseTable from '@/components/tables/ExpenseTable';
import Button from '@/components/Button';
import { Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import NewExpenseModal from '@/components/modals/NewExpenseModal';
import EditExpenseModal from '@/components/modals/EditExpenseModal';
import useExpenses from '@/hooks/useExpenses';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import ExpenseTableSkeleton from '@/components/tables/ExpenseTableSkeleton';

export default function Home() {
    const { expenses, loading, error, carregarDespesas } = useExpenses();
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // const { user } = useAuth();

    const handleNewExpense = () => {
        setIsNewModalOpen(true);
    };

    const handleEditExpense = (expense) => {
        setSelectedExpense(expense);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedExpense(null);
    };

    const handleActionSuccess = (message) => {
        carregarDespesas();
        toast.success(message);
    }

    useEffect(() => {
        const message = location.state?.message;

        if (message) {
            toast.error(message);

            setTimeout(() => {
                navigate(location.pathname, { replace: true, state: null });
            }, 100);
        }
    }, [location, navigate]);


    return (
        <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 gap-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo, Nathan!</h1>
            <p className="text-muted-foreground mb-8">
                Aqui está um resumo de suas atividades do mês atual.
            </p>

            {/* Modal de Nova Despesa */}
            <NewExpenseModal
                isOpen={isNewModalOpen}
                onOpenChange={setIsNewModalOpen}
                onCreated={() => handleActionSuccess("Nova despesa adicionada com sucesso!")}
            />

            {/* Modal de Edição de Despesa */}
            <EditExpenseModal
                isOpen={isEditModalOpen}
                onOpenChange={handleCloseEditModal}
                expense={selectedExpense}
                onSaved={() => handleActionSuccess("Despesa editada com sucesso!")}
                onDeleted={() => handleActionSuccess("Despesa excluída com sucesso!")}
            />

            <div className="flex flex-col flex-1 border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-4 md:p-6 border-b">
                    <h2 className="font-medium text-xl md:text-2xl">Despesas</h2>
                    <Button
                        variant="black-outline"
                        iconLeft={<Plus className="text-gray-900" size={16} />}
                        onClick={handleNewExpense}
                    >
                        Nova despesa
                    </Button>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="p-1 md:p-2">
                        {loading && <ExpenseTableSkeleton rows={5} />}
                        {error && !loading && (
                            <div className="text-center p-8 text-destructive bg-destructive/10 rounded-md">
                                <p>Ocorreu um erro ao buscar despesas.</p>
                                <p>{error.message}</p>
                            </div>
                        )}
                        {!loading && !error && (
                            <ExpenseTable
                                expenses={expenses}
                                onRowClick={handleEditExpense}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
