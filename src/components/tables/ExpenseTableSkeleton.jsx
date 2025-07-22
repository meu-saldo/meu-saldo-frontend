import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function ExpenseTableSkeleton({ rows }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead className={"w-[120px]"}>Tipo</TableHead>
                    <TableHead className={"w-120px] text-right"}>Valor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: rows }).map((_, index) => (
                    <TableRow key={index} >
                        <TableCell>
                            <Skeleton className={"h-5 w-3/4"} />
                        </TableCell>
                        <TableCell>
                            <Skeleton className={"h-5 w-full"} />
                        </TableCell>
                        <TableCell className={"text-right"}>
                            <Skeleton className={"h-5 w-20 ml-auto"} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}