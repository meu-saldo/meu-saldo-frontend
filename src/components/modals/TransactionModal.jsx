import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "phosphor-react";

export default function TransactionModal({ transaction, isOpen, onClose }) {
    if (!transaction) return null;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="sm:max-w-md" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Detalhes da Transação</DialogTitle>
                </DialogHeader>

                {transaction && (
                    <div className="space-y-2">
                        <p><strong>Data:</strong> {transaction.date} </p>
                        <p><strong>Descrição:</strong> {transaction.description} </p>
                        <p><strong>Valor:</strong> {transaction.amount} </p>
                        <p><strong>Tipo:</strong> {transaction.type} </p>
                        <p><strong>Conta:</strong> {transaction.accountName} </p>
                    </div>
                )}

                <DialogClose asChild>
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 cursor-pointer"
                        aria-label="Fechar"
                    >
                        <X size={20} />
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}