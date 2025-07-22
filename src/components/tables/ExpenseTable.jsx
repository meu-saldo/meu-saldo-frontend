import TableTemplate from "./TableTemplate";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ExpenseTable({ expenses, loading, error, onRowClick }) {

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
            cell: (typeObject) => {
                if (typeObject && typeObject.label) {
                    return (
                        <span className='px-4 py-1 bg-gray-300 rounded-full text-xs'>
                            {typeObject.label}
                        </span>
                    )
                }
                return 'Indefinido';
            }
        },
        {
            header: 'Valor',
            accessor: 'amount',
            cell: (value) => `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`,
        }
    ];

    return (
        <TableTemplate
            column={header}
            data={expenses}
            loading={loading}
            error={error}
            onRowClick={onRowClick}
        />
    );
}