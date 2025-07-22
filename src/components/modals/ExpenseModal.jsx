import { createExpense, deleteExpense, updateExpense } from "@/service/expenses";
import { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import { X } from "phosphor-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import Button from "../Button";

export default function ExpenseModal({ isOpen, onOpenChange, expense, onSaved, onDeleted }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isEdit = Boolean(expense);

    useEffect(() => {
        if (expense) {
            setDescription(expense.descrtiption);
            setAmount(expense.amount.toFixed(2));
            setType(expense.type.value);
        } else {
            setDescription("");
            setAmount("");
            setType("");
        }
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            description,
            amount: parseFloat(amount),
            type,
        };

        try {
            if (isEdit) {
                await updateExpense(expense.id, payload);
            } else {
                await createExpense(payload);
            }

            onSaved?.();
            onOpenChange(false);
        } catch (error) {
            const errData = error.response?.data;

            if (Array.isArray(errData?.messages)) {
                const messages = errData.message.map((err) => `${err.field}: ${err.message}`);
                setError(messages.join("\n"));
            } else {
                setError(errData?.message || "Erro desconhecido do servidor");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!expense?.id) return;
        setLoading(true);

        try {
            await deleteExpense(expense.id);

            onDeleted?.();
            onOpenChange(false);
        } catch (err) {
            setError("Erro ao deletar despesa");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg" showCloseButton={false}>
                <DialogClose asChild>
                    <X
                        size={28}
                        className="absolute top-4 right-4 rounded-md p-1 hover:bg-gray-200 cursor-pointer"
                    />
                </DialogClose>

                <DialogHeader>
                    <DialogTitle className={"text-lg font-semibold text-gray-900"}>
                        {isEdit ? "Editar Despesa" : "Nova Despesa"}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        {isEdit ? "Edite os detalhes da despesa" : "Adicione uma nova despesa"}
                    </DialogDescription>
                </DialogHeader>

                {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Descrição</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ex: Supermercado"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Tipo</label>
                        <Select value={type} onValueChange={(value) => setType(value)} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ESSENTIAL">Essencial</SelectItem>
                                <SelectItem value="NOT_ESSENTIAL">Não Essencial</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Valor (R$)</label>
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Ex: 150.0"
                            required
                        />
                    </div>

                    <div className="flex justify-between pt-4">
                        {isEdit && (
                            <Button
                                type="button"
                                variant="danger"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                Excluir
                            </Button>
                        )}
                        <div className="flex gap-3 ml-auto">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="primary" disabled={loading}>
                                {isEdit ? "Salvar" : "Adicionar"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}