import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

export default function TableTemplate({ column, data, onRowClick, emptyStateMessage = "Nenhum resultado encontrado." }) {

    const handleRowClick = (row) => { if (onRowClick) onRowClick(row); };
    const handleKeyDown = (event, row) => { if (event.key === 'Enter' && onRowClick) onRowClick(row); };

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    {column.map((col) => (
                        <TableHead key={col.accessor} className={`text-${col.align || 'left'}`}>
                            {col.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data && data.length > 0 ? (
                    data.map((row) => (
                        <TableRow
                            key={row.id}
                            onClick={() => handleRowClick(row)}
                            onKeyDown={(e) => handleKeyDown(e, row)}
                            className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                            tabIndex={onRowClick ? 0 : -1}
                        >
                            {column.map((col) => {
                                const cellContent = col.cell
                                    ? col.cell(row)
                                    : col.accessor.split('.').reduce((acc, part) => acc && acc[part], row);

                                return (
                                    <TableCell key={col.accessor} className={`text-${col.align || 'left'}`}>
                                        {cellContent}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={column.length} className="h-24 text-center text-muted-foreground">
                            {emptyStateMessage}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}