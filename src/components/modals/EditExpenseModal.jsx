import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { X } from "phosphor-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import Button from "../Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { updateExpense, deleteExpense } from "@/service/expenses";

export default function EditExpenseModal({ isOpen, onOpenChange, expense, onSaved, onDeleted }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expense && expense.type) {
      console.log("DADO RECEBIDO PARA O TIPO:", expense.type.value);

      setDescription(expense.description || "");
      setAmount(String(expense.amount) || "");
      setType(expense.type.value || "");
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!type) {
      setError("Por favor, selecione um tipo de despesa.");
      return;
    }
    if (!description.trim() || !amount) {
      setError("Por favor, preencha a descrição e o valor.");
      return;
    }

    setLoading(true);
    try {
      await updateExpense(expense.id, {
        description,
        amount: parseFloat(amount),
        type,
      });
      onSaved?.();
      onOpenChange(false);
    } catch {
      setError("Erro ao salvar alterações");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteExpense(expense.id);
      onDeleted?.();
      onOpenChange(false);
    } catch {
      setError("Erro ao excluir despesa");
    } finally {
      setLoading(false);
    }
  };

  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()} showCloseButton={false}>
        <DialogClose asChild>
          <X size={28} className="absolute top-4 right-4 p-1 cursor-pointer hover:bg-gray-200 rounded-full" />
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>
          <DialogDescription>Altere ou exclua a despesa.</DialogDescription>
        </DialogHeader>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="mb-1 text-sm font-medium text-gray-700">Descrição</label>
            <Input
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 text-sm font-medium text-gray-700">Valor (R$)</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="Valor (R$)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 text-sm font-medium text-gray-700">Tipo</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ESSENTIAL">Essencial</SelectItem>
                <SelectItem value="NOT_ESSENTIAL">Não Essencial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={loading}
            >
              Excluir
            </Button>
            <div className="flex gap-3">
              <DialogClose asChild>
                <Button variant="secondary" type="button">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}