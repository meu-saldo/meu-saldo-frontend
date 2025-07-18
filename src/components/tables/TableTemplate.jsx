import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function TableTemplate({ column, data, loading, error }) {

    return (
        <>
            <Table>
                <TableHeader >
                    <TableRow className={"sticky top-0 hover:bg-transparent"}>
                        {column.map((col, colIdx) => (
                            <TableHead
                                className={colIdx === 0 ? "text-left text-gray-600" : "text-center text-gray-600"}
                                key={col.accessor}
                            >
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell className={"text-center text-gray-900"} >Carregando...</TableCell>
                        </TableRow>
                    ) : error ? (
                        <TableRow>
                            <TableCell>Erro: {error.message}</TableCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={column.length} className={"text-center text-muted-foreground py-4"} >Nenhum dado encontrado</TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, idx) => (
                            <TableRow className={"cursor-pointer"} key={idx}>
                                {column.map((col, colIdx) => (
                                    <TableCell 
                                        key={col.accessor}
                                        className={colIdx === 0 ? "text-left" : "text-center"}
                                    >
                                        {col.cell ? col.cell(row[col.accessor]) : row[col.accessor]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    );
}