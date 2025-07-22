import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { X } from "phosphor-react";
import { useState } from "react";
import { Input } from "../ui/input";
import Button from "../Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createExpense } from "@/service/expenses";

export default function NewExpenseModal({ isOpen, onOpenChange, onCreated }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createExpense({ description, amount: parseFloat(amount), type });
      onCreated?.();
      onOpenChange(false);
      setDescription("");
      setAmount("");
      setType("");
    } catch (error) {
      setError("Erro ao adicionar despesa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogClose asChild>
          <X
            size={28}
            className="absolute top-4 right-4 p-1 cursor-pointer hover:bg-gray-200"
          />
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Nova Despesa</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar uma despesa.
          </DialogDescription>
        </DialogHeader>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <Input
              id="description"
              placeholder="Ex: Supermercado"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Valor (R$)
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Ex: 150.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="type"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Tipo
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ESSENTIAL">Essencial</SelectItem>
                <SelectItem value="NOT_ESSENTIAL">Não Essencial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Adicionando..." : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
