import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import useTransactions from "@/hooks/useTransactions";
import { Info } from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TransactionModal from "./TransactionModal";

export default function TransactionsTable() {
    const { transactions, loading, error } = useTransactions();
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (error) {
            toast.error("Erro ao buscar transações", {
                description: error,
                duration: 5000,
            });
        }
    }, [error])

    if (loading) return <p>Carregando...</p>;

    const handleOpenModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedTransaction(null);
        setIsModalOpen(false);
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="sticky top-0 bg-gray-900 hover:bg-gray-900">
                        <TableHead className="text-center text-gray-50">Data</TableHead>
                        <TableHead className="text-center text-gray-50">Entradas</TableHead>
                        <TableHead className="text-center text-gray-50">Saídas</TableHead>
                        <TableHead className="text-center text-gray-50">Saldo</TableHead>
                        <TableHead className="w-15"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="text-center">{transaction.date}</TableCell>
                            <TableCell className="text-center text-green-600">+ R$ {transaction.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-center text-red-600">- R$ {transaction.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-center font-medium">R$ {transaction.amount.toFixed(2)}</TableCell>
                            <TableCell className="place-items-center">
                                <Info
                                    size={24}
                                    className="cursor-pointer"
                                    onClick={() => handleOpenModal(transaction)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TransactionModal
                transaction={selectedTransaction}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}