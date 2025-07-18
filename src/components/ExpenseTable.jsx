import useExpenses from "@/hooks/useExpenses";
import TableTemplate from "./TableTemplate";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ExpenseTable() {
    const { expenses, loading, error } = useExpenses();

    console.log("Dados recebidos do hook", expenses);

    useEffect(() => {
        if (error) {
            toast.error("Erro ao buscar despesas", {
                description: error,
                duration: 5000,
            });
        }
    }, [error])

    const header = [
        {
            header: 'Descrição',
            accessor: 'description',
            align: 'left'
        },
        {
            header: 'Tipo',
            accessor: 'type',
            cell: (value) => <span className='px-4 py-1 bg-gray-300 rounded-full text-xs'>{value}</span>
        },
        {
            header: 'Valor',
            accessor: 'amount',
            cell: (value) => `R$ ${value}`
        }
    ];

    return (
        <TableTemplate
            column={header}
            data={expenses}
            loading={loading}
            error={error}
        />
    );
}