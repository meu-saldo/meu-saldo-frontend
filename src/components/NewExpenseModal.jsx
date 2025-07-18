import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import Button from "./Button";
import { X } from "phosphor-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import api from "@/service/axiosConfig";
import { createExpense } from "@/service/expenses";
import { Input } from "./ui/input";

export default function NewExpenseModal({ isOpen, onOpenChange }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const newExpense = {
            description,
            amount: parseFloat(amount),
            type,
        };

        console.log("Payload enviado:", newExpense);

        try {
            await createExpense(newExpense);

            onCreated?.();
            onOpenChange(false);

            setDescription("");
            setAmount("");
            setType("");
        } catch (error) {
            console.log("Erro completo:", error);
            console.log("error.response:", error.response);
            console.log("error.response.data:", error.response?.data);

            if (error.response && error.response.data) {
                const errData = error.response.data;
                if (Array.isArray(errData.message)) {
                    const messages = errData.message.map((err) => `${err.field}: ${err.message}`);
                    setError(messages.join('\n'));
                } else {
                    setError(errData.message || "Erro desconhecido do servidor");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg" showCloseButton={false}>
                <DialogClose asChild>
                    <X size={28} className="absolute top-4 right-4 rounded-md p-1 hover:bg-gray-200 cursor-pointer" />
                </DialogClose>

                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Adicionar nova despesa
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Preencha os detalhes da nova despesa abaixo.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700">
                            Descrição
                        </label>
                        <Input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ex: Supermercado"
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="type" className="mb-1 text-sm font-medium text-gray-700">Tipo</label>
                        <Select value={type} onValueChange={(value) => setType(value)}>
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
                        <label htmlFor="amount" className="mb-1 text-sm font-medium text-gray-700">
                            Valor (R$)
                        </label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Ex: 150.00"
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <DialogClose asChild>
                            <Button variant="secondary" type="button">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="primary">
                            Adicionar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}