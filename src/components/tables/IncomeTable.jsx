import TableTemplate from "./TableTemplate";

export default function IncomeTable({ incomes, onRowClick }) {

    const header = [
        {
            header: 'Descrição',
            accessor: 'description',
            align: 'left'
        },
        {
            header: 'Valor',
            accessor: 'amount',
            align: 'center',
            cell: (row) => `R$ ${Number(row.amount || 0).toFixed(2).replace('.', ',')}`
        }
    ];

    return (
        <TableTemplate 
            column={header}
            data={incomes}
            onRowClick={onRowClick}
            emptyStateMessage="Nenhuma entrada encontrada"
        />
    )

}