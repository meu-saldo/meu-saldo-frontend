import TableTemplate from "./TableTemplate";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ExpenseTable({ expenses, onRowClick }) {

    const header = [
        {
            header: 'Descrição',
            accessor: 'description',
            align: 'left'
        },
        {
            header: 'Tipo',
            accessor: 'type', 
            align: 'center',
            cell: (row) => {
                if (row.type && row.type.label) {
                    return (
                        <span className='px-4 py-1 bg-gray-300 rounded-full text-xs'>
                            {row.type.label}
                        </span>
                    )
                }
                return 'Indefinido';
            }
        },
        {
            header: 'Valor',
            accessor: 'amount',
            align: 'right',
            cell: (row) => `R$ ${Number(row.amount || 0).toFixed(2).replace('.', ',')}`,
        }
    ];

    return (
        <TableTemplate
            column={header}
            data={expenses}
            onRowClick={onRowClick}
            emptyStateMessage="Nenhuma despesa encontrada."
        />
    );
}