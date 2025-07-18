import { getExpenses } from "@/service/expenses";
import { useEffect, useState } from "react";

export default function useExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const carregarDespesas = async () => {
        try {
            setLoading(true);
            const data = await getExpenses();
            setExpenses(data);
            setError(null);
        } catch (err) {
            setError("Erro ao buscar despesas")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDespesas();
    }, []);

    return { expenses, loading, error, carregarDespesas };
}